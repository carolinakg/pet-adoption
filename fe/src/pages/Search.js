import React, { useState, useEffect } from "react";
import PetCard from "../components/PetCard";
import { getPets, searchPets } from "../helpers/api";
import { Link } from "react-router-dom";

function Search() {

  //states
  const [input, setInput] = useState("");
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [pets, setPets] = useState([]);
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  //useEffect
    useEffect(()=>{
        getPets().then((results)=>{
            setPets(results)
        })
    },[])
  
  //functions
  function handleAdvancedSearch(event) {
    event.preventDefault();
    searchPets(type, name, height, weight, status).then((data)=> setPets(data))
  }

  function handleBasicSearch(event) {
    event.preventDefault();
    searchPets(input).then((data)=> setPets(data))
  }
  
  return (
    <div>
      <Link to="/logged" className="backBtn">Back to Home</Link>
      {advancedSearch ? (
        <form className="searchBar">
          <input
            onChange={(event) => setHeight(event.target.value)}
            type="text"
            placeholder="Height"
          />
             <input
            onChange={(event) => setWeight(event.target.value)}
            type="text"
            placeholder="Weight"
          />
             <input
            onChange={(event) => setType(event.target.value)}
            type="text"
            placeholder="Type"
          />
             <input
            onChange={(event) => setName(event.target.value)}
            type="text"
            placeholder="Name"
          />
          <select onChange={(event) => setStatus(event.target.value)}>
              <option value={0}>Options</option>
              <option value={1}>Available</option>
              <option value={2}>Adopted</option>
              <option value={3}>Fostered</option>
            </select>
         
          <button className="btn btn-outline-dark" onClick={handleAdvancedSearch}>Search</button>
          <label htmlFor="basic">
            <input
              id="basic"
              type="checkbox"
              checked={advancedSearch}
              onChange={() => setAdvancedSearch(false)}
            />
            Advanced Search
          </label>
        </form>
      ) : (
        <form className="searchBar">
          <input
            onChange={(event) => setInput(event.target.value)}
            type="text"
            placeholder="Search a Pet"
          />
          <button className="searchBtn btn btn-outline-dark" onClick={handleBasicSearch}>
            Search
          </button>
          <label htmlFor="advanced">
            <input
              id="avanced"
              type="checkbox"
              checked={advancedSearch}
              onChange={() => setAdvancedSearch(true)}
            />
            Advanced Search
          </label>
        </form>
      )}
      <section className="petCardSearch">
        {pets.map((pet, index) => (
          <PetCard key={index} pet={pet} />
        ))}
      </section>
    </div>
  );
}

export default Search;
