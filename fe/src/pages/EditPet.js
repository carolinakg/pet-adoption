import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { editPet, getPetById } from "../helpers/api";
import localforage from "localforage";
import DashboardMenu from "../components/DashboardMenu";

function EditPet() {

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
  const params = useParams();

  //useEffect
  useEffect(() => {
    localforage.getItem("token").then((data) => setAdmToken(data));
    getPetById(params.id).then((data) => {
      setName(data.name);
      setType(data.type);
      // setImg(data.picture);
      setHeight(data.height);
      setWeight(data.weight);
      setColor(data.color);
      setBio(data.bio);
      setHypoallergenic(data.hypoallergenic);
      setDietary(data.dietary_restrictions);
      setBreed(data.breed);
    });
    
  }, []);

  //functions
  function handleEditPet() {
    editPet({
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
    }, admToken, params.id).then((data) => console.log(data));
  }
  return (
    <div className="admin">
    <DashboardMenu/>
    <form encType="multipart/form-data">
    <h1>Edit Pet</h1>
      <input
        type="text"
        value = {type}
        placeholder="Type"
        onChange={(event) => setType(event.target.value)}
      />
      <input
        type="text"
        value = {name}
        placeholder="Name"
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type="text"
        value = {bio}
        placeholder="Adoption bio"
        onChange={(event) => setBio(event.target.value)}
      />
      <input
        type="file"
        placeholder="Picture"
        onChange={(event) => setImg(event.target.files[0])}
      />
      <input
        type="text"
        value = {height}
        placeholder="Height"
        onChange={(event) => setHeight(event.target.value)}
      />
      <input
        type="text"
        value = {weight}
        placeholder="Weight"
        onChange={(event) => setWeight(event.target.value)}
      />
      <input
        type="text"
        value = {color}
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
        value = {dietary}
        placeholder="Dietary restrictions"
        onChange={(event) => setDietary(event.target.value)}
      />
      <input
        type="text"
        value = {breed}
        placeholder="Breed"
        onChange={(event) => setBreed(event.target.value)}
      />
      <button className= "btn btn-outline-dark" onClick={handleEditPet}>Save changes</button>
    </form>
    </div>
  );
}

export default EditPet;
