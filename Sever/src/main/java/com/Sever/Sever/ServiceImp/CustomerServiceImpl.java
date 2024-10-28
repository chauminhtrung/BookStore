package com.Sever.Sever.ServiceImp;

import com.Sever.Sever.DTO.Respone.LoginResponse;
import com.Sever.Sever.Model.Customer;
import com.Sever.Sever.Resp.CustomerRepository;
import com.Sever.Sever.Service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @Override
    public Optional<Customer> getCustomerById(int id) {
        return customerRepository.findById(id);
    }

    @Override
    public Optional<Customer> getCustomerByEmail(String Email) {
        return customerRepository.findByEmail(Email);
    }

    @Override
    public Optional<Customer> findByPhone(String phone) {
        return customerRepository.findByPhonenumber(phone);
    }

    @Override
    public Customer createCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    @Override
    public Customer updateCustomer(int id, Customer updatedCustomer) {
        return customerRepository.findById(id)
                .map(customer -> {
                    customer.setName(updatedCustomer.getName());
                    customer.setEmail(updatedCustomer.getEmail());
                    customer.setPhonenumber(updatedCustomer.getPhonenumber());
                    customer.setAddress(updatedCustomer.getAddress());
                    customer.setPasswordhash(updatedCustomer.getPasswordhash());
                    return customerRepository.save(customer);
                }).orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    @Override
    public void deleteCustomer(int id) {
        customerRepository.deleteById(id);
    }


    public boolean checkPassword(String inputPassword, String storedPasswordHash) {
        // Kiểm tra mật khẩu (giả sử đã băm mật khẩu)
        return inputPassword.equals(storedPasswordHash); // Thay thế với logic hash thực tế nếu cần
    }



    // Phương thức loginResponse tạo phản hồi đăng nhập từ Customer
    @Override
    public LoginResponse loginResponse(Customer customer) {
        return new LoginResponse(
                customer.getCustomerID(),
                customer.getName(),
                customer.getEmail(),
                customer.getPhonenumber(),
                customer.getAddress(),
                customer.getBookReviews(),
                customer.getOrders()
        );
    }



}
