import { useForm } from "react-hook-form";
import { SiGnuprivacyguard } from "react-icons/si";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signupAsync } from "../../features/auth/authSlice";
export const Signup = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signup = (data) => {
    const user = {
      ...data,
      avatar: "/avatar/user1.png",
    };
    dispatch(signupAsync(user)).then(() => navigate("/"));
  };

  return (
    <div className="auth__container">
      <div className="auth__body">
        <div className="auth__header">
          <SiGnuprivacyguard className="auth__logo" /> Signup
        </div>
        <p>
          Have a <span className="highlight">Chatter</span> account.{" "}
          <Link to="/login">Click here.</Link>
        </p>
        <form className="auth__form" onSubmit={handleSubmit(signup)}>
          <label htmlFor="email">Email</label>
          <input
            {...register("email")}
            placeholder="Enter your email address"
          />
          <label htmlFor="name">Name</label>
          <input {...register("name")} placeholder="Enter your full name" />
          <label htmlFor="username">Username</label>
          <input
            {...register("username")}
            placeholder="Create a unique username"
          />
          <label htmlFor="password">Password</label>
          <input
            {...register("password")}
            placeholder="Enter a strong password"
          />
          <input className="form__submit-btn" type="submit" />
        </form>
      </div>
    </div>
  );
};
