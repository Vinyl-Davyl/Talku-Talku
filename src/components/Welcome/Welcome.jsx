import React, { useContext } from "react";
import "./welcome.scss"
import HelloImage from "../../img/hello.gif";
import { AuthContext } from '../../context/AuthContext'


const Welcome = () => {
    const {currentUser} = useContext(AuthContext)

    return (
    <div className="welcome">
      <img className="welcome-img" src={HelloImage} alt="Dog saying Hi!" />
      <h5>
        Welcome, <span className='welcome-name'>{currentUser.displayName}</span>
      </h5>
      <h6>Please select a chat to Start messaging.</h6>
      <h6>or search for <span className='welcome-name'>"Admin"</span> if you don't have a friend yet</h6>
    </div>
  );
};

export default Welcome;