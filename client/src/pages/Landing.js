import main from "../assets/images/main.png";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link, Navigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import React from "react";

const Landing = () => {
  const { user } = useAppContext();
  return (
    <React.Fragment>
      {user && <Navigate to="/" />}
      <Wrapper>
        <nav>
          <Logo />
        </nav>
        <div className="container page">
          {/* info */}
          <div className="info">
            <h1>
              Mókás <span>F1</span> Játék
            </h1>
            <p>
              “Just leave me alone, I know what to do.” <br />
              <em>(Kimi Räikkönen)</em>
              <br />
              <br />
              “If you no longer go for a gap that exists, you’re no longer a
              racing driver.” <br />
              <em>(Ayrton Senna)</em>
            </p>
            <Link to="/register" className="btn btn-hero">
              Login/Register
            </Link>
          </div>
          <img src={main} alt="race-car" className="img main-img" />
        </div>
      </Wrapper>
    </React.Fragment>
  );
};

export default Landing;
