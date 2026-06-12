
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
    {
    title: "My 2nd test project",
    lists: [
            {
                title: "My test list of 2nd",
                description: "This list is for testing",
                id: crypto.randomUUID(),
                tasks: []
            }
        ]
    },
];


let defaultList = {
    title: "My todo list",
    tasks: [],
    id: crypto.randomUUID()
}


function todoItem(title,description,dueDate,priority){
    return {title: title, description: description, dueDate: dueDate, priority: priority}
}

const subBtn = document.getElementById("submit")
subBtn.addEventListener("click",(event)=>{
    event.preventDefault();
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
    defaultList.tasks.push(todoItem(title.value,description.value,dueDate.value,priority));
    title.value = "";
    description.value = "";
    dueDate.value = "";
    document.getElementById("priority").checked = false;
    document.getElementById("addTask").close();
})

function showList(){
    let listContainer = document.getElementById("listContainer")
    listContainer.innerHTML = "";

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
    projectList.forEach((project) => {
        const projectItem = document.createElement("li");
        const projectDetail = document.createElement("details");
        const projectSummary = document.createElement("summary");
        const listForLists = document.createElement("ul");
        projectSummary.innerText = project.title;
        project.lists.forEach((list) => {
            const listItem = document.createElement("li");
            const listTitle = document.createElement("p");
            const taskBtn = document.createElement("button");
            taskBtn.innerText = "Add task"
            taskBtn.addEventListener("click",()=>{
                dialogCreationTest(list.tasks)
            })
            listItem.appendChild(taskBtn)
            listTitle.innerText = list.title;
            listItem.appendChild(listTitle);
            listItem.addEventListener("click",(list)=>{
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
    areaLabel.setAttribute("for","area");
    Object.assign(dialogTextArea,{
        rows: "10",
        cols: "30",
        id: "area"
    })
    areaDiv.appendChild(areaLabel);
    areaDiv.appendChild(dialogTextArea);
    formContainer.appendChild(areaDiv);

    const dateDiv = document.createElement("div");
    let dateLabel = document.createElement("label");
    dateLabel.innerText = "Set the due for the task: ";
    dateLabel.setAttribute("for","dialogDate");
    let dialogDueDate = document.createElement("input");
    Object.assign(dialogDueDate,{
        name: "dialogDate",
        type: "date",
        id: "dialogDate"
    })
    dateDiv.appendChild(dateLabel);
    dateDiv.appendChild(dialogDueDate);
    formContainer.appendChild(dateDiv);

    const priorityDiv = document.createElement("div");
    let priorityLabel = document.createElement("label");
    priorityLabel.innerText = "Check if it's a priority task: "
    priorityLabel.setAttribute("for","dialogPriority");
    let dialogCheckPriority = document.createElement("input");
    Object.assign(dialogCheckPriority,{
        name: "dialogPriority",
        type: "checkbox",
        id: "dialogPriority"
    })
    priorityDiv.appendChild(priorityLabel);
    priorityDiv.appendChild(dialogCheckPriority);
    formContainer.appendChild(priorityDiv);

    let closeBtn = document.createElement("button");
    closeBtn.innerText = "Close";
    Object.assign(closeBtn,{
        onclick: function(){
            taskDialog.close()
        }
    })
    formContainer.appendChild(closeBtn)
    createDialog.appendChild(formContainer);
    document.getElementById("content").appendChild(createDialog);
    createDialog.showModal()
    createDialog.addEventListener("close",()=>{
        document.getElementById("content").removeChild(createDialog);
    })
}