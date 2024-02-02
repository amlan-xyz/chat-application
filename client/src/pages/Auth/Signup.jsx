import { useForm } from "react-hook-form";
export const Signup = () => {
  const { register, handleSubmit } = useForm();

  const signup = (data) => console.log(data);

  return (
    <div className="Signup">
      <h1>Signup Page</h1>
      <form onSubmit={handleSubmit(signup)}>
        <label htmlFor="email">Email</label>
        <input {...register("email")} />
        <label htmlFor="name">name</label>
        <input {...register("name")} />
        <label htmlFor="username">Username</label>
        <input {...register("username")} />
        <label htmlFor="password">Password</label>
        <input {...register("password")} />
        <input type="submit" />
      </form>
    </div>
  );
};
