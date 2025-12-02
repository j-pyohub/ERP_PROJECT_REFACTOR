// com.erp.controller.StoreStockViewController
package com.erp.controller;

import com.erp.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/stock/storeStock")
public class StoreStockController {

    /** 본사 화면 */
    @GetMapping("/manager")
    public String manager() {
        return "stock/storeStockManagerUI";
    }

    /** 직영점 화면: 로그인 사용자의 직영점 정보 사용 */
    @GetMapping("/store")
    public String store(Model model,
                        @AuthenticationPrincipal PrincipalDetails p) {
        model.addAttribute("role", "STORE");
        model.addAttribute("storeNo", p != null ? p.getStoreNo() : null);
        // 필요 시 storeName 바인딩 추가 가능
        return "stock/storeStockStoreUI";
    }
}
