import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import localforage from "localforage";
import { getUserId } from "../helpers/api";




function PetCard(props){
    const [isAdmin, setIsAdmin] = useState(false);
    
    useEffect(()=> {
        localforage.getItem("token").then((data) => {
            getUserId(data).then((userData) => {
            //   console.log(userData);
              if (userData.id_admin) {
              setIsAdmin(true)
              } 
            });
          });
    }, [])
    function getImgSrc(){
        if(props.pet.img || props.pet.picture){
            return `http://127.0.0.1:3333${props.pet.img || props.pet.picture}`
        }
        return ""
    }
    return(
    <div className="petCard shadow-lg p-3 mb-5 bg-white rounded">
        <img src = {getImgSrc()}/>
        <div className="petCard2">
        <h5><strong>Name:</strong> {props.pet.name}</h5>
        <h5><strong>Pet current status:</strong> {props.pet.adoptStatus.status}</h5>
        <div>
        <Link to = {`/pet-page/${props.pet.id}`}>See more</Link>
        </div>
        <div>
        {isAdmin && <Link to = {`/edit-pet/${props.pet.id}`}>Edit Pet</Link>}
        </div>
        </div>
    </div>    
    )
}

export default PetCard;