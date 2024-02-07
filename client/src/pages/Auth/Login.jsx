import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginAsync } from "../../features/auth/authSlice";
import "./Auth.css";

import { SiGnuprivacyguard } from "react-icons/si";
export const Login = () => {
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();
  const login = (data) => {
    dispatch(loginAsync(data));
  };
  return (
    <div className="auth__container">
      <div className="auth__body">
        <div className="auth__header">
          <SiGnuprivacyguard className="auth__logo" /> Login
        </div>
        <p>
          Connect to your <span className="highlight">Chatter</span> account
        </p>
        <form className="auth__form" onSubmit={handleSubmit(login)}>
          <label htmlFor="username">Username</label>
          <input placeholder="e.g guest_user" {...register("username")} />
          <label htmlFor="password">Password</label>
          <input placeholder="**********" {...register("password")} />
          <input className="form__submit-btn" type="submit" />
        </form>
      </div>
    </div>
  );
};
