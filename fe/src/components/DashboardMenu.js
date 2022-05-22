import React, {useEffect}from "react";
import profileImg from "../dog-pictures/profile.png";
import { Link, useNavigate } from "react-router-dom";
import localforage from "localforage";
import { getUserId } from "../helpers/api";

//dashboardmenu que garante o acesso restrito ao admin
function DashboardMenu(){
    const navigate = useNavigate();

    //useEffect
    useEffect(()=> {
        localforage.getItem("token").then((data) => {
            //esse data vem do localforage e vai para o me (é o token)
            //aí o userData vem do me
            getUserId(data).then((userData) => {
              if (!userData.id_admin) {
              navigate("/logged")
              } 
            });
          });
    }, [])

    //functions

function handleLogout(event){
    event.preventDefault()
    localforage.setItem("token", "").then(()=> {
    navigate("/")
    })
}

    return(
        <div className="dashboardMenu">
            <div className="containerImg">
            <img src={profileImg}/>
            <button className = "logoutBtn btn btn-outline-dark"onClick={handleLogout}>Logout</button>
            </div>
            <Link to = "/adm/users">Users list</Link>
            <Link to = "/adm/pet-list">Pets List</Link>
            <Link to = "/add-pet">Add Pet</Link>
            <Link to = "/logged">Regular Home page</Link>
        </div>
    )
}

export default DashboardMenu;