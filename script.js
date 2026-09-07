const studentForm = document.getElementById("studentForm");
const studentTable = document.getElementById("studentTable");
const searchInput = document.getElementById("search");

// Get students from Local Storage
let students = JSON.parse(localStorage.getItem("students")) || [];

// Display students when page opens
displayStudents();

// Add Student
studentForm.addEventListener("submit", function(event) {

event.preventDefault();

const name = document.getElementById("name").value;
const roll = document.getElementById("roll").value;
const department = document.getElementById("department").value;
const email = document.getElementById("email").value;

const student = {
    id: Date.now(),
    name: name,
    roll: roll,
    department: department,
    email: email
};

students.push(student);

saveStudents();

studentForm.reset();

displayStudents();

alert("Student added successfully!");

});

// Save students
function saveStudents() {

localStorage.setItem("students", JSON.stringify(students));

}

// Display students
function displayStudents(list = students) {

studentTable.innerHTML = "";

if (list.length === 0) {

    studentTable.innerHTML = `
        <tr>
            <td colspan="5">No students found</td>
        </tr>
    `;

    return;
}


list.forEach(function(student) {

    const row = document.createElement("tr");

    row.innerHTML = `

        <td>${student.roll}</td>

        <td>${student.name}</td>

        <td>${student.department}</td>

        <td>${student.email}</td>

        <td>

            <button
                class="edit-btn"
                onclick="editStudent(${student.id})">
                Edit
            </button>

            <button
                class="delete-btn"
                onclick="deleteStudent(${student.id})">
                Delete
            </button>

        </td>

    `;

    studentTable.appendChild(row);

});

}

// Delete Student
function deleteStudent(id) {

const confirmDelete = confirm(
    "Are you sure you want to delete this student?"
);

if (!confirmDelete) {
    return;
}

students = students.filter(function(student) {
    return student.id !== id;
});

saveStudents();

displayStudents();

}

// Edit Student
function editStudent(id) {

const student = students.find(function(student) {
    return student.id === id;
});

document.getElementById("name").value = student.name;
document.getElementById("roll").value = student.roll;
document.getElementById("department").value = student.department;
document.getElementById("email").value = student.email;


students = students.filter(function(student) {
    return student.id !== id;
});

saveStudents();

displayStudents();

window.scrollTo({
    top: 0,
    behavior: "smooth"
});

}

// Search Student
searchInput.addEventListener("input", function() {

const searchText = searchInput.value.toLowerCase();

const filteredStudents = students.filter(function(student) {

    return (
        student.name.toLowerCase().includes(searchText) ||
        student.roll.toLowerCase().includes(searchText)
    );

});

displayStudents(filteredStudents);

});