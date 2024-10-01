import { FirebaseError } from "firebase/app";
import { auth } from "../../../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";

type AuthResponse = {
	message: string;
	user: User;
	roles: string;
};

export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
	return new Promise((resolve, reject) => {
		signInWithEmailAndPassword(auth, email, password)
			.then(async ({ user }) => {
				try {
					const { claims } = await user.getIdTokenResult();
					type HasuraClaims = {
						'https://hasura.io/jwt/claims': {
							'x-hasura-default-role': string;
						};
					};
					const allowedClaims = (claims as HasuraClaims)['https://hasura.io/jwt/claims'][
						'x-hasura-default-role'
					];
                    console.log('allowedClaims', allowedClaims);
					if (allowedClaims === 'back_office') {
						resolve({
							message: 'Logged-in successfully',
							user: user,
							roles: allowedClaims,
						});
					} else {
						reject(new Error('You need to register as an admin to continue'));
					}
				} catch (error) {
					console.error('Failed to determine user roles with errors:');
					console.trace(error);
					reject(new Error('Unable to determine user permissions. Please try to login again'));
				}
			})
			.catch((err: FirebaseError) => {
				console.error('Login failed');
				console.trace(err);
				switch (err.code) {
					case 'auth/too-many-requests':
						reject(
							new Error(
								'Access to this account has been temporarily disabled due to many failed login attempts. Try again later.'
							)
						);
						break;
					case 'auth/user-not-found':
						reject(new Error('User is not registered, please contact the CS team to register!'));
						break;
					case 'auth/invalid-email':
						reject(
							new Error(
								'Email ID is not recognised. Please try with a valid email ID. If issue persists, contact the CS team!'
							)
						);
						break;
					case 'auth/invalid-password':
						reject(
							new Error(
								'Provided password is insecure. If not sure, please click on "Forgot Password" and continue'
							)
						);
						break;
					default:
						reject(
							new Error(
								'Login failed due to unknown issue. Please try again in 5 minutes, or contact the CS team!'
							)
						);
				}
			});
	});
};

export const signOutUser = async () => {
	await signOut(auth);
};

export const getCurrentUser = (): Promise<AuthResponse> => {
	return new Promise((resolve, reject) => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			(async () => {
				unsubscribe();
				if (user) {
					const { claims } = await user.getIdTokenResult();
					type HasuraClaims = {
						'https://hasura.io/jwt/claims': {
							'x-hasura-default-role': string;
						};
					};
					const allowedClaims = (claims as HasuraClaims)['https://hasura.io/jwt/claims'][
						'x-hasura-default-role'
					];
					if (allowedClaims === 'back_office') {
						resolve({
							message: 'Logged-in successfully',
							user: user,
							roles: allowedClaims,
						});
						return;
					} else {
						await signOutUser();
						reject(new Error('You need to register as an admin to continue'));
						return;
					}
				} else {
					reject(new Error('Unable to determine user permissions. Please try to login again'));
				}
			})().catch(reject);
		});
	});
};
