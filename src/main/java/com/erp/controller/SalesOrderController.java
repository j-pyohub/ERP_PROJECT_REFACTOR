package com.erp.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("sales")
public class SalesOrderController {
    @GetMapping("/salesOrder")
    public String salesOrder() {
        return "sales/salesOrderManagerUI";
    }

    @GetMapping("/addSalesOrder")
    public String addSalesOrder() {
        return "sales/salesOrderAddUI";
    }
}
