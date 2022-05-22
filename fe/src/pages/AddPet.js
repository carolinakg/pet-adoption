import React, { useState } from "react";
import { postAddPet } from "../helpers/api";
import { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import localforage from "localforage";
import DashboardMenu from "../components/DashboardMenu";

function AddPet() {

  //states
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [img, setImg] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [color, setColor] = useState("");
  const [hypoallergenic, setHypoallergenic] = useState("");
  const [dietary, setDietary] = useState("");
  const [breed, setBreed] = useState("");
  const [admToken, setAdmToken] = useState("");
  const { tokenInfo, setTokenInfo } = useContext(AppContext);
  
  //useEffect
  useEffect(()=>{
    localforage.getItem("token").then((data)=> setAdmToken(data))
  }, [])

  //functions
  function handleAddPet(event) {
    event.preventDefault();
    postAddPet(
      {
        name: name,
        type: type,
        picture: img || '',
        height: height,
        weight: weight,
        color: color,
        bio: bio,
        hypoallergenic: hypoallergenic,
        dietary_restrictions: dietary,
        breed: breed,
      },
      admToken
    )
      .then(() => global.alert("Pet Added!"))
      .catch((err) => console.log(err));
  }
  return (
    <div className="admin">
      <DashboardMenu/>
    <form encType="multipart/form-data" onSubmit={handleAddPet}>
      <h1>Add a new Pet</h1>
      <input
      required
        type="text"
        placeholder="Type"
        onChange={(event) => setType(event.target.value)}
      />
      <input
      required
        type="text"
        placeholder="Name"
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type="text"
        placeholder="Adoption bio"
        onChange={(event) => setBio(event.target.value)}
      />
      <input
        type="file"
        placeholder="Picture"
        onChange={(event) => setImg(event.target.files[0])}
      />
      <input
      required
        type="number"
        placeholder="Height (cm)"
        onChange={(event) => setHeight(event.target.value)}
      />
      <input
      required
        type="number"
        placeholder="Weight (kg)"
        onChange={(event) => setWeight(event.target.value)}
      />
      <input
      required
        type="text"
        placeholder="Color"
        onChange={(event) => setColor(event.target.value)}
      />
      <select onChange={(event) => setHypoallergenic(event.target.value)}>
        <option disabled >Is Hypoallergenic?</option>
        <option value={1}>Yes</option>
        <option value={0}>No</option>
      </select>
      <input
        type="text"
        placeholder="Dietary restrictions"
        onChange={(event) => setDietary(event.target.value)}
      />
      <input
      required
        type="text"
        placeholder="Breed"
        onChange={(event) => setBreed(event.target.value)}
      />
      <button type = "submit" className= "btn btn-outline-dark">Add Pet</button>
    </form>
    </div>
  );
}

export default AddPet;
