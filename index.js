let todoList = [
    {
        text:"HTML",
        uniqueNo: 1
    },
    {
        text:"CSS",
        uniqueNo:2

    },
    {
        text:"BOOTSTRAP",
        uniqueNo:3
    },
    {
        text:"Javascript",
        uniqueNo:4
    },
]

function onTodoStatusChange(checkboxId, labelId){
    let checkBoxEl = document.getElementById(checkboxId);
    console.log(checkBoxEl.checked);
    if (checkBoxEl.checked === true){
        document.getElementById(labelId).classList.add("checked");
    }
    else{
        document.getElementById(labelId).classList.remove("checked");
    }

}

function createTodoItem(todo){
    let todoItemContainer = document.getElementById("todoItemsContainer");

    let todoElement = document.createElement("li");
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
    deletIconContainer.appendChild(deletIconEl);

}

for (let todo of todoList){
    createTodoItem(todo);
}