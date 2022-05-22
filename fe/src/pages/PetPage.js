import React, { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import { getPetById, postDeletePet, postReturnPet, postSavePet } from "../helpers/api";
import localforage from "localforage";
import { postAdoptPet } from "../helpers/api";

function PetPage(){
    const params = useParams(); //é o barra que uso no insomnia. Id do params (rotas que tem :id)
    const [details, setDetails] = useState({});
    const [token, setToken] = useState("");
    const [isSaved, setIsSaved] = useState(false);
    const [adoptStatus, setAdoptStatus] = useState("Available");
    const [adoptStatusId, setAdoptStatusId] = useState(1);
    
   //useEffect
    useEffect(()=>{
        localforage.getItem("token").then((data) => setToken(data));
        updateDatails()
    },[])
    function updateDatails(){
        getPetById(params.id).then((data)=>{
            setDetails(data)
            setAdoptStatus(data.adoptStatus.status)
            setAdoptStatusId(data.adoptStatus.id)
        })
    }

    function handleReturn(event){
        event.preventDefault()
        postReturnPet(params.id, token).then((data)=> {
            console.log(data)
            setAdoptStatus("Available")
            setAdoptStatusId(1)
        })
        
    }
    function handleSave(event){
        event.preventDefault()
        if(isSaved){
            postDeletePet(params.id,token).then(()=> updateDatails())
            setIsSaved(false)
        } else{
            postSavePet(params.id, token).then(()=> updateDatails())
            setIsSaved(true)
        }
        
    }
    function handleFoster(event){
        event.preventDefault()
        postAdoptPet(params.id,token,2).then((data)=> {
            setAdoptStatus("Fostered");
            setAdoptStatusId(3)
        })
        
    }
    function handleAdopt(event){
        event.preventDefault()
        postAdoptPet(params.id,token,1).then((data)=> {
            setAdoptStatus("Adopted");
            setAdoptStatusId(2)
        })
        
    }
    function getImgSrc(){
        if(details.img || details.picture){
            return `http://127.0.0.1:3333${details.img || details.picture}`
        }
        return ""
    }
   
return(
    <div>
        <Link to = "/search">Search page</Link>
        <div className="petPage shadow-lg p-3 mb-5 bg-white rounded">
        <h1>Pet Information</h1>
        <div className="petPageFlex">
        <div className="petPageColumn">
        <h3><strong>Type:</strong> {details.type}</h3>
        <h3><strong>Name:</strong> {details.name}</h3>
        <h3><strong>Adoption status:</strong> {adoptStatus}</h3>
        <h3><strong>Height:</strong> {details.height}</h3>
        <h3><strong>Weight:</strong> {details.weight}</h3>
        <h3><strong>Color:</strong> {details.color}</h3>
        <h3><strong>Bio: </strong>{details.bio}</h3>
        <h3><strong>Hypoallergenic:</strong> {details.hypoallergenic? "Yes": "No"}</h3>
        <h3><strong>Dietary restrictions:</strong> {details.dietary_restrictions}</h3>
        <h3><strong>Breed:</strong> {details.breed}</h3>
        </div>
        <img src = {getImgSrc()}/>
        </div>
        <div className="adoptBtns">
        <button className="btn btn-outline-dark" disabled = {adoptStatusId !== 1} onClick= {handleFoster}>Foster Pet</button>
        <button className="btn btn-outline-dark" disabled = {adoptStatusId === 2} onClick= {handleAdopt}>Adopt Pet</button>
        <button className="btn btn-outline-dark" onClick={handleSave}>{isSaved? "Unsave Pet" :"Save Pet"}</button>
        <button className="btn btn-outline-dark" onClick={handleReturn}>Return Pet</button>
        </div>
        </div>


    </div>
)
}

export default PetPage;