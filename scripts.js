var apiKey = "f75b13d718596f34eaa9357d9088f508bd6bc7eb7ae709ce006d56de4a46c1bf";

//Load existing Participants
var loadTodo = new XMLHttpRequest();
loadTodo.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var todos = JSON.parse(this.responseText);
    console.log(todos);
    todos.forEach(todo => {
      renderTodo(todo);
    });
  }
  else if (this.readyState == 4) {
    console.log(this.responseText);
  }
}
loadTodo.open("GET", "https://api.kraigh.net/todos", true);
loadTodo.setRequestHeader("x-api-key", apiKey);
loadTodo.send();


//dealing with new todo form submits
document.getElementById("new-todo-form").addEventListener("submit", function(event) {
  event.preventDefault();
  //Submit ToDo to api
  var data = {
    text: newTitle.value
  }
  console.log(data);
  console.log(JSON.stringify(data));
  var createTodo = new XMLHttpRequest();
  createTodo.onreadystatechange = function() {
    // Wait for readyState = 4 & 200 response
    if (this.readyState == 4 && this.status == 200) {
      // parse JSON response
      renderTodo(JSON.parse(this.responseText));
    }
    else if (this.readyState == 4) {
       // this.status !== 200, error from server
       console.log(this.responseText);
    }
  };
  createTodo.open("POST", "https://api.kraigh.net/todos", true);
  createTodo.setRequestHeader("Content-type", "application/json");
  createTodo.setRequestHeader("x-api-key", apiKey);
  createTodo.send(JSON.stringify(data));
});


//display brand new todo on page
function renderTodo(todoData) { //possibly rename JSONfromServer
  //create new todo container
  var todo = document.createElement("article");
  //add id of todo as id of container
  todo.setAttribute("id", todoData.id);
  console.log(todoData.id);
  todo.classList.add("todo");
  if (todoData.completed) {
    todo.classList.add("completed");
  }

  //create complete button
  var completedButton = document.createElement("button");
  completedButton.classList.add("check");
  todo.appendChild(completedButton);

  //add todo text
  var todoText = document.createElement("p");
  todoText.innerText = todoData.text;
  todo.appendChild(todoText);
  //create delete button
  var deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.innerHTML = 'X';
  todo.appendChild(deleteButton);
  //add todo to page
  document.getElementById("scroll-box").appendChild(todo);

  //must do after, becuase click listeners won't be able to find elements on the page since they are not there
  // ad event listeners for button
  completedButton.addEventListener("click", completeTodo);
  deleteButton.addEventListener("click", deleteTodo);

  //clears input in form after sumbit
  document.getElementById("newTitle").value = '';
}

//todo completion
function completeTodo(event) {
  //event addEventListener on button clcik
  //add API call. PUT to set completed to true
  var todoId = event.target.parentNode.id; //event.target is the button itself because this was a click event
                            //however, we want to attach id property to parent element(the article)
  var data = {
    completed: true
  }
  var completeTodo = new XMLHttpRequest();
  completeTodo.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      event.target.parentNode.classList.add("completed"); //to change the style to faded once checked
    }
    else if (this.readyState == 4) {
      console.log(this.responseText);
    }
  }
  completeTodo.open("PUT", "https://api.kraigh.net/todos/" + todoId, true);
  completeTodo.setRequestHeader("Content-type", "application/json");
  completeTodo.setRequestHeader("x-api-key", apiKey);
  completeTodo.send(JSON.stringify(data));
}

//handle todo deletion
function deleteTodo(event) {
  //event listener on button click
  var todoId = event.target.parentNode.id;
  //api call, delete to removeItem
  var deleteTodo = new XMLHttpRequest();
  deleteTodo.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      event.target.parentNode.remove();
      // document.getElementById("scroll-box").removeChild(event.target.parentNode); //b/c IE does not support "remove" function
    }
    else if (this.readyState == 4) {
      console.log(this.responseText);
    }
  }
  //remove from page
  deleteTodo.open("DELETE", "https://api.kraigh.net/todos/" + todoId, true);
  deleteTodo.setRequestHeader("Content-type", "application/json");
  deleteTodo.setRequestHeader("x-api-key", apiKey);
  deleteTodo.send(); //don't need to send any data
}
