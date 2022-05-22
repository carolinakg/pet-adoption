import React, { useEffect, useState } from "react";
import MyPetsList from "../components/MyPetsList";
import SavedPetsList from "../components/SavedPetsList";
import { Link } from "react-router-dom";

function MyPets(){

    //state
    const [changeList, setChangeList] = useState(false);
    //false--> exibe my pets    
    //true--> savedPets
   

    //functions
    function handleChange(){
        setChangeList(!changeList);
    }

return(
    <div>
        <Link to ="/logged">Back to Home</Link>
        <h1 className="yourPets">Your Pets</h1>
        <div className="changePage">
        <button className= "btn btn-outline-dark" onClick={handleChange}>{changeList? "Go to My Pets": "Go to Saved Pets"}</button>
        {changeList
        ?<SavedPetsList/>
        :<MyPetsList/>
        }
        </div>
    </div>
)
}

export default MyPets;