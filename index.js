let todoList = [
    {
        text:"HTML"
    },
    {
        text:"CSS"
    },
    {
        text:"BOOTSTRAP"
    },
    {
        text:"Javascript"
    },
]

function createTodoItem(todo){
    let todoItemContainer = document.getElementById("todoItemsContainer");

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex","flex-row");
    todoItemContainer.appendChild(todoElement);


    let inputCheckBoxElemnt = document.createElement("input");
    inputCheckBoxElemnt.classList.add("checkbox-input")
    inputCheckBoxElemnt.setAttribute("id","checkbox");
    inputCheckBoxElemnt.type = "checkbox";
    todoElement.appendChild(inputCheckBoxElemnt);

    let todoElementContainer = document.createElement("div")
    todoElementContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(todoElementContainer);

    let labelElement = document.createElement("label");
    labelElement.classList.add("checkbox-label");
    labelElement.setAttribute("for","checkbox1");
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