import React, { useState, useEffect } from "react";
import { editUserProfile, getUserId } from "../helpers/api";
import localforage from "localforage";
import { Link } from "react-router-dom";

function Profile() {

  //states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [token, setToken] = useState("");

//useEffect
  useEffect(() => {
    localforage.getItem("token").then((data) => {
      setToken(data);
      getUserId(data).then((userInfo) => {
          setEmail(userInfo.email);
          setFirstName(userInfo.first_name);
          setLastName(userInfo.last_name);
          setPhoneNumber(userInfo.phone);
          setBio(userInfo.bio);
        
      });
    });
  }, []);

  //functions
  function handleClick(event) {
    event.preventDefault();
    editUserProfile(
      {
        first_name: firstName,
        email,
        last_name: lastName,
        phone: phoneNumber,
        bio,
        password,
        password_confirmation: confirmPassword,
      },
      token
    );
  }
  return (
    <div>
      <Link to="/logged">Back to Home</Link>
      <h1 className="profileTitle">My Profile</h1>
      <form className="profilePage">
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          placeholder="E-mail"
        />
        <input
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          placeholder="New Password"
        />
        <input
          onChange={(event) => setConfirmPassword(event.target.value)}
          type="password"
          placeholder="Confirm new password"
        />
        <input
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          type="text"
          placeholder="First Name"
        />
        <input
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          type="text"
          placeholder="Last Name"
        />
        <input
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
          type="tel"
          placeholder="Phone Number"
        />
        <input
          value={bio}
          onChange={(event) => setBio(event.target.value)}
          type="textarea"
          placeholder="My Bio"
        />
        <button className="btn btn-outline-dark" onClick={handleClick}>
          Save
        </button>
      </form>
    </div>
  );
}

export default Profile;
