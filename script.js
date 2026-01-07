// Mock login credentials
const USERNAME = "student";
const PASSWORD = "1234";

// Pages
const loginPage = document.getElementById('loginPage');
const erpPortal = document.getElementById('erpPortal');
const loginError = document.getElementById('loginError');

// Courses
let courses = ["Math", "Science", "English"];
const courseList = document.getElementById('courseList');

// Login function
function login() {
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();

    if(user === USERNAME && pass === PASSWORD){
        loginPage.classList.remove('active');
        erpPortal.classList.add('active');
        displayCourses();
        showSection('dashboard');
    } else {
        loginError.textContent = "Invalid username or password!";
    }
}

// Logout function
function logout() {
    erpPortal.classList.remove('active');
    loginPage.classList.add('active');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    loginError.textContent = '';
}

// Section navigation
function showSection(sectionId) {
    const sections = document.querySelectorAll('main section');
    sections.forEach(sec => sec.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

// Display courses
function displayCourses() {
    courseList.innerHTML = '';
    courses.forEach(course => {
        const li = document.createElement('li');
        li.textContent = course;
        courseList.appendChild(li);
    });
}

// Add course
function addCourse() {
    const newCourse = document.getElementById('newCourse').value.trim();
    if(newCourse) {
        courses.push(newCourse);
        document.getElementById('newCourse').value = '';
        displayCourses();
    }
}

// Attendance
let attendance = 0;
function markPresent() {
    if(attendance < 100) {
        attendance += 10;
        document.getElementById('attendanceCount').textContent = attendance;
    }
}
