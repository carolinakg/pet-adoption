import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import searchpet from "../dog-pictures/searchpet.jpeg";
import profileimg from "../dog-pictures/profile.png";
import mypetsimg from "../dog-pictures/mypets.jpeg";
import welcomeZoe from "../dog-pictures/welcomeZoe.jpeg";
import localforage from "localforage";
import { getUserByIdFull, getUserId } from "../helpers/api";

function HomeLoggedIn() {

  //states
  const { userName, userLastName, setUserName, setUserLastName } = useContext(AppContext);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  //useEffect
  useEffect(() => {
    localforage.getItem("token").then((data) => {
      getUserId(data).then((userData) => {
        if (userData.id_admin) {
          setIsAdmin(true);
          setUserName("Admin");
          setUserLastName("");
        } else {
          setUserName(userData.first_name);
          setUserLastName(userData.last_name);
        }
      });
    });
  }, []);

  //functions
  function handleLogout(event) {
    event.preventDefault();
    localforage.setItem("token", "").then(() => {
      navigate("/");
    });
  }
  
  return (
    <div>
      <header>
        <h1>Welcome {userName} {userLastName}</h1>
      </header>
      {isAdmin && <Link to="/dashboard">Dashboard</Link>}
      <button className="logoutBtn btn btn-outline-dark" onClick={handleLogout}>
        Logout
      </button>
      <div className="pictureLogged">
      <div className="linksContainer">
        <div className="linkCard shadow-lg p-3 mb-5 bg-white rounded">
          <img src={searchpet} />
          <Link to="/search"> Search a Pet</Link>
        </div>
        <div className="linkCard shadow-lg p-3 mb-5 bg-white rounded">
          <img src={mypetsimg} />
          <Link to="/my-pets"> My Pets</Link>
        </div>
        <div className="linkCard shadow-lg p-3 mb-5 bg-white rounded">
          <img src={profileimg} />
          <Link to="/profile"> Profile Settings</Link>
        </div>
      </div>
      <img className="welcomeZoe" src={welcomeZoe}/>
      </div>
    </div>
  );
}

export default HomeLoggedIn;
