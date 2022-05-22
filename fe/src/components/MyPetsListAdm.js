import React, {useState, useEffect} from "react";
import PetCard from "./PetCard";
import { getPetByUserId, getPets, getUserById, getUserId } from "../helpers/api";
import localforage from "localforage";
import DashboardMenu from "./DashboardMenu";

function MyPetsListAdm(){

    //states
    const [pets, setPets] = useState([]);
   
    //useEffect
    useEffect(()=>{
            getPets().then((data)=> setPets(data))
    },[])

return(
    <div className="admin">
        <DashboardMenu/>
        <div className="petList">
        <h3>Pets List</h3>
        {pets.length? pets.map((pet, index)=> (<PetCard key={index} pet = {pet}/>) ): <p> No pets :(</p>}
        </div>
        
    </div>
)
}

export default MyPetsListAdm;