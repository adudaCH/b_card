import { useNavigate } from "react-router-dom";


export const handleNvgCard = (route: string, p0: string) => {
    const navigate = useNavigate();
    navigate(route); 
};