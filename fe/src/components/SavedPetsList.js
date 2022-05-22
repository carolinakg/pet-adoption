import React,{useState, useEffect} from "react";
import { getPetByUserId, getUserId } from "../helpers/api";
import PetCard from "./PetCard";
import localforage from "localforage";

function SavedPetsList(){
    //states
    const [savedPets, setSavedPets] = useState([]);

    //useEffect
    useEffect(()=>{
        localforage.getItem("token").then((data) => {
            getUserId(data).then((userInfo)=> {
                getPetByUserId(userInfo.id_person).then((data)=> {
                    setSavedPets(data.favorites)
                } )
            })
        })
    },[])
    
return(
    <div className="savedList">
    <h3>My Pets List</h3>
     {savedPets.length? savedPets.map((pet, index)=> (<PetCard key = {index} pet = {pet}/>) ): <p> You currently have no saved pets.</p>}
    </div>
)
}

export default SavedPetsList;