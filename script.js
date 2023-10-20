document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskButton = document.getElementById("addTask");
  const taskList = document.getElementById("taskList");

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
                ${task}
                <button class="delete" data-index="${index}">Delete</button>
            `;
      taskList.appendChild(li);
    });
  }

  renderTasks();

  addTaskButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      tasks.push(taskText);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      taskInput.value = "";
      renderTasks();
    }
  });

  taskList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
      const index = e.target.getAttribute("data-index");
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    }
  });
});
