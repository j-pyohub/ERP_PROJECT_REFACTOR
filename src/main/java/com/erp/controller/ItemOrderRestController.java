package com.erp.controller;

import com.erp.controller.exception.ItemOrderNotFoundException;
import com.erp.controller.exception.StoreItemNotFoundException;
import com.erp.dto.ItemOrderDTO;
import com.erp.dto.ItemOrderDetailDTO;
import com.erp.dto.ItemProposalDTO;
import com.erp.repository.entity.ItemProposal;
import com.erp.service.ItemOrderService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class ItemOrderRestController {
    @Autowired
    ItemOrderService itemOrderService;

    @GetMapping("/itemOrder/itemOrderList/{pageNo}")
    public Map<String, Object> itemOrderList(@PathVariable int pageNo) {
        Page<ItemOrderDTO> page = itemOrderService.getItemOrderList(pageNo);
        return Map.of(
                "list", page.getContent(),
                "totalPages", page.getTotalPages(),
                "pageNo", page.getNumber() + 1,
                "totalElement", page.getTotalElements()
        );
    }
    @GetMapping("/itemOrder/itemOrderDetail/{itemOrderNo}")
    public List<ItemOrderDetailDTO> itemOrderDetail(@PathVariable Long itemOrderNo) {
        return itemOrderService.getItemOrderDetailByOrderNo(itemOrderNo);
    }

    @PutMapping("/itemOrder/cancelItemOrder/{itemOrderNo}")
    public ResponseEntity<Map<String, String>> cancelItemOrder(@PathVariable Long itemOrderNo) {
        try {
            itemOrderService.cancelItemOrder(itemOrderNo);
        }
        catch (ItemOrderNotFoundException e) {
            System.err.println(e.getMessage());
            return ResponseEntity.status(400).build();
        }
        return ResponseEntity.ok().body(Map.of("message", "Cancel ItemOrder Success"));
    }

    @PutMapping("/itemOrder/receiveItemOrder/{itemOrderDetailNo}")
    public ResponseEntity<Map<String, String>> receiveItemOrder(@PathVariable Long itemOrderDetailNo) {
        try{
            itemOrderService.receiveItem(itemOrderDetailNo);
        }
        catch (StoreItemNotFoundException e) {
            System.err.println(e.getMessage());
            return ResponseEntity.status(400).build();
        }
        return ResponseEntity.ok().body(Map.of("message", "Receive ItemOrderDetail Success"));
    }

    @GetMapping("/itemOrder/itemProposalHistory/{storeNo}")
    public List<ItemProposalDTO> proposalItemOrderHistory(@PathVariable Long storeNo) {
        return itemOrderService.getItemProposalHistoryByStoreNo(storeNo);
    }
    @GetMapping("/itemOrder/itemProposal/{storeNo}")
    public List<ItemProposalDTO> proposalItemOrder(@PathVariable Long storeNo) {
        return itemOrderService.getItemProposalByStoreNo(storeNo);
    }
    @PutMapping("/itemOrder/respondItemProposal/{proposalNo}")
    public ResponseEntity<Map<String, String>> responseProposal(@PathVariable Long proposalNo) {
        try {
            itemOrderService.responseProposal(proposalNo);
        }
        catch (EntityNotFoundException e) {
            System.err.println(e.getMessage());
            return ResponseEntity.status(400).build();
        }
        return ResponseEntity.ok().body(Map.of("message", "Response Proposal Success"));
    }
}
