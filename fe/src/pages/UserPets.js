import React, {useState, useEffect} from "react";
import { getPetByUserId, getPets, getUserById, getUserId } from "../helpers/api";
import localforage from "localforage";
import { useParams } from "react-router-dom";
import PetCard from "../components/PetCard";
import DashboardMenu from "../components/DashboardMenu";

function UserPets(){

    //states
    const [pets, setPets] = useState([]);
    const params = useParams();

    //useEffect
    useEffect(()=>{
            getPetByUserId(params.id).then((data)=> setPets(data))
    },[])

return(
    <div className="admin">
        <DashboardMenu/>
        <div className="userPet">
        <h3>Pets List</h3>
        {pets.length? pets.map((pet, index)=> (<PetCard key = {index} pet = {pet}/>) ): <p> No pets :(</p>}
        </div>
        
    </div>
)
}

export default UserPets;