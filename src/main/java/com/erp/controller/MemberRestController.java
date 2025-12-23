package com.erp.controller;

import com.erp.controller.exception.ManagerException;
import com.erp.controller.exception.StoreNotFoundException;
import com.erp.dto.AddStoreRequestDTO;
import com.erp.dto.ManagerDTO;
import com.erp.dto.StoreDTO;
import com.erp.service.MemberService;
import com.erp.service.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/member")
public class MemberRestController {

    private final MemberService memberService;
    private final StoreService storeService;

    @PutMapping("/manager")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> updateManager(@RequestBody ManagerDTO requestBody) {
        memberService.setManager(requestBody);
        return ResponseEntity.ok(Map.of("message", "success"));
    }

    @PutMapping(value = "/store", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> updateStore(
            @RequestPart AddStoreRequestDTO request,
            @RequestPart(value = "storeImage", required = false) MultipartFile storeImage
    ) {
        ManagerDTO manager = ManagerDTO.toDTO(request.getManager());
        StoreDTO store = StoreDTO.toDTO(request.getStore());

        storeService.setStore(manager, store, storeImage);
        return ResponseEntity.ok(Map.of("message", "직영점 변경 성공"));
    }

    @GetMapping("/manager/{managerId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getManager(@PathVariable String managerId) {
        ManagerDTO managerDTO = memberService.getManager(managerId);
        return ResponseEntity.ok(Map.of("manager", managerDTO));
    }

    @GetMapping("/store/{managerId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getStore(@PathVariable String managerId) {
        ManagerDTO managerDTO = memberService.getManager(managerId);
        StoreDTO storeDTO = storeService.getStore(managerId);

        Map<String, Object> data = new HashMap<>();
        data.put("manager", managerDTO);
        data.put("store", storeDTO);

        return ResponseEntity.ok(data);
    }

    @PostMapping("/manager")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> addManager(@RequestBody AddStoreRequestDTO request) {
        ManagerDTO manager = ManagerDTO.toDTO(request.getManager());
        memberService.addManager(manager);
        return ResponseEntity.ok(Map.of("message", "직원 추가 성공"));
    }

    @PostMapping(value = "/store", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> addStore(
            @RequestPart AddStoreRequestDTO request,
            @RequestPart(value = "storeImage", required = false) MultipartFile storeImage
    ) {
        ManagerDTO manager = ManagerDTO.toDTO(request.getManager());
        StoreDTO store = StoreDTO.toDTO(request.getStore());

        storeService.addStore(manager, store, storeImage);
        return ResponseEntity.ok(Map.of("message", "직영점 추가 성공"));
    }

    @GetMapping("/member")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> checkMemberId(@RequestParam String managerId) {
        try {
            memberService.checkManager(managerId);
        } catch (ManagerException e) {
            return ResponseEntity.ok(Map.of("message", "사용가능"));
        }
        return ResponseEntity.badRequest().body(Map.of("message", "이미 있는 아이디 입니다."));
    }

    /** 본사 직원 목록 */
    @GetMapping("/manager")
    @PreAuthorize("hasRole('ADMIN')")
    public Page<ManagerDTO> getManagerMembers(@RequestParam(defaultValue = "0") Integer page) {
        int safePage = (page == null ? 0 : page);
        return memberService.getManagerMembers(safePage);
    }

    /** 직영점 직원 목록 */
    @GetMapping("/store")
    @PreAuthorize("hasRole('ADMIN')")
    public Page<StoreDTO> getStoreMembers(@RequestParam(defaultValue = "0") Integer page) {
        int safePage = (page == null ? 0 : page);
        return memberService.getStoreMembers(safePage);
    }

    @PostMapping("/store/menuStopRole")
    @PreAuthorize("hasRole('ADMIN')")
    public Map<String, String> setStoreMenuStopRole(@RequestBody StoreDTO dto) {
        memberService.setStoreMenuStopRole(dto.getStoreNo(), dto.getMenuStopRole());
        return Map.of("message", "ok");
    }

    @GetMapping("/store/detail/{storeNo}")
    @PreAuthorize("hasRole('ADMIN')")
    public StoreDTO getStoreDetail(@PathVariable long storeNo) {
        StoreDTO store = memberService.getStoreDetail(storeNo);
        if (store == null) {
            throw new StoreNotFoundException("직영점 정보를 찾을 수 없습니다. storeNo=" + storeNo);
        }
        return store;
    }
}
