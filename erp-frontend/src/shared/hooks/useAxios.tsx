import type { AxiosRequestConfig } from "axios";
import { useCallback, useState } from "react";
import apiClient from "../apis/apiClient";

export function useAxios<T>(){
    const [data, setData] = useState<T|undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const request = useCallback(async (config: AxiosRequestConfig) => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await apiClient.request<T>(config);
            setData(response.data);
            return response.data;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { data, loading, error, request };
}