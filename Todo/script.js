// Date selections
const day = document.querySelector("#day");
const month = document.querySelector("#month");
const today = document.querySelector("#date");

// Task selections
const inputTaskDesc = document.querySelector("#task-desc");
const addTaskBtn = document.querySelector("#add-btn");

// Render selections
const renderContainer = document.querySelector("#display ul");
const optionsContainer = document.querySelector("#options");

// Filter selection
const all = document.querySelector("#all");
const active = document.querySelector("#active");
const completed = document.querySelector("#completed");

// Date data
const daysOfWeek = [
  "Sunday", "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday"
];

const monthsOfYear = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const allTasks = [];

// Configuring date
function configureDate() {
  const date = new Date();
  day.textContent = daysOfWeek[date.getDay()];
  month.textContent = monthsOfYear[date.getMonth()];
  today.textContent = date.getDate();
}

window.addEventListener("load", function () {
  configureDate();
});

// Function to add task
function addTask() {
  const taskText = inputTaskDesc.value.trim();
  if (taskText === "") return;

  const task = {
    taskText,
    status: "active"
  };

  allTasks.push(task);
  renderTasks();
  inputTaskDesc.value = "";
}

// Render all tasks
function renderTasks() {
  renderContainer.innerHTML = "";

  allTasks.forEach((task) => {
    const element = `
      <li class="task">
        <input type="checkbox" name="status" ${task.status === "completed" ? "checked" : ""} />
        <p class="desc">${task.taskText}</p>
        <span class="delete">✕</span>
      </li>
    `;
    renderContainer.innerHTML += element;
  });
}

// Render active tasks
function toRenderActives() {
  active.classList.add("active");
  all.classList.remove("active");
  completed.classList.remove("active");

  renderContainer.innerHTML = "";

  const activeTasks = allTasks.filter(task => task.status === "active");

  activeTasks.forEach((task) => {
    const element = `
      <li class="task">
        <input type="checkbox" name="status" ${task.status === "completed" ? "checked" : ""} />
        <p class="desc">${task.taskText}</p>
        <span class="delete">✕</span>
      </li>
    `;
    renderContainer.innerHTML += element;
  });
}

// Render completed tasks
function toRenderCompleted() {
  completed.classList.add("active");
  active.classList.remove("active");
  all.classList.remove("active");

  renderContainer.innerHTML = "";

  const completedTasks = allTasks.filter(task => task.status === "completed");

  if (completedTasks.length === 0) {
    renderContainer.innerHTML = `<p>Please first complete a task</p>`;
    return;
  }

  completedTasks.forEach((task) => {
    const element = `
      <li class="task">
        <input type="checkbox" name="status" ${task.status === "completed" ? "checked" : ""} />
        <p class="desc">${task.taskText}</p>
        <span class="delete">✕</span>
      </li>
    `;
    renderContainer.innerHTML += element;
  });
}

// Render all
function toRenderAll() {
  all.classList.add("active");
  active.classList.remove("active");
  completed.classList.remove("active");

  renderTasks();
}

// Handle filter selection
optionsContainer.addEventListener("click", function (e) {
  const target = e.target.id;

  if (target === "completed") {
    toRenderCompleted();
  } else if (target === "active") {
    toRenderActives();
  } else {
    toRenderAll();
  }
});

// Handle checkbox toggle & delete
renderContainer.addEventListener("click", function (e) {
  const target = e.target;
  const li = target.closest("li");

  if (!li) return;

  const taskText = li.querySelector(".desc").textContent;
  const taskIndex = allTasks.findIndex((t) => t.taskText === taskText);

  if (target.name === "status") {
    allTasks[taskIndex].status =
      allTasks[taskIndex].status === "active" ? "completed" : "active";
  }

  if (target.classList.contains("delete")) {
    allTasks.splice(taskIndex, 1);
  }

  // Re-render according to current filter
  if (all.classList.contains("active")) {
    toRenderAll();
  } else if (active.classList.contains("active")) {
    toRenderActives();
  } else {
    toRenderCompleted();
  }
});

// Add task button click
addTaskBtn.addEventListener("click", addTask);
