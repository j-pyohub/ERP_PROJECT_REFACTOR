package com.erp.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
public class MemberController {

    @Value("${juso.addrKey.key}")
    private String addrKey;

    // =========================
    // 화면(UI)만 반환
    // =========================

    @GetMapping("/admin/managerSetUI/{managerId}")
    @PreAuthorize("hasRole('ADMIN')")
    public String managerSetUI(@PathVariable String managerId) {
        return "member/managerSetUI";
    }

    @GetMapping("/admin/storeSetUI/{managerId}")
    @PreAuthorize("hasRole('ADMIN')")
    public String storeSetUI(@PathVariable String managerId) {
        return "member/storeSetUI";
    }

    /** 직원 목록 UI */
    @GetMapping("/admin/memberListUI")
    @PreAuthorize("hasRole('ADMIN')")
    public String memberListUI() {
        return "member/memberListUI";
    }

    @GetMapping("/admin/storeDetailUI")
    @PreAuthorize("hasRole('ADMIN')")
    public String storeDetailUI() {
        return "member/storeDetailUI";
    }

    @GetMapping("/admin/memberAddUI")
    @PreAuthorize("hasRole('ADMIN')")
    public String memberAddUI() {
        return "member/memberAddUI";
    }

    @GetMapping("/jusoPopup")
    public String jusoPopup(Model model) {
        model.addAttribute("confmKey", addrKey);
        model.addAttribute("returnUrl", "http://211.108.241.166/jusoCallback");
        model.addAttribute("resultType", "json");
        return "member/jusoPopup";
    }

    @PostMapping("/jusoCallback")
    public String callback(HttpServletRequest request, Model model) {
        model.addAttribute("roadAddr", request.getParameter("roadAddr"));
        model.addAttribute("roadFullAddr", request.getParameter("roadFullAddr"));
        model.addAttribute("zipNo", request.getParameter("zipNo"));
        model.addAttribute("jibunAddr", request.getParameter("jibunAddr"));
        model.addAttribute("admCd", request.getParameter("admCd"));
        model.addAttribute("rnMgtSn", request.getParameter("rnMgtSn"));
        model.addAttribute("buldMnnm", request.getParameter("buldMnnm"));
        model.addAttribute("buldSlno", request.getParameter("buldSlno"));
        return "member/jusoCallback";
    }
}
