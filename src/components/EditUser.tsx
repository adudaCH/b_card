import { FunctionComponent, useContext, useEffect, useState } from "react";
import { ThemeContext } from "../services/darkLightTheme";
import { User } from "../interface/User";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../services/userServices";
import { errorMsg } from "../services/toastify";

interface EditUserProps {
    
}

const EditUser: FunctionComponent<EditUserProps> = () => {
    const theme = useContext(ThemeContext);
    

    return ( <></> );
}

export default EditUser;