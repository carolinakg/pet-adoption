import React, {useState, useEffect} from "react";
import PetCard from "./PetCard";
import { getPetByUserId, getUserById, getUserId } from "../helpers/api";
import localforage from "localforage";

function MyPetsList(){

    //states
    const [myPets, setMyPets] = useState([]);

    //useEffect
    useEffect(()=>{
        localforage.getItem("token").then((data) => {
            getUserId(data).then((userInfo)=> {
                getPetByUserId(userInfo.id_person).then((data)=> {
                    setMyPets(data.adopts)
                } )
            })
        })
    },[])

return(
    <div className="myPetList">
        <h3>My Pets List</h3>
        {myPets.length? myPets.map((pet, index)=> (<PetCard key = {index} pet = {pet}/>) ): <p> You currently do not own or foster any pets :(</p>}
    </div>
)
}

export default MyPetsList;