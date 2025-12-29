package com.erp.controller.response;

import java.util.List;

import com.erp.dto.MenuDTO;
import com.erp.dto.MenuIngredientDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MenuDetailResponse {
    private MenuDTO menu;
    private List<MenuDTO> sizeList;
    private List<MenuIngredientDTO> ingredients;
    private boolean hasSize;
    private String menuImage;
    private String menuNos;
}
