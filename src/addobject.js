import { addTodo } from "./addtodo.js";

export function dialogCreationTest(task,checker){
    let createDialog = document.createElement("dialog");
    const formContainer = document.createElement("form");
    createDialog.id = "taskDialog";
    const titleDiv = document.createElement("div");
    let dialogLabel = document.createElement("label");
    dialogLabel.innerText = "Title: ";
    dialogLabel.setAttribute("for","title")
    let dialogTitleInput = document.createElement("input");
    Object.assign(dialogTitleInput,{
        type: "text",
        name: "title",
        id: "title"
    })
    titleDiv.appendChild(dialogLabel);
    titleDiv.appendChild(dialogTitleInput);
    formContainer.appendChild(titleDiv);

    const areaDiv = document.createElement("div");
    let areaLabel = document.createElement("label");
    let dialogTextArea = document.createElement("textarea");
    areaLabel.innerText = "Describe the entry: ";
    areaLabel.setAttribute("for","description");
    Object.assign(dialogTextArea,{
        rows: "10",
        cols: "30",
        id: "description"
    })
    areaDiv.appendChild(areaLabel);
    areaDiv.appendChild(dialogTextArea);
    formContainer.appendChild(areaDiv);
    if (checker == "true"){
        const dateDiv = document.createElement("div");
        let dateLabel = document.createElement("label");
        dateLabel.innerText = "Set the due for the task: ";
        dateLabel.setAttribute("for","dueDate");
        let dialogDueDate = document.createElement("input");
        Object.assign(dialogDueDate,{
            name: "dueDate",
            type: "date",
            id: "dueDate"
        })
        dateDiv.appendChild(dateLabel);
        dateDiv.appendChild(dialogDueDate);
        formContainer.appendChild(dateDiv);

        const priorityDiv = document.createElement("div");
        let priorityLabel = document.createElement("label");
        priorityLabel.innerText = "Check if it's a priority task: "
        priorityLabel.setAttribute("for","priority");
        let dialogCheckPriority = document.createElement("input");
        Object.assign(dialogCheckPriority,{
            name: "priority",
            type: "checkbox",
            id: "priority"
        })
        priorityDiv.appendChild(priorityLabel);
        priorityDiv.appendChild(dialogCheckPriority);
        formContainer.appendChild(priorityDiv);
    }
    let closeBtn = document.createElement("button");
    closeBtn.innerText = "Submit";
    closeBtn.addEventListener("click",(event) => {
        event.preventDefault();
        addTodo(task,checker);
    })
    formContainer.appendChild(closeBtn);
    createDialog.appendChild(formContainer);
    document.getElementById("content").appendChild(createDialog);
    createDialog.showModal()
    createDialog.addEventListener("close",()=>{
        document.getElementById("content").removeChild(createDialog);
    })
}