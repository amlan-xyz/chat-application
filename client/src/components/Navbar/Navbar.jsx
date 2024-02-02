import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
export const Navbar = () => {
  const { loggedIn, user } = useSelector((state) => state.auth);
  return (
    <div className="navbar">
      <header>{loggedIn && user.username}</header>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Signup</NavLink>
      </nav>
    </div>
  );
};
