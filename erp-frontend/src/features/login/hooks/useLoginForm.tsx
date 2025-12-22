import { useState } from "react";
import apiClient from "../../../shared/apis/apiClient";
import useNavigateTo from "../../../shared/hooks/useNavigateTo";

export const useLoginForm = () => {
    const [managerId, setManagerId] = useState("");
    const [pw, setPw] = useState("");
    const [error, setError] = useState("");
    const goToMainPage = useNavigateTo()("/sales");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            const response = await apiClient.post("/auth/login", { managerId, pw });
            const token = response.headers['authorization'];
            if (!token) {
                throw new Error("토큰이 없습니다");
            }
            localStorage.setItem("jwtToken", token);
            console.log(token);
            window.location.href = 'http://localhost:5432/';
            // goToMainPage(); // 로그인 성공 시 매출 페이지로 이동
        } catch (error) {
            setError("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
        }
    };

    return {
        managerId,
        setManagerId,
        pw,
        setPw,
        error,
        handleSubmit,
    };
}