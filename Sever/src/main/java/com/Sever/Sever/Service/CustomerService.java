package com.Sever.Sever.Service;

import com.Sever.Sever.DTO.Respone.LoginResponse;
import com.Sever.Sever.Model.Customer;

import java.util.List;
import java.util.Optional;

public interface CustomerService {
    List<Customer> getAllCustomers();
    Optional<Customer> getCustomerById(int id);
    Optional<Customer> getCustomerByEmail(String Email);
    Optional<Customer> findByPhone(String phone);
    Customer createCustomer(Customer customer);
    Customer updateCustomer(int id, Customer customer);
    void deleteCustomer(int id);
    LoginResponse loginResponse(Customer customer);
}
