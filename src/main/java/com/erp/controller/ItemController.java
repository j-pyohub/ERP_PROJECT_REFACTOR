package com.erp.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
@RequestMapping("/item")
public class ItemController {

    /** 목록 화면 (본사/직영점 모두 허용) */
    @GetMapping("/get")
    public String itemGet() {
        return "item/itemUI";
    }

    /** 상세 화면 (본사/직영점 모두 허용) */
    @GetMapping("/detail")
    public String itemDetail() {
        return "item/itemDetailUI";
    }

    /** 등록 화면 (ADMIN / MANAGER만) */
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    @GetMapping("/add")
    public String itemAdd() {
        return "item/itemAddUI";
    }

    /** 수정 화면 (ADMIN / MANAGER만) */
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    @GetMapping("/set")
    public String itemSet() {
        return "item/itemSetUI";
    }
}