import apiClient from "../../../shared/apis/apiClient"
import type { Item } from "../../../shared/types/Item";


export const getMenuIngredientList = async (
    itemCategory?: string,
    itemCode?: string,
    ingredientName?: string
    ): Promise<Item[]> => {
        const response = await apiClient.get('/menu/itemList', {
            params: { itemCategory, itemCode, ingredientName }
        });
        return response.data;
};
