let dataFromStorage = localStorage.getItem("todoList");
let todoList = [];
if (dataFromStorage === null){
    todoList = [];
}
else{
    todoList = JSON.parse(dataFromStorage);
}

let todoItemContainer = document.getElementById("todoItemsContainer");
let addTaskButtonEl = document.getElementById("addTaskButton");

addTaskButtonEl.onclick = function (){
    let todoUserInputEl = document.getElementById("todoUserInput");
    let inputGiven = todoUserInputEl.value;
    let dateEl = document.getElementById("date");
    let timeEl = document.getElementById("time");
    if (inputGiven === "" || dateEl.value === "" || timeEl.value === ""){
        alert("Please enter valid task & time!!");
        return;
    }
    let todoItemsCount = todoList.length;
    let newTodoItem = {
        text: inputGiven,
        uniqueNo: todoItemsCount + 1,
        taskStatus: false,
        taskDate:dateEl.value,
        taskTime:timeEl.value,
    }
    createTodoItem(newTodoItem);
    todoList.push(newTodoItem);
    todoUserInputEl.value = "";
    dateEl.value = "";
    timeEl.value = "";
}


function onTodoStatusChange(checkboxId, labelId,todoItemId){
    let checkBoxEl = document.getElementById(checkboxId);
    let checkedTodoItemId = "todo"+todoItemId;
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");
    // console.log(checkboxId, labelId, todoItemId);
    let checkedItemId = "todo"+todoItemId;
    for (let eachItem of todoList){
        let eachItemId = "todo"+eachItem.uniqueNo;
        if (eachItemId === checkedItemId){
            eachItem.taskStatus = eachItem.taskStatus ? false:true;
        }
    }
}

function onDeleteElement(todoItemId){
    let elementToDo = document.getElementById(todoItemId);
    todoItemContainer.removeChild(elementToDo); 

    let deleteIndex = todoList.findIndex(function (eachTodoItem){
        let eachTodoItemId = "todo" + eachTodoItem.uniqueNo;
        if (todoItemId === eachTodoItemId){
            return true;
        }
        return false;
    })
    todoList.splice(deleteIndex,1);

}

function createTodoItem(todo){

    let todoElement = document.createElement("li");
    todoElement.id = "todo" + todo.uniqueNo;
    todoElement.classList.add("todo-item-container","d-flex","flex-row");
    todoItemContainer.appendChild(todoElement);


    let inputCheckBoxElemnt = document.createElement("input"); 
    inputCheckBoxElemnt.classList.add("checkbox-input")
    inputCheckBoxElemnt.setAttribute("id","checkbox" + todo.uniqueNo);
    inputCheckBoxElemnt.type = "checkbox";
    inputCheckBoxElemnt.onclick = function (){
        onTodoStatusChange(("checkbox" + todo.uniqueNo),("label" + todo.uniqueNo),todo.uniqueNo);
    }
    inputCheckBoxElemnt.checked = todo.taskStatus;//important
    todoElement.appendChild(inputCheckBoxElemnt);

    let todoElementContainer = document.createElement("div")
    todoElementContainer.classList.add("label-container", "d-flex", "flex-row","shadow");
    todoElement.appendChild(todoElementContainer);

    let labelElement = document.createElement("label");
    labelElement.classList.add("checkbox-label");
    labelElement.setAttribute("for","checkbox" + todo.uniqueNo);
    labelElement.setAttribute("id","label" + todo.uniqueNo);
    labelElement.textContent = todo.text;
    if (inputCheckBoxElemnt.checked){
        labelElement.classList.add("checked");
    }
    else{
        labelElement.classList.remove("checked");
    }
    todoElementContainer.appendChild(labelElement)

    let dateTimeEl = document.createElement("button");
    dateTimeEl.classList.add("date-and-time-display","m-2","shadow");
    dateTimeEl.textContent = todo.taskDate + " " +todo.taskTime;
    todoElementContainer.appendChild(dateTimeEl);

    let deletIconContainer = document.createElement("div");
    deletIconContainer.classList.add("delete-icon-container");
    todoElementContainer.appendChild(deletIconContainer);

    let deletIconEl = document.createElement("i");
    deletIconEl.classList.add("far", "fa-trash-alt", "delete-icon","shadow");
    deletIconEl.onclick = function () {
        onDeleteElement("todo" + todo.uniqueNo);
    }
    deletIconContainer.appendChild(deletIconEl);

}

let saveButtonEl = document.getElementById("saveButton");
saveButtonEl.onclick = function (){
    console.log(todoList);
    let strigifiedTodoList = JSON.stringify(todoList);
    localStorage.setItem("todoList",strigifiedTodoList);
}

for (let todo of todoList){
    createTodoItem(todo);
}