package com.erp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ReactRedirectController {

    @GetMapping("/menu")
    public String menuReact() {
        return "redirect:http://localhost:5173/react/menu";
    }
}
