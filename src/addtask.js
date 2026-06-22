import { remove } from "./remove.js";
import { projectList } from "./sidebarshow.js";

export function addTask(list,project){
    const taskListContainer = document.createElement("ul");
    list.tasks.forEach((task) =>{
        const taskContainer = document.createElement("li");
        const taskDoneBtn = document.createElement("button");
        const removeTask = document.createElement("button");
        if (task.done == false){
            taskDoneBtn.innerText = "✓";
            taskDoneBtn.setAttribute("title","Task finished");
        }
        else{
            taskContainer.classList.add("done")
            taskDoneBtn.innerText = "x";
            taskDoneBtn.setAttribute("title","Task not finished");
        }
        taskDoneBtn.addEventListener("click",()=>{
            if (taskContainer.classList.contains("done") != true){
                taskContainer.classList.add("done");
                taskDoneBtn.innerText = "x";
                taskDoneBtn.setAttribute("title","Task not finished")
                task.done = true;
            }
            else{
                taskContainer.classList.remove("done");
                taskDoneBtn.setAttribute("title","Task finished")
                taskDoneBtn.innerText = "✓"
                task.done = false;
            }
            localStorage.setItem("todoList", JSON.stringify(projectList))
        })
        removeTask.innerText = "-";
        removeTask.setAttribute("title","Remove task");
        removeTask.addEventListener("click",()=>{
            remove(task.id,list.id,project.id)
            localStorage.setItem("todoList", JSON.stringify(projectList))
        })
        taskContainer.appendChild(taskDoneBtn);
        let detail = document.createElement("details");
        let summery = document.createElement("summary");
        if (task.priority === true){
            taskContainer.classList.add("priority")
        };
        let summaryTitle = document.createElement("p");
        let summaryDue = document.createElement("p");
        summaryTitle.innerText = task.title;
        summaryDue.innerText = `Due: ${task.dueDate}`;
        summery.appendChild(summaryTitle);
        summery.appendChild(summaryDue);
        detail.innerText = `${task.description}`;      
        detail.appendChild(summery);
        taskContainer.appendChild(detail);
        taskContainer.appendChild(removeTask);
        taskListContainer.appendChild(taskContainer)
    })
    listContainer.appendChild(taskListContainer);
    localStorage.setItem("todoList", JSON.stringify(projectList))
}
