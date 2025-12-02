package com.erp.controller;

import com.erp.auth.PrincipalDetails;
import com.erp.controller.request.SearchRequestDTO;
import com.erp.dto.PageResponseDTO;
import com.erp.dto.StoreStockDTO;
import com.erp.service.StoreStockService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/stock/storeStock")
public class StoreStockRestController {

    private final StoreStockService storeStockService;

    /** 본사: 목록(페이지) — storeNo 필요(모달에서 전달) */
    @GetMapping("/manager/list/{page}")
    public PageResponseDTO<StoreStockDTO> listForManager(@PathVariable int page,
                                                         @ModelAttribute SearchRequestDTO req) {
        req.setPage(page);
        if (req.getSize() == null) req.setSize(10);
        return storeStockService.search(req);
    }

    /** 직영점: 목록(페이지) — 로그인 사용자의 storeNo로 강제 */
    @GetMapping("/store/list/{page}")
    public PageResponseDTO<StoreStockDTO> listForStore(@PathVariable int page,
                                                       @ModelAttribute SearchRequestDTO req,
                                                       @AuthenticationPrincipal PrincipalDetails p) {
        req.setPage(page);
        if (req.getSize() == null) req.setSize(10);
        if (p != null && p.getStoreNo() != null) {
            req.setStoreNo(p.getStoreNo()); // 요청 storeNo 무시하고 덮어씀
        }
        return storeStockService.search(req);
    }
}
