const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const timeInput = document.getElementById("timeInput");
const priorityInput = document.getElementById("priorityInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const themeToggle = document.getElementById("themeToggle");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

renderTasks();

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

searchInput.addEventListener("input", renderTasks);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    currentFilter = button.dataset.filter;
    renderTasks();
  });
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

function addTask() {
  const text = taskInput.value.trim();
  const date = dateInput.value;
  const time = timeInput.value;
  const priority = priorityInput.value;

  if (text === "") {
    alert("Please enter a task");
    return;
  }

  const task = {
    id: Date.now(),
    text,
    date,
    time,
    priority,
    completed: false,
  };

  tasks.push(task);
  saveTasks();
  renderTasks();

  taskInput.value = "";
  dateInput.value = "";
}