import React, { useEffect, useState } from "react";
import { usersAPI } from "../helpers/api";
import DashboardMenu from "../components/DashboardMenu";
import localforage from "localforage";
import { Link } from "react-router-dom";
function UsersListAdm(){

    //states
    const [users, setUsers] = useState([]);

    //useeffect
    useEffect(()=>{
        localforage.getItem("token").then((data) => {
            usersAPI(data).then((data)=> {
                setUsers(data)
            })
        });
    },[])
    
   
return(
    <div className="admin">
        <DashboardMenu/>
    <div className="userList dash2">
        <h1>User List</h1>
        <div className="map" >
        {users.map((user, index)=> (
            <div key = {index} className=" userCard shadow-lg p-3 mb-5 bg-white rounded">
                <h5><Link to = {`/adm/user-pets/${user.user_id}`}>{user.first_name}</Link></h5>
                <p>{user.user.type === "admins"
                    ? "Admin"
                    : "Regular User"
                }</p>
            </div>
        ))}
        </div>
    </div>
    </div>
)
}

export default UsersListAdm;