var taskIdCounter = 0;

//DOM references

//calls entire form into a variable
var formEl = document.querySelector("#task-form");

//calls the ul into a variable
var tasksToDoEl = document.querySelector("#tasks-to-do");

//function that collectd user data before creating new html elements
var taskFormHandler = function (event) {
  event.preventDefault();

  //selects the input the user put in the form stored as "value"
  var taskNameInput = document.querySelector("input[name='task-name']").value;

  //stores value to the type of task selector drop down
  var taskTypeInput = document.querySelector("select[name='task-type']").value;
  // check if input values are empty strings
  if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
  }
  formEl.reset();

  // package up data as an object that will get passed through createTaskEl
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput,
  };

  // send it as an argument to createTaskEl
  createTaskEl(taskDataObj);
};
//function to create task
var createTaskEl = function (taskDataObj) {
  //creates new li
  var listItemEl = document.createElement("li");
  //adds style to new line of text
  listItemEl.className = "task-item";

  // add task id as a custom attribute
  listItemEl.setAttribute("data-task-id", taskIdCounter);

  // create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");
  // give it a class name
  taskInfoEl.className = "task-info";

  // add HTML content to div using innerHTML property
  taskInfoEl.innerHTML =
    "<h3 class='task-name'>" +
    taskDataObj.name +
    "</h3><span class='task-type'>" +
    taskDataObj.type +
    "</span>";
  //adds task info to list item
  listItemEl.appendChild(taskInfoEl);

  //adds task actions buttons to each list item and passing the taskIdCounteras an arguement (see taskId parameter in function)
  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);

  // add entire list item to list
  tasksToDoEl.appendChild(listItemEl);

  // increase task counter for next unique id
  taskIdCounter++;
};
//function to create edit and delete buttons (parameter task id to pass different ids into the function)
var createTaskActions = function (taskId) {
  //creates div for action buttons
  var actionContainerEl = document.createElement("div");
  //gives them a class of task-actions
  actionContainerEl.className = "task-actions";

  // create edit button
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  //gives edit button a unique id
  editButtonEl.setAttribute("data-task-id", taskId);
  //adds button to container
  actionContainerEl.appendChild(editButtonEl);

  // create delete button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(deleteButtonEl);

  //create select dropdown
  var statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);

  var statusChoices = ["To Do", "In Progress", "Completed"];
  for (var i = 0; i < statusChoices.length; i++) {
    // create option element using an array instead of repeating code
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);
  }

  // append to select
  statusSelectEl.appendChild(statusOptionEl);

  actionContainerEl.appendChild(statusSelectEl);

  //returns the container which holds buttons
  return actionContainerEl;
};

formEl.addEventListener("submit", taskFormHandler);
