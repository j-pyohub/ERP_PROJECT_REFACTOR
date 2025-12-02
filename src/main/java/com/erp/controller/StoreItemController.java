package com.erp.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequiredArgsConstructor
@RequestMapping("/stock/storeItem")
public class StoreItemController {

    /**
     * 재고 조회 : 본사 화면
     *  - URL : /stock/storeItem/manager
     */
    @GetMapping("/manager")
    public String storeItemManager() {
        return "stock/storeItemManagerUI";
    }

    /**
     * 재고 조회 : 직영점 화면
     *  - URL : /stock/storeItem/store?storeNo=1
     */
    @GetMapping("/store")
    public String storeItemStore(Model model,
                                 @AuthenticationPrincipal com.erp.auth.PrincipalDetails p) {
        model.addAttribute("role", "STORE");
        model.addAttribute("storeNo", p != null ? p.getStoreNo() : null);
        return "stock/storeItemStoreUI";
    }
}
