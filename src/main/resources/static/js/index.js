const url = 'api/employees';
//Get All Employee
// async function getAllEmployee() {
//     const res = await fetch(url);
//     const employees = await res.json();
//     employees.forEach(employee =>showEmployee(employee))
// }
// window.addEventListener('DOMContentLoaded', getAllEmployee);
//
// function showEmployee({id, name, surname, department, salary}) {
//     const empList = document.getElementById("employees-list");
//     empList.insertAdjacentHTML('beforeend', `
//             <tr id="emp${id}">
//               <td>${name}</td>
//               <td>${surname}</td>
//               <td>${department}</td>
//               <td>${salary}</td>
//               <td><button onclick="updateEmployeeCall(${id})" class="btn btn-info">Update</button></td>
//               <td><button onclick="deleteEmployee(${id})" class="btn btn-danger">Delete</button></td>
//             </tr>
//     `);
// }


function getData() {
    fetch(url).then(
        (res)=>res.json()
    ).then((response)=>{
        let tmpData = "";
        response.forEach((employee)=>{
            tmpData+="<tr>"
            tmpData+="<td>"+employee.name+"</td>";
            tmpData+="<td>"+employee.surname+"</td>";
            tmpData+="<td>"+employee.department+"</td>";
            tmpData+="<td>"+employee.salary+"</td>";
            tmpData+="<td><button class='btn btn-info' onclick='updateEmployeeCall(`"+employee.id+"`)'>Update</button></td>";
            tmpData+="<td><button class='btn btn-danger' onclick='deleteEmployee(`"+employee.id+"`)'>Delete</button></td>";
            tmpData+="</tr>";

        })
        document.getElementById("employees-list").innerHTML = tmpData;
    })
}

getData();





// Add new Employee

async function addNewEmployee() {
    const name = document.getElementById("name");
    const surname = document.getElementById("surname");
    const department = document.getElementById("department");
    const salary = document.getElementById("salary");
    const res = await fetch(url, {
        method: 'POST',
        headers: {
                'Content-Type': 'application/json'
            },
        body: JSON.stringify({
            name: name.value,
            surname: surname.value,
            department: department.value,
            salary: salary.value,
        })
    });
    const emp = await res.json();
    getData();
    clearFomData();
}


// Delete Employee
async function deleteEmployee(id) {
    const res = await fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    getData();
}



// Update Employee
let editForm;
function clearFomData() {
    document.getElementById("name").value = "";
    document.getElementById("surname").value = "";
    document.getElementById("department").value = "";
    document.getElementById("salary").value = "";
}
function getFormData() {
    return {
        name: document.getElementById("name").value,
        surname: document.getElementById("surname").value,
        department: document.getElementById("department").value,
        salary: document.getElementById("salary").value
    }
}
async function setFormData(name, surname, department, salary) {
    document.getElementById("name").value = name;
    document.getElementById("surname").value = surname;
    document.getElementById("department").value = department;
    document.getElementById("salary").value = salary;
}
async function updateEmployeeCall(id) {
    await fetch(`${url}/${id}`, {
        method: 'GET'
    })
        .then((res) => res.json()
            .then((response) => {
                editForm = response;
                setFormData(editForm.name, editForm.surname, editForm.department, editForm.salary);
            }));
}
async function updateEmployee() {
    const formData = getFormData();
    formData['id'] = editForm.id
    const data =  await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)

    });
    clearFomData();
    const res = await data.json();
    await getData();
}

document.getElementById("submitBtnForm").addEventListener('click', async (e) =>{
    e.preventDefault();
    if(!editForm) {
        addNewEmployee();
    } else updateEmployee();
})