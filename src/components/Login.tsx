import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
    const navigate = useNavigate();
    // const [users, setUsers] = useState<Users[]>([]);
    const [loggedIn, setLoggseIn] = useState<boolean>(false);
    
    return (<></>);
};

export default Login;
