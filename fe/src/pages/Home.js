import React from "react";
import ModalLogin from "../components/ModalLogin";
import ModalSignup from "../components/ModalSignup";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import lineOfDogs from "../dog-pictures/Line-of-dogs2.jpeg";

function Home() {
  return (
    <div>
      <Header/>
      <div className="home shadow-lg p-3 mb-5 bg-white rounded">
        <p>Here you can adopt/foster a new Pet. </p>
        <div className="homeBtns">
          <ModalLogin />
          <ModalSignup />
        </div>
        <Link to="/search"> Search a Pet</Link>
      </div>
      <img className="petLine" src={lineOfDogs} />
    </div>
  );
}

export default Home;
