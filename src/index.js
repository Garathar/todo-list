let projectList = [{
    title: "My project",
    lists: [
        {
            title: "My todo list",
            description: "This is the default list, for everyday tasks",
            tasks: []
        }
    ]
}];


let defaultList = {
    title: "My todo list",
    tasks: []
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
            const listTitle = document.createElement("p")
            listTitle.innerText = list.title
            listItem.appendChild(listTitle)
            listItem.addEventListener("click",(list)=>{
                showList(list)
            })
            listForLists.appendChild(listItem)
        })
        projectDetail.appendChild(listForLists)
        projectDetail.appendChild(projectSummary)
        projectItem.appendChild(projectDetail)
        projectContainer.appendChild(projectItem)
    })
}

sideBarDisplay();