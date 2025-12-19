import { useNavigate } from "react-router-dom";

export default function useNavigateTo() {
    const navigate = useNavigate();
    return ((path:string) => () => navigate(path));
}