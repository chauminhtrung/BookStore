package com.Sever.Sever.Service;

import com.Sever.Sever.Model.Employee;

import java.util.List;
import java.util.Optional;

public interface EmployeeService {
    List<Employee> getAllEmployees();
    Optional<Employee> getEmployeeById(int id);
    Employee createEmployee(Employee employee);
    Employee updateEmployee(int id, Employee employee);
    void deleteEmployee(int id);
}
