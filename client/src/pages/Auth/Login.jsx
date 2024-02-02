import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginAsync } from "../../features/auth/authSlice";

export const Login = () => {
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();
  const login = (data) => {
    dispatch(loginAsync(data));
  };
  return (
    <div className="login">
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit(login)}>
        <label htmlFor="username">Username</label>
        <input {...register("username")} />
        <label htmlFor="password">Password</label>
        <input {...register("password")} />
        <input type="submit" />
      </form>
    </div>
  );
};
