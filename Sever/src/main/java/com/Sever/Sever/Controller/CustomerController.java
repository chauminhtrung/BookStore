package com.Sever.Sever.Controller;

import com.Sever.Sever.DTO.Request.LoginRequest;
import com.Sever.Sever.DTO.Respone.LoginResponse;
import com.Sever.Sever.Model.Customer;
import com.Sever.Sever.Service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    // Lấy danh sách tất cả khách hàng
    @GetMapping
    public List<Customer> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    // Lấy thông tin khách hàng theo ID
    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable int id) {
        Optional<Customer> customer = customerService.getCustomerById(id);
        return customer.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Tạo mới khách hàng
    @PostMapping
    public Customer createCustomer(@RequestBody Customer customer) {
        return customerService.createCustomer(customer);
    }

    // Cập nhật khách hàng
    @PutMapping("/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable int id, @RequestBody Customer updatedCustomer) {
        return customerService.getCustomerById(id)
                .map(customer -> ResponseEntity.ok(customerService.updateCustomer(id, updatedCustomer)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Xóa khách hàng
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable int id) {
        if (customerService.getCustomerById(id).isPresent()) {
            customerService.deleteCustomer(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Map<String, Object> response = new HashMap<>();
        try {
            // Tìm kiếm Customer theo số điện thoại
            Optional<Customer> customerOptional = customerService.findByPhone(loginRequest.getPhone());
            if (customerOptional.isEmpty()) {
                response.put("status", false);
                response.put("message", "Tài khoản không tồn tại.");
                response.put("data", null);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            // Lấy thông tin Customer
            Customer customer = customerOptional.get();
            // So sánh trực tiếp mật khẩu với passwordhash
            if (!loginRequest.getPassword().equals(customer.getPasswordhash())) {
                response.put("status", false);
                response.put("message", "Sai mật khẩu");
                response.put("data", null);
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }

            // Tạo LoginResponse với thông tin từ Customer
            LoginResponse loginResponse = customerService.loginResponse(customer);
            response.put("status", true);
            response.put("message", "Đăng nhập thành công.");
            response.put("data", loginResponse);
            return ResponseEntity.ok(response);

        } catch (Exception ex) {
            response.put("status", false);
            response.put("message", "Đã xảy ra lỗi khi thực hiện đăng nhập.");
            response.put("data", null);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


}
