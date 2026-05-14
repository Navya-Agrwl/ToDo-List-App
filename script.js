const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", addTask);

function addTask() {

  const taskText = taskInput.value;

  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  const li = document.createElement("li");

  li.innerHTML = `
    ${taskText}
    <button class="delete-btn">Delete</button>
  `;

  taskList.appendChild(li);

  taskInput.value = "";

  const deleteBtn = li.querySelector(".delete-btn");

  deleteBtn.addEventListener("click", function () {
    li.remove();
  });
}