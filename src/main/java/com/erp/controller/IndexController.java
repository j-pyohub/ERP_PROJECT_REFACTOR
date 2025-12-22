package com.erp.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
public class IndexController {

    @GetMapping("/login")
    public String loginRedirect() {
        return "redirect:http://localhost:5173/react/auth/login";
    }

    @GetMapping("/noPermission")
    public String noPermission() {
        return "noPermission";
    }
}
