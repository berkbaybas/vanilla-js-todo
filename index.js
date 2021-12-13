let todos = [];

let btn = document.querySelector("button");
let input = document.querySelector("input");
let todosElement = document.getElementById("todos");
let todoElement = document.querySelector(".todo");

let todosInCache = JSON.parse(localStorage.getItem("todos"));
console.log(todosInCache);

btn.addEventListener("click", function (e) {
  e.preventDefault();

  const text = document.querySelector("input").value;

  if (text == "" || !text.replace(/\s/g, "").length) {
    // a space was detected
    // do something about it (toast)
    console.log("Space Detected");
    return;
  }

  let todo = {
    id: Math.floor(Math.random() * 30753),
    text: text,
    isActive: true,
  };

  addTodo(todo);
});

const addTodo = (todo) => {
  const todoP = document.createElement("p");
  const todoX = document.createElement("div");
  const todoDiv = document.createElement("div");
  todoP.innerHTML = `${todo.text}`;
  todoDiv.classList.add(`todo`, `todo-${todo.id}`);
  todo.isActive == false ? todoDiv.classList.add(`notActive`) : null;
  todoDiv.onclick = editTodo;
  todoDiv.appendChild(todoP);
  todoX.innerHTML = "x";
  todoX.onclick = deleteTodo;
  todoDiv.appendChild(todoX);
  todosElement.appendChild(todoDiv);
  todos.push(todo);
  input.value = "";
  input.focus();

  localStorage.setItem("todos", JSON.stringify(todos));
};

function editTodo() {
  this.classList.toggle("notActive");
  let todoId = this.classList[1].split("-")[1]; // TODO değiştirilebilir.

  todos = todos.map((todo) => {
    if (todo.id == todoId) {
      todo.isActive = todo.isActive === true ? false : true;
      return todo;
    }

    return todo;
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

// TODO delete olduğunda üsteki div de click oluyor.
function deleteTodo() {
  let todoId = this.parentNode.classList[1].split("-")[1]; // TODO değiştirilebilir.

  todos = todos.filter((todo) => todo.id != todoId); // !== yapınca olmadı neden ?
  console.log(todos);
  localStorage.setItem("todos", JSON.stringify(todos));
  this.parentNode.remove();
}

function ListTodoFromCache() {
  todosInCache.map((todo) => {
    addTodo(todo);
  });
}

ListTodoFromCache();
