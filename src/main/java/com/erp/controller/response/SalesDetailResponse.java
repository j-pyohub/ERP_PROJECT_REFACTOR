package com.erp.controller.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SalesDetailResponse {
    private Long storeNo;
    private String storeName;
    private String salesDate;
}