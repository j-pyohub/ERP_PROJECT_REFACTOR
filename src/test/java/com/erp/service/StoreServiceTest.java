package com.erp.service;

import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootTest
public class StoreServiceTest {
    @Autowired
    StoreService storeService;

    @Test
    void getStoresTest(){
        System.out.println(storeService.getStores());
    }
}
