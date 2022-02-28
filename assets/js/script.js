//DOM references

//calls entire form
var formEl = document.querySelector("#task-form");

//calls the ul
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function (event) {
  event.preventDefault();
  //creates new li
  var listItemEl = document.createElement("li");
  //adds style to new line of text
  listItemEl.className = "task-item";
  //sets text content
  listItemEl.textContent = "hello new task!";
  //adds to page under parent element tasksToDoEl
  tasksToDoEl.appendChild(listItemEl);
  console.log(event);
};

formEl.addEventListener("submit", createTaskHandler);
