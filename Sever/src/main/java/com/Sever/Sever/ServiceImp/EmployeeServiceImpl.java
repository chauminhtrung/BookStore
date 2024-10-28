package com.Sever.Sever.ServiceImp;

import com.Sever.Sever.Model.Employee;
import com.Sever.Sever.Resp.EmployeeRepository;
import com.Sever.Sever.Service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public Optional<Employee> getEmployeeById(int id) {
        return employeeRepository.findById(id);
    }

    @Override
    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public Employee updateEmployee(int id, Employee updatedEmployee) {
        return employeeRepository.findById(id)
                .map(employee -> {
                    employee.setName(updatedEmployee.getName());
                    employee.setPosition(updatedEmployee.getPosition());
                    employee.setSalary(updatedEmployee.getSalary());
                    employee.setEmail(updatedEmployee.getEmail());
                    employee.setPhoneNumber(updatedEmployee.getPhoneNumber());
                    return employeeRepository.save(employee);
                }).orElseThrow(() -> new RuntimeException("Employee not found"));
    }

    @Override
    public void deleteEmployee(int id) {
        employeeRepository.deleteById(id);
    }
}
