import React, { useState } from "react";
import Icon from "../../../components/Loader/Index";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader/Index";
import { useAuth } from "../hooks/useAuth";
import { delay } from "../../../utils/general";

const Auth: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const auth = useAuth();

  const navigate = useNavigate();

  const loginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await auth.login(email, password);
      //todo: this is not a good practice we need to wait for token before routing
      await delay(1000);
      navigate("/dashboard");
      window.location.reload();
    } catch (error) {
      console.error("Error logging in:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.name === "email") {
      setEmail(target.value);
    } else if (target.name === "password") {
      setPassword(target.value);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-1/3 h-/12 p-2">
      
      <form
        onSubmit={loginSubmit}
        className="flex flex-col w-full justify-center items-center shadow-md border rounded-2xl p-2 h-full"
      >
        <div
          id="branding"
          className="flex flex-col justify-center items-center mb-12"
        >
          <img
            src="https://res.cloudinary.com/dxmldil1b/image/upload/v1692932947/fuelbuddy-favicon.png"
            alt="FuelBuddy favicon"
            className="w-12 h-12"
          />
          <h1 className="font-semibold text-lg">Welcome to FuelBuddy</h1>
        </div>
        <div className="flex flex-col w-full">
          <label className="input input-bordered flex items-center bg-white">
            
            <input
              value={email}
              onChange={updateInput}
              name="email"
              type="text"
              className="grow"
              placeholder="username@fuelbuddy.ae"
            />
          </label>
          <label className="input input-bordered bg-white flex items-center mt-2">
            <input
              value={password}
              onChange={updateInput}
              name="password"
              type={showPassword ? "text" : "password"}
              className="grow"
              placeholder="Password"
            />
            <span onClick={togglePasswordVisibility} className="opacity-70">
              {showPassword ? (
                <Icon
                  icon="icon-[ri--eye-off-fill]"
                  width="24px"
                  height="24px"
                />
              ) : (
                <Icon icon="icon-[ri--eye-fill]" width="24px" height="24px" />
              )}
            </span>
          </label>
        </div>
        <button
          className="fb-btn fb-btn-success mt-2 w-full max-w-xs"
          type="submit"
        >
          {loading ? <Loader size="md" /> : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Auth;
