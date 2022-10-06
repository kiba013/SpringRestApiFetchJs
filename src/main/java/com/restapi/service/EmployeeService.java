package com.restapi.service;


import com.restapi.exception.EmployeeNotFoundException;
import com.restapi.model.Employee;

import java.util.List;

public interface EmployeeService {

    List<Employee> getAllEmployee();

    void saveEmployee(Employee employee);

    Employee getById(Long id);

    void deleteEmployee(Long id);
}
