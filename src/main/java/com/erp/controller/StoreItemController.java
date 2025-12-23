package com.erp.controller;

import com.erp.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
public class StoreItemController {

    /** 재고 조회 : 본사 화면  → /manager/stock/storeItem  */
    @GetMapping("/manager/stock/storeItem")
    public String storeItemManager() {
        return "stock/storeItemManagerUI";
    }

    /** 재고 조회 : 직영점 화면 → /store/stock/storeItem  */
    @PreAuthorize("hasRole('STORE') and principal.store != null")
    @GetMapping("/store/stock/storeItem")
    public String storeItemStore() {
        return "stock/storeItemStoreUI";
    }
}
