import { FunctionComponent, useContext, useEffect, useState } from "react";
import { ThemeContext } from "../services/darkLightTheme";
import { useNavigate } from "react-router-dom";
import { User } from "../interface/User";
import { getAllUsers } from "../services/userServices";
import { errorMsg } from "../services/toastify";

interface SendBoxProps {
    
}

const SendBox: FunctionComponent<SendBoxProps> = () => {
    const theme = useContext(ThemeContext);
    const [users, setUsers] = useState<User[]>([]);
    const [userChange, setUserChange] = useState<boolean>(false)
    const navigate = useNavigate();
    
    useEffect(()=>{
        getAllUsers().then((users)=>{
            setUsers(users.data)
        }).catch((err)=>{
            errorMsg("failed to restore data")
        })
    },[userChange]);
    return ( <main style={{ backgroundColor: theme.background, color: theme.color, minHeight: "100vh"}}>
        
    </main> );
}

export default SendBox;