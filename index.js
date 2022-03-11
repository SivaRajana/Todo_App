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
    if (inputGiven === ""){
        alert("Enter Valid Input Buddy!!");
        return;
    }
    let todoItemsCount = todoList.length;
    let newTodoItem = {
        text: inputGiven,
        uniqueNo: todoItemsCount + 1,
    }
    createTodoItem(newTodoItem);
    todoList.push(newTodoItem);
    todoUserInputEl.value = "";
}


function onTodoStatusChange(checkboxId, labelId){
    let checkBoxEl = document.getElementById(checkboxId);
    document.getElementById(labelId).classList.toggle("checked");
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
    todoElement.classList.add("todo-item-container", "d-flex","flex-row");
    todoItemContainer.appendChild(todoElement);


    let inputCheckBoxElemnt = document.createElement("input"); 
    inputCheckBoxElemnt.classList.add("checkbox-input")
    inputCheckBoxElemnt.setAttribute("id","checkbox" + todo.uniqueNo);
    inputCheckBoxElemnt.type = "checkbox";
    inputCheckBoxElemnt.onclick = function (){
        onTodoStatusChange(("checkbox" + todo.uniqueNo),("label" + todo.uniqueNo));
    }
    todoElement.appendChild(inputCheckBoxElemnt);

    let todoElementContainer = document.createElement("div")
    todoElementContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(todoElementContainer);

    let labelElement = document.createElement("label");
    labelElement.classList.add("checkbox-label");
    labelElement.setAttribute("for","checkbox" + todo.uniqueNo);
    labelElement.setAttribute("id","label" + todo.uniqueNo);
    labelElement.textContent = todo.text;
    todoElementContainer.appendChild(labelElement)

    let deletIconContainer = document.createElement("div");
    deletIconContainer.classList.add("delete-icon-container");
    todoElementContainer.appendChild(deletIconContainer);

    let deletIconEl = document.createElement("i");
    deletIconEl.classList.add("far", "fa-trash-alt", "delete-icon");
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