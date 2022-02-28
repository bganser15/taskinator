//DOM references

//calls entire form into a variable
var formEl = document.querySelector("#task-form");

//calls the ul into a variable
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function (event) {
  event.preventDefault();

  //selects the input the user put in the form stored as "value"
  var taskNameInput = document.querySelector("input[name='task-name']").value;

  //stores value to the type of task selector drop down
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  //creates new li
  var listItemEl = document.createElement("li");
  //adds style to new line of text
  listItemEl.className = "task-item";

  // create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");
  // give it a class name
  taskInfoEl.className = "task-info";
  // add HTML content to div
  taskInfoEl.innerHTML =
    "<h3 class='task-name'>" +
    taskNameInput +
    "</h3><span class='task-type'>" +
    taskTypeInput +
    "</span>";

  listItemEl.appendChild(taskInfoEl);
  // add entire list item to list
  tasksToDoEl.appendChild(listItemEl);
};

formEl.addEventListener("submit", createTaskHandler);
