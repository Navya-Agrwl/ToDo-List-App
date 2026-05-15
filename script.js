const themeToggle = document.getElementById("themeToggle");
const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const timeInput = document.getElementById("timeInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const allBtn = document.getElementById("allBtn");
const completedBtn = document.getElementById("completedBtn");
const pendingBtn = document.getElementById("pendingBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/* ---------------- LOAD TASKS ON REFRESH ---------------- */

window.addEventListener("DOMContentLoaded", loadTasks);

/* ---------------- ADD TASK EVENTS ---------------- */

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(event) {

  if (event.key === "Enter") {
    addTask();
  }

});

/* FILTER EVENTS */

allBtn.addEventListener("click", showAllTasks);

completedBtn.addEventListener("click", showCompletedTasks);

pendingBtn.addEventListener("click", showPendingTasks);

/* DARK MODE TOGGLE */

themeToggle.addEventListener("click", function () {

  document.body.classList.toggle("dark-mode");

});

/* ---------------- ADD TASK FUNCTION ---------------- */

function addTask() {

  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

const task = {
  text: taskText,
  completed: false,
  date: dateInput.value,
  time: timeInput.value
};

  tasks.push(task);

  saveTasks();

  renderTask(task);

  taskInput.value = "";
  dateInput.value = "";
  timeInput.value = "";
}

/* ---------------- RENDER TASK ---------------- */

function renderTask(task) {

  const li = document.createElement("li");

  li.innerHTML = `
    <<div>

  <span class="task-text ${task.completed ? "completed" : ""}">
    ${task.text}
  </span>

  <p class="task-date">
    📅 ${task.date || "No Date"} 
    ⏰ ${task.time || ""}
  </p>

</div>

    <div>
  <button class="complete-btn">✔</button>
  <button class="edit-btn">Edit</button>
  <button class="delete-btn">Delete</button>
    </div>
  `;

const deleteBtn = li.querySelector(".delete-btn");
const completeBtn = li.querySelector(".complete-btn");
const editBtn = li.querySelector(".edit-btn");
const taskText = li.querySelector(".task-text");

  /* DELETE TASK */

  deleteBtn.addEventListener("click", function () {

    li.remove();

    tasks = tasks.filter(t => t.text !== task.text);

    saveTasks();

  });

  /* COMPLETE TASK */

  completeBtn.addEventListener("click", function () {

    task.completed = !task.completed;

    taskText.classList.toggle("completed");

    saveTasks();

  });

  
editBtn.addEventListener("click", function () {

  const updatedText = prompt("Edit your task", task.text);

  if (updatedText === null || updatedText.trim() === "") {
    return;
  }

  task.text = updatedText;

  taskText.textContent = updatedText;

  saveTasks();

});

  taskList.appendChild(li);
}

/* ---------------- SAVE TASKS ---------------- */

function saveTasks() {

  localStorage.setItem("tasks", JSON.stringify(tasks));

}

/* ---------------- LOAD TASKS ---------------- */

function loadTasks() {

  tasks.forEach(task => {
    renderTask(task);
  });

}
/* SHOW ALL TASKS */

function showAllTasks() {

  taskList.innerHTML = "";

  tasks.forEach(task => {
    renderTask(task);
  });

}

/* SHOW COMPLETED TASKS */

function showCompletedTasks() {

  taskList.innerHTML = "";

  const completedTasks = tasks.filter(task => task.completed);

  completedTasks.forEach(task => {
    renderTask(task);
  });

}

/* SHOW PENDING TASKS */

function showPendingTasks() {

  taskList.innerHTML = "";

  const pendingTasks = tasks.filter(task => !task.completed);

  pendingTasks.forEach(task => {
    renderTask(task);
  });

}