import React, { useState } from "react";
import AppContext from "./AppContext";

function AppProvider({children}){
    const [data, setData] = useState("");
    const [userName, setUserName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [tokenInfo, setTokenInfo] = useState({});
    const context = {
        data, 
        setData, 
        userLastName,
        setUserLastName,
        userName, 
        setUserName,
        tokenInfo,
        setTokenInfo
    };
    return(
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;