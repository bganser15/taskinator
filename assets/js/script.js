//DOM references
var buttonEl = document.querySelector("#save-task");

var tasksToDoEL = document.querySelector("#tasks-to-do");

var createTaskHandler = function () {
  //creates new li
  var taskItemEl = document.createElement("li");
  //sets text content
  taskItemEl.textContent = "hello new task!";
  //adds to page under parent element tasksToDoEl
  tasksToDoEL.appendChild(taskItemEl);
  //adds style to new line of text
  taskItemEl.className = "task-item";
};

buttonEl.addEventListener("click", createTaskHandler);
