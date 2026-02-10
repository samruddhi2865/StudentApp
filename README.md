# 🎓 StudentApp – Division Roll Number Project

StudentApp is a simple web-based application built using **Node.js, Express, and HTML/JavaScript** to manage student records. The system allows users to view student details, calculate attendance percentages, display statistics, and sort records dynamically.

This project is designed for learning **backend APIs**, **basic frontend integration**, and **data handling**.

---

## 🚀 Features

- 📋 View all student records
- 📊 Calculate percentage from Day 1 to Day 4 attendance
- 📈 Display statistics (Total, Max, Min, Average)
- 🔃 Sort students by name or percentage
- 🌐 RESTful APIs using Express
- 🧮 Dynamic table rendering using JavaScript

---

## 🛠️ Technology Stack

- **Backend:** Node.js, Express.js  
- **Frontend:** HTML, CSS, JavaScript  
- **Database:** (Configured via `db.js`)  
- **API Format:** JSON  

---

## 📂 Project Structure

StudentApp/
│── public/ # Frontend HTML files
│── api.js # API route handlers
│── db.js # Database connection logic
│── index.js # Main server entry point
│── package.json # Project dependencies
│── package-lock.json
│── .gitignore


---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js installed
- npm installed

### Steps

1. Clone the repository
```bash
git clone https://github.com/your-username/StudentApp.git
Navigate to project folder

cd StudentApp
Install dependencies

npm install
Start the server

node index.js
Open in browser

http://localhost:3000
🔗 API Endpoints
GET /api/students → Fetch all student records

POST /api/recompute → Recalculate percentages

GET /api/stats → Get statistics (count, max, min, avg)

GET /api/sorted?by=percentage&order=desc → Sort records

🎯 Learning Outcomes
Understanding Express.js routing

Working with REST APIs

Connecting frontend with backend

Data computation and sorting logic

Basic full-stack workflow

