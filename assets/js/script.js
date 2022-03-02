var taskIdCounter = 0;
var tasks = [];
//DOM references
//calls the main section into a variabe=le
var pageContentEl = document.querySelector("#page-content");

//calls entire form into a variable
var formEl = document.querySelector("#task-form");

//calls the ul into a variable
var tasksToDoEl = document.querySelector("#tasks-to-do");

//calls tasks in progress into a variable
var tasksInProgressEl = document.querySelector("#tasks-in-progress");

//calls tasks completed into variable
var tasksCompletedEl = document.querySelector("#tasks-completed");

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

  //checks if text in form field is an edit
  var isEdit = formEl.hasAttribute("data-task-id");

  // has data attribute, so get task id and call function to complete edit process
  if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  }
  // no data attribute, so create object as normal and pass to createTaskEl function
  else {
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput,
      status: "to-do",
    };

    createTaskEl(taskDataObj);
  }
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

  //adds id to task data onject
  taskDataObj.id = taskIdCounter;
  tasks.push(taskDataObj);

  // increase task counter for next unique id
  taskIdCounter++;

  saveTasks();
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
    // append to select
    statusSelectEl.appendChild(statusOptionEl);

    actionContainerEl.appendChild(statusSelectEl);
  }

  //returns the container which holds buttons
  return actionContainerEl;
};

//function to retrieve specific task button
var taskButtonHandler = function (event) {
  // get target element from event
  var targetEl = event.target;

  // edit button was clicked
  if (targetEl.matches(".edit-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  }
  // delete button was clicked
  else if (targetEl.matches(".delete-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};
//function to delete task
var deleteTask = function (taskId) {
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );
  taskSelected.remove();

  // create new array to hold updated list of tasks
  var updatedTaskArr = [];

  // loop through current tasks
  for (var i = 0; i < tasks.length; i++) {
    // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
    if (tasks[i].id !== parseInt(taskId)) {
      updatedTaskArr.push(tasks[i]);
    }
  }

  // reassign tasks array to be the same as updatedTaskArr
  tasks = updatedTaskArr;

  saveTasks();
};

var editTask = function (taskId) {
  console.log("editing task #" + taskId);

  // get task list item element
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  // get content from task name and type (searching only in taskSelected)
  var taskName = taskSelected.querySelector("h3.task-name").textContent;

  var taskType = taskSelected.querySelector("span.task-type").textContent;

  //sets selected task name and type into forms again to edit
  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;

  //makes the form into edit mode by changing the add task button to save task
  document.querySelector("#save-task").textContent = "Save Task";

  //adds corresponding data task id to form element when task is selected for editing
  formEl.setAttribute("data-task-id", taskId);
};

//function to edit task
var completeEditTask = function (taskName, taskType, taskId) {
  // find the matching task list item
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  // set new values
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  // loop through tasks array and task object with new content
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].name = taskName;
      tasks[i].type = taskType;
    }

    alert("Task Updated!");

    //removes task id and resets the button
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
  }
  saveTasks();
};

var taskStatusChangeHandler = function (event) {
  // get the task item's id
  var taskId = event.target.getAttribute("data-task-id");

  // get the currently selected option's value and convert to lowercase
  var statusValue = event.target.value.toLowerCase();

  // find the parent task item element based on the id
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );
  //if statement to move tasks to differenct colums basedon returned value
  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }

  // update task's in tasks array
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].status = statusValue;
    }
  }
  saveTasks();
};
//function to save tasks to local storage
var saveTasks = function () {
  //turns data into strings when setting to local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

//listener to submit new task via button or enter key
formEl.addEventListener("submit", taskFormHandler);

//listener for edit and delete buttons
pageContentEl.addEventListener("click", taskButtonHandler);

//listener for task ststus selction
pageContentEl.addEventListener("change", taskStatusChangeHandler);
