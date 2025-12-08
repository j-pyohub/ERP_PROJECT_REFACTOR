package com.erp.service;

import com.erp.dao.StoreDAO;
import com.erp.dto.StoreDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StoreService {
    private final StoreDAO storeDAO;

    public List<StoreDTO> getStores() {
        return storeDAO.getStores();
    }

}
