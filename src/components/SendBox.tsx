import { FunctionComponent, useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../services/darkLightTheme";
import { useNavigate } from "react-router-dom";
import { User } from "../interface/User";
import { getAllUsers } from "../services/userServices";
import { errorMsg } from "../services/toastify";


interface SendBoxProps {
    
}

const SendBox: FunctionComponent<SendBoxProps> = () => {
    const theme = useContext(ThemeContext);
    let [users, setUsers] = useState<User[]>([]);

    let [flag, setFlag] = useState<boolean>(false)
    let searchType = useRef<HTMLSelectElement>()
    const navigate = useNavigate();
    
    useEffect(()=>{
        getAllUsers().then((res)=>{
            setUsers(res.data)
        }).catch((err)=>{
            console.log(err);
            
            errorMsg("failed to restore data")
        })
    },[flag]);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(8);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
    
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

    return ( <main style={{ backgroundColor: theme.background, color: theme.color, minHeight: "100vh"}}>
        
    </main> );
}

export default SendBox;