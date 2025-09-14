import { initialTasks as defaultTasks } from "./initialData.js";

const STORAGE_KEY = "taskBoardTasks";

/**
 * Loads tasks from localStorage or falls back to default tasks.
 * @returns {Array<Object>} List of tasks
 */
function loadTasks() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : defaultTasks;
}

/**
 * Saves tasks to localStorage.
 * @param {Array<Object>} tasks
 */
function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/**
 * Creates a single task DOM element.
 * @param {Object} task - Task data object.
 * @returns {HTMLElement} The created task div element.
 */
function createTaskElement(task) {
  const taskDiv = document.createElement("div");
  taskDiv.className = "task-div";
  taskDiv.textContent = task.title;
  taskDiv.dataset.taskId = task.id;

  taskDiv.addEventListener("click", () => {
    openTaskModal(task);
  });

  return taskDiv;
}

/**
 * Finds the task container element based on task status.
 * @param {string} status - 'todo' | 'doing' | 'done'
 * @returns {HTMLElement|null}
 */
function getTaskContainerByStatus(status) {
  const column = document.querySelector(`.column-div[data-status="${status}"]`);
  return column ? column.querySelector(".tasks-container") : null;
}

/**
 * Clears all existing task-divs.
 */
function clearExistingTasks() {
  document.querySelectorAll(".tasks-container").forEach((container) => {
    container.innerHTML = "";
  });
}

/**
 * Renders all tasks to the UI.
 * @param {Array<Object>} tasks
 */
function renderTasks(tasks) {
  clearExistingTasks();

  tasks.forEach((task) => {
    const container = getTaskContainerByStatus(task.status);
    if (container) {
      const taskElement = createTaskElement(task);
      container.appendChild(taskElement);
    }
  });

  // update column headers with counts
  ["todo", "doing", "done"].forEach((status) => {
    const count = tasks.filter((t) => t.status === status).length;
    document.getElementById(
      `${status}Text`
    ).textContent = `${status.toUpperCase()} (${count})`;
  });
}

/**
 * Opens the modal for an existing task (view/edit mode).
 * @param {Object} task
 */
function openTaskModal(task) {
  const modal = document.getElementById("task-modal");
  const titleInput = document.getElementById("task-title");
  const descInput = document.getElementById("task-desc");
  const statusSelect = document.getElementById("task-status");

  titleInput.value = task.title;
  descInput.value = task.description;
  statusSelect.value = task.status;

  modal.showModal();
}

/**
 * Opens the modal in "add new task" mode (empty form).
 */
function openAddTaskModal() {
  const modal = document.getElementById("task-modal");
  document.getElementById("task-form").reset();
  modal.showModal();
}

/**
 * Sets up modal close behavior.
 */
function setupModalCloseHandler() {
  const modal = document.getElementById("task-modal");
  const closeBtn = document.getElementById("close-modal-btn");

  closeBtn.addEventListener("click", () => modal.close());
}

/**
 * Sets up adding new tasks via the modal.
 */
function setupTaskCreation(tasks) {
  const addTaskBtn = document.getElementById("addTaskBtn");
  const saveTaskBtn = document.getElementById("saveTaskBtn");

  addTaskBtn.addEventListener("click", () => openAddTaskModal());

  saveTaskBtn.addEventListener("click", () => {
    const title = document.getElementById("task-title").value.trim();
    const description = document.getElementById("task-desc").value.trim();
    const status = document.getElementById("task-status").value;

    if (!title) {
      alert("Title is required");
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      description,
      status,
    };

    tasks.push(newTask);
    saveTasks(tasks);
    renderTasks(tasks);

    document.getElementById("task-modal").close();
  });
}

/**
 * Initializes the task board.
 */
function initTaskBoard() {
  const tasks = loadTasks();
  renderTasks(tasks);
  setupModalCloseHandler();
  setupTaskCreation(tasks);
}

// Wait until DOM is ready
document.addEventListener("DOMContentLoaded", initTaskBoard);
