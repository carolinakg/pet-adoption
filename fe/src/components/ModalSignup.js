import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import AppContext from "../context/AppContext";
import { postSignup } from "../helpers/api";
import signupMila from "../dog-pictures/signupMila.jpeg";
import localforage from "localforage";

function ModalSignup() {

  //states
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [messages, setMessages] = useState([]);

  //functions
  function handleClick(event) {
    event.preventDefault();
    postSignup({
      //esquerda igual api e direita igual estado
      first_name: firstName,
      email: email,
      last_name: lastName,
      phone: phoneNumber,
      bio: bio,
      password: password,
      password_confirmation: confirmPassword,
    }).then((response) => {
      response.json().then((data) => {
        if (data.errors) {
          let errorMessages = [];
          for (let i = 0; i < data.errors.length; i++) {
            errorMessages.push(data.errors[i].message);
          }
          setMessages(errorMessages);
          global.alert(errorMessages);
        } else {
          global.alert("Successful Signup!");
          setIsOpen(false);
        }
      });
    });
  }
  
  function handleClose() {
    setIsOpen(false);
  }
  
  return (
    <div>
      <button
        className=" signupBtn btn btn-outline-dark"
        onClick={() => setIsOpen(true)}
      >
        SIGNUP
      </button>
      <Modal isOpen={isOpen}>
        <button className="btn btn-outline-dark" onClick={handleClose}>
          X
        </button>
        <h1 className="signupTitle">Signup</h1>
        <div className="signupDiv">
          <form className="modalSignup" onSubmit={handleClick}>
            <input
              required
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              placeholder="E-mail"
            />
            <input
              required
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              placeholder="Password"
            />
            <input
              required
              onChange={(event) => setConfirmPassword(event.target.value)}
              type="password"
              placeholder="Confirm your password"
            />
            <input
              minLength={3}
              onChange={(event) => setFirstName(event.target.value)}
              type="text"
              placeholder="First Name"
            />
            <input
              minLength={3}
              onChange={(event) => setLastName(event.target.value)}
              type="text"
              placeholder="Last Name"
            />
            <input
              onChange={(event) => setPhoneNumber(event.target.value)}
              type="tel"
              placeholder="Phone Number"
            />
            <input
              onChange={(event) => setBio(event.target.value)}
              type="text"
              placeholder="Bio"
            />
            <button type = "submit" className="btn btn-outline-dark">
              Signup
            </button>
          </form>
          <img className="signupMila" src={signupMila} />
        </div>
      </Modal>
    </div>
  );
}

export default ModalSignup;
