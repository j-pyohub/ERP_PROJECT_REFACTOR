import apiClient from "../../../shared/apis/apiClient"


export const getMenuList = async (menuCategory?: string, releaseStatus?: string) =>: Promise<Menu[]> => {
    const response = await apiClient.get('/menu/menuList', {
        params: { menuCategory, releaseStatus }
    });
    return response.data;
};
