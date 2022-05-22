import React, { useContext, useState } from "react";
import {useNavigate} from "react-router-dom";
import Modal from "react-modal";
import AppContext from "../context/AppContext";
import { postLogin } from "../helpers/api";
import localforage from "localforage";
import lollaLogin from "../dog-pictures/lollaLogin.JPG"

function ModalLogin() {
  //states
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserName, setUserLastName, setTokenInfo } = useContext(AppContext);

  //navigate to page
  const navigate = useNavigate();

  //functions
  function handleClick(event) {
    event.preventDefault();
    postLogin({email, password}).then((data)=> {
      setTokenInfo(data)
      localforage.setItem("token", data.token)
      navigate("/logged");
    })
  }
  function handleClose() {
    setIsOpen(false);
  }

  return (
    <div>
      <button className=" signinBtn btn btn-outline-dark" type="button" onClick={() => setIsOpen(true)}>
        LOGIN
      </button>

      {/* {isOpen} é uma pergunta que remete ao estado que pode ser true ou false */}
      <Modal isOpen={isOpen} ariaHideApp={false}>
        <button className= "btn btn-outline-dark" onClick={handleClose}>X</button>
        <h1 className="loginTitle">Login</h1>
        <div className="loginDiv">
        <form className="modalLogin">
          <input
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="E-mail"
          />
          <input
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="Password"
          />
          <button className= "btn btn-outline-dark" onClick={handleClick}>Login</button>
        </form>
        <img className="lollaLogin"src= {lollaLogin}/>
        </div>
      </Modal>
    </div>
  );
}

export default ModalLogin;
