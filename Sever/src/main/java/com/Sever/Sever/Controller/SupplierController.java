package com.Sever.Sever.Controller;

import com.Sever.Sever.Model.Supplier;
import com.Sever.Sever.Service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/suppliers")
public class SupplierController {

    @Autowired
    private SupplierService supplierService;

    // Lấy danh sách tất cả các nhà cung cấp
    @GetMapping
    public List<Supplier> getAllSuppliers() {
        return supplierService.getAllSuppliers();
    }

    // Lấy thông tin nhà cung cấp theo ID
    @GetMapping("/{id}")
    public ResponseEntity<Supplier> getSupplierById(@PathVariable int id) {
        Optional<Supplier> supplier = supplierService.getSupplierById(id);
        return supplier.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Tạo mới nhà cung cấp
    @PostMapping
    public Supplier createSupplier(@RequestBody Supplier supplier) {
        return supplierService.createSupplier(supplier);
    }

    // Cập nhật nhà cung cấp
    @PutMapping("/{id}")
    public ResponseEntity<Supplier> updateSupplier(@PathVariable int id, @RequestBody Supplier updatedSupplier) {
        return supplierService.getSupplierById(id)
                .map(supplier -> ResponseEntity.ok(supplierService.updateSupplier(id, updatedSupplier)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Xóa nhà cung cấp
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSupplier(@PathVariable int id) {
        if (supplierService.getSupplierById(id).isPresent()) {
            supplierService.deleteSupplier(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
