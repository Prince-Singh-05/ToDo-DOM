const input = document.querySelector("#inputBox");
const addTaskBtn = document.querySelector("#addTaskBtn");
const taskContainer = document.querySelector(".task-container");
const saveListBtn = document.querySelector("#saveListBtn");

let taskId = 1;

function addTask() {
	const newTask = document.createElement("div");
	newTask.setAttribute("id", `task-${taskId}`);
    newTask.setAttribute("class", "todo");

    if(input.value === '') {
        alert("Tasks cannot be empty!");
        return;
    }

	newTask.innerHTML = `
        <button class="deleteTaskBtn" onclick="deleteTask('task-${taskId}')">
            <i class="fa-solid fa-trash"></i>
        </button>
        <input type="checkbox" id="status-task-${taskId}" class="taskStatusCheckbox" onchange="setStatus('status-task-${taskId}', 'text-${taskId}')">
        <p id="text-${taskId}" contenteditable="true" onemptied="checkContent('text-${taskId}')">${taskId}. ${input.value}</p>
    `;
	taskContainer.appendChild(newTask);

	taskId += 1;
    input.value = '';

}

function checkContent(textId) {
    const text = document.getElementById(textId);
    text.parentNode.removeChild(text);
}

function deleteTask(id) {
	const task = document.getElementById(id);
	taskContainer.removeChild(task);
}

function setStatus(checkboxId, textId) {
    const status = document.getElementById(checkboxId);
    const text = document.getElementById(textId);

    if(status.checked) {
        text.style.textDecoration = 'line-through';
    } else {
        text.style.textDecoration = 'none';
    }

}

function saveTodoList() {
    console.log("save button clicked");
    let todoList = [];

    for(let i = 0; i<taskContainer.children.length; i++) {

        let todoItem = taskContainer.children[i];
        
        let todoInfo = {
            "task": todoItem.children[2].innerText,
            "completed": todoItem.children[1].checked,
            "statusId": todoItem.children[1].id
        };

        todoList.push(todoInfo);
    }

    localStorage.setItem("todoList", JSON.stringify(todoList));
    alert("List saved in local storage");
}

function loadTodoList() {
    if(localStorage.getItem("todoList") !== null) {
        let todos = JSON.parse(localStorage.getItem("todoList"));

        for(let i = 0; i < todos.length; i++) {
            let todo = todos[i];
            input.value = todo.task;
            addTask();
        }

        for(let i = 0; i < todos.length; i++) {
            let todo = todos[i];
            const status = document.getElementById(todo.statusId);
            status.checked = todo.completed;
        }
    }
}

loadTodoList();
