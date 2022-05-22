import React, { useState } from "react";
import { getPets, usersAPI } from "../helpers/api";
import PetCard from "../components/PetCard";
import DashboardMenu from "../components/DashboardMenu";
function Dashboard(){
return(
    <div className="admin">
        <DashboardMenu/>
    <div className="welcome">
        <h1>Welcome Admin!</h1>
    </div>
    </div>
)
}

export default Dashboard;