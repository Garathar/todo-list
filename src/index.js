
let projectList = [
    {
    title: "My project",
    id: crypto.randomUUID(),
    lists: [
            {
                title: "My todo list",
                description: "This is the default list, for everyday tasks",
                id: crypto.randomUUID(),
                tasks: []
            }
        ]
    },
];


function todoItem(title,description,dueDate,priority){
    return {title: title, description: description, dueDate: dueDate, priority: priority}
}


function showList(list){
    let listContainer = document.getElementById("listContainer");
    listContainer.innerHTML = "";
    const visibleListContainer = document.createElement("div");
    const visibleListTitle = document.createElement("h2");
    const visibleListDescription = document.createElement("h3");
    visibleListTitle.innerText = list.title;
    visibleListDescription.innerText = `Description: ${list.description}`;
    visibleListContainer.appendChild(visibleListTitle);
    visibleListContainer.appendChild(visibleListDescription);
    listContainer.appendChild(visibleListContainer);
    addTask(list);
}

function addTask(currentList){
    currentList.tasks.forEach((task) =>{
        let detail = document.createElement("details");
        let summery = document.createElement("summary");
        if (task.priority === true){
            detail.classList.add("priority")
        };
        let summaryTitle = document.createElement("p");
        let summaryDue = document.createElement("p");
        summaryTitle.innerText = task.title;
        summaryDue.innerText = `Due: ${task.dueDate}`;
        summery.appendChild(summaryTitle);
        summery.appendChild(summaryDue);
        detail.innerText = `${task.description}`;      
        detail.appendChild(summery);
        listContainer.appendChild(detail);
    })
}


function sideBarDisplay(){
    const projectContainer = document.getElementById("projectList");
    projectContainer.innerHTML = "";
    projectList.forEach((project) => {
        const projectItem = document.createElement("li");
        const projectDetail = document.createElement("details");
        const projectSummary = document.createElement("summary");
        const listForLists = document.createElement("ul");
        const renameProjectBtn = document.createElement("button");
        renameProjectBtn.innerText = "R";
        renameProjectBtn.setAttribute("title","Rename project");
        renameProjectBtn.addEventListener("click",()=>{
            rename(project,"false");
        })
        projectItem.appendChild(renameProjectBtn)
        projectSummary.innerText = project.title;
        project.lists.forEach((list) => {
            const listItem = document.createElement("li");
            const listTitle = document.createElement("p");
            const taskBtn = document.createElement("button");
            const renameBtn = document.createElement("button");
            taskBtn.innerText = "+";
            taskBtn.setAttribute("title","Add task");
            taskBtn.addEventListener("click",()=>{
                dialogCreationTest(list.tasks)
            })
            renameBtn.innerText = "R";
            renameBtn.setAttribute("title","Rename list");
            renameBtn.addEventListener("click",()=>{
                rename(list,"true");
            })
            listItem.appendChild(taskBtn);
            listItem.appendChild(renameBtn);
            listTitle.innerText = list.title;
            listItem.appendChild(listTitle);
            listItem.addEventListener("click",()=>{
                showList(list)
            });
            listForLists.appendChild(listItem);
        })
        projectDetail.appendChild(listForLists)
        projectDetail.appendChild(projectSummary)
        projectItem.appendChild(projectDetail)
        projectContainer.appendChild(projectItem)
    })
}

sideBarDisplay();

function dialogCreationTest(task){
    let createDialog = document.createElement("dialog");
    const formContainer = document.createElement("form");
    createDialog.id = "taskDialog";
    const titleDiv = document.createElement("div");
    let dialogLabel = document.createElement("label");
    dialogLabel.innerText = "Name the task: ";
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
    areaLabel.innerText = "Describe the task: ";
    areaLabel.setAttribute("for","description");
    Object.assign(dialogTextArea,{
        rows: "10",
        cols: "30",
        id: "description"
    })
    areaDiv.appendChild(areaLabel);
    areaDiv.appendChild(dialogTextArea);
    formContainer.appendChild(areaDiv);

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

    let closeBtn = document.createElement("button");
    closeBtn.innerText = "Submit";
    closeBtn.addEventListener("click",(event) => {
        event.preventDefault();
        addTodo(task);
    })
    formContainer.appendChild(closeBtn);
    createDialog.appendChild(formContainer);
    document.getElementById("content").appendChild(createDialog);
    createDialog.showModal()
    createDialog.addEventListener("close",()=>{
        document.getElementById("content").removeChild(createDialog);
    })
}

function addTodo(task){
    const title = document.getElementById("title");
    const description = document.getElementById("description");
    const dueDate = document.getElementById("dueDate");
    let priority = document.getElementById("priority");
    if(priority.checked){
        priority = true;
    }
    else{
        priority = false;
    };
    task.push(todoItem(title.value,description.value,dueDate.value,priority));
    title.value = "";
    description.value = "";
    dueDate.value = "";
    document.getElementById("priority").checked = false;
    document.getElementById("taskDialog").close();
}


function rename(object,isItList){
    const renameDia = document.createElement("dialog");
    const renameForm = document.createElement("form");
    const renameInputLabel = document.createElement("label");
    const renameInput = document.createElement("input");
    const renameBtn = document.createElement("button");
    renameDia.id = "renameDia";
    renameInputLabel.innerText = "Enter new name: ";
    renameInputLabel.setAttribute("for","renameInput");
    renameForm.appendChild(renameInputLabel);
    Object.assign(renameInput,{
        type: "text",
        name: "renameInput",
        id: "renameInput",
        value: object.title
    })
    renameForm.appendChild(renameInput);
    renameBtn.innerText = "Submit";
    renameBtn.addEventListener("click",(event)=>{
        event.preventDefault();
        let newName = document.getElementById("renameInput");
        object.title = newName.value;
        newName.value = "";
        sideBarDisplay()
        renameDia.close();
    })
    renameForm.appendChild(renameBtn);
    renameDia.appendChild(renameForm);
    document.getElementById("content").appendChild(renameDia);
    renameDia.showModal()
    renameDia.addEventListener("close",()=>{
        if (isItList == "true"){
            showList(object)
        };
        document.getElementById("content").removeChild(renameDia);
    })
}


const addProjectBtn = document.getElementById("addProject")
addProjectBtn.addEventListener("click",()=>{
    const projectDialog = document.createElement("dialog");
    const projectForm = document.createElement("form");
    const projectInputLabel = document.createElement("label");
    const projectInput = document.createElement("input");
    const projectSubBtn = document.createElement("button");
    const projectCancelBtn = document.createElement("button");
    projectInputLabel.innerText = "Name the new project: "
    projectInputLabel.setAttribute("for","projectInput");
    Object.assign(projectInput,{
        type: "text",
        name: "projectInput",
        id: "projectInput"
    })
    projectForm.appendChild(projectInputLabel);
    projectForm.appendChild(projectInput);
    projectSubBtn.innerText = "Submit"
    projectSubBtn.addEventListener("click",(event)=>{
        event.preventDefault();
        projectList.push(addProject(document.getElementById("projectInput").value));
        document.getElementById("projectInput").value = "";
        sideBarDisplay();
        projectDialog.close();
    })
    projectForm.appendChild(projectSubBtn);
    projectCancelBtn.innerText = "Cancel"
    projectCancelBtn.addEventListener("click",(event)=>{
        event.preventDefault();
        document.getElementById("projectInput").value = "";
        projectDialog.close();
    })
    projectForm.appendChild(projectCancelBtn);
    projectDialog.appendChild(projectForm);
    document.getElementById("content").appendChild(projectDialog);
    projectDialog.showModal()
    projectDialog.addEventListener("close",()=>{
        document.getElementById("content").removeChild(projectDialog);
    })
})

function addProject(newProject){
    return {
        title: newProject,
        id: crypto.randomUUID(),
        lists: []
    }
}

function addList(newList,newDescription){
    return{
        title: newList,
        description: newDescription,
        id: crypto.randomUUID(),
        lists: []        
    }
}