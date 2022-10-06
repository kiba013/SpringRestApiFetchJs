package com.restapi.service;


import com.restapi.exception.EmployeeNotFoundException;
import com.restapi.model.Employee;
import com.restapi.repository.EmployeeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class EmployeeServiceImp implements EmployeeService{

    private final EmployeeRepository employeeRepository;

    public EmployeeServiceImp(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Employee> getAllEmployee() {
        return (List<Employee>) employeeRepository.findAll();
    }

    @Override
    public void saveEmployee(Employee employee) {
                employeeRepository.save(employee);
    }

    @Override
    @Transactional(readOnly = true)
    public Employee getById(Long id) throws EmployeeNotFoundException {
        Employee employee = employeeRepository.findById(id).get();
       if (employee == null) {
           throw new EmployeeNotFoundException("Employee not found");
       }
       return employee;
    }

    @Override
    public void deleteEmployee(Long id) {
            employeeRepository.deleteById(id);
    }
}
