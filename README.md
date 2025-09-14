## 🗂️ Task Board with Local Storage Persistence

## 📖 Project Description

The Task Board with Local Storage Persistence is a lightweight task management system designed to organize tasks into three categories: To Do, Doing, and Done. Tasks are saved in Local Storage, ensuring that your data remains intact even after refreshing the page or reopening the browser.

The application features a responsive design, an intuitive modal for creating tasks, and dynamic rendering of tasks directly onto the board. It is modular, easy to maintain, and provides a smooth user experience across desktop and mobile devices.

## 🛠️ Technologies Used

HTML5 – Structure of the application

CSS3 – Styling and responsive layout

JavaScript (ES6+) – Dynamic rendering, modular logic, and local storage persistence

Local Storage API – Data persistence between sessions

Figma Design Reference – Ensuring UI/UX consistency

## ✨ Features

### Implemented

- **Persistent Task Storage** — Tasks are saved to `localStorage` using the key `taskboard.tasks.v1`.
- **Add Task Modal** — Add a task with title (required), description (optional), and status.
- **Dynamic Rendering** — New tasks render immediately into their column; columns show task counts.
- **Responsive Layout** — Mobile-first responsive layout; modal adjusts on small screens.
- **Modular Code** — `storage.js`, `renderer.js`, `modal.js`, `main.js` for separation of concerns.
- **Validation** — Task title is required.

## 🚀 Usage

Adding a New Task

Click the “+ Add Task” button in the header.

Fill in the task details:

Title (required)

Description (optional)

Status (To Do, Doing, or Done)

Click Save.

The task will appear in the correct column instantly.

## 📌 Interaction Notes

✅ This project demonstrates persistent state management with local storage, modular JavaScript design, and responsive UI implementation.
