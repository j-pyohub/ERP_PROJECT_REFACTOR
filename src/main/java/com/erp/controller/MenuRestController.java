package com.erp.controller;

import com.erp.controller.response.MenuDetailResponse;
import com.erp.dto.ItemDTO;
import com.erp.dto.MenuDTO;
import com.erp.service.ItemService;
import com.erp.service.MenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/menu")
public class MenuRestController {
    private final MenuService menuService;
    private final ItemService itemService;


    @GetMapping("/{menuNo}")
     public MenuDetailResponse getMenuDetail(@PathVariable Long menuNo) {

        MenuDTO menu = menuService.getMenuDetail(menuNo);

        String menuNos = menu.getSizeList().stream()
                .map(s -> String.valueOf(s.getMenuNo()))
                .collect(Collectors.joining(","));

        return new MenuDetailResponse(
                menu,
                menu.getSizeList(),
                menu.getIngredients(),
                menu.isHasSize(),
                menu.getMenuImage(),
                menuNos
        );
    }

    @DeleteMapping("/delMenu")
    public ResponseEntity<Map<String, String>> removeMenu(@RequestParam Long menuNo) {
        menuService.removeMenu(menuNo);
        return ResponseEntity.ok(Map.of("message","delete Menu success"));
    }


    @GetMapping("/menuList")
    public ResponseEntity<List<MenuDTO>> getMenuList(
            @RequestParam(required = false) String menuCategory,
            @RequestParam(required = false) String releaseStatus
    ) {
        List<MenuDTO> menuList = menuService.getMenuList(menuCategory, releaseStatus);
        return ResponseEntity.ok(menuList);
    }
    @PutMapping(value = "/setMenu", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, String>> setMenu(@RequestPart MenuDTO menuDTO,
                                                       @RequestPart(value = "menuImage", required = false) MultipartFile menuImage) {
        menuService.updateMenu(menuDTO,menuImage);
        return ResponseEntity.ok(Map.of("message", "set Menu success"));
    }

    @PostMapping(value = "/addMenu", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addMenu(
            @RequestPart MenuDTO menuDTO,
            @RequestPart(value = "menuImage", required = false) MultipartFile menuImage
    ){
        menuService.addMenu(menuDTO, menuImage);
        return ResponseEntity.ok().body(Map.of("message", "add Menu success"));
    }

    @GetMapping("/itemList")
    public ResponseEntity<List<ItemDTO>> getItemList(
            @RequestParam(required = false) String itemCategory,
            @RequestParam(required = false) String ingredientName,
            @RequestParam(required = false) String itemCode
    ) {
        List<ItemDTO> itemList = itemService.getItemList(itemCategory, ingredientName, itemCode);
        return ResponseEntity.ok(itemList);
    }
}
