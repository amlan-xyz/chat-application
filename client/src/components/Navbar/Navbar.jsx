import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
export const Navbar = () => {
  const { loggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <div className="navbar">
      <header>{loggedIn && user.username}</header>
      <nav>
        <NavLink to="/">Home</NavLink>
        {user ? (
          <button onClick={() => dispatch(logout())}>Logout</button>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
          </>
        )}
      </nav>
    </div>
  );
};
