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
  <span class="task-text">${taskText}</span>

  <div>
    <button class="complete-btn">✔</button>
    <button class="delete-btn">Delete</button>
  </div>
`;

  taskList.appendChild(li);

  taskInput.value = "";

const deleteBtn = li.querySelector(".delete-btn");
const completeBtn = li.querySelector(".complete-btn");
const task = li.querySelector(".task-text");

deleteBtn.addEventListener("click", function () {
  li.remove();
});

completeBtn.addEventListener("click", function () {
  task.classList.toggle("completed");
});
}