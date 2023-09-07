import { useAppContext } from "../context/appContext";
import links from "../utils/links";
import { NavLink } from "react-router-dom";

const NavLinks = ({ toggleSidebar }) => {
  const { user } = useAppContext();

  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, id, icon, role } = link;
        return (
          (role === user.role || user.role === "admin") && (
            <NavLink
              to={path}
              key={id}
              onClick={toggleSidebar}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              end
            >
              <span className="icon">{icon}</span>
              {text}
            </NavLink>
          )
        );
      })}
    </div>
  );
};

export default NavLinks;
