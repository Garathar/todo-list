import { projectList } from "./sidebarshow.js";



export function listCheck(){
    if (!localStorage.getItem("todoList")){
        populateList();
    } else {
        setList();
    }

}

function populateList(){
    projectList.push(
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
        }
    )
    localStorage.setItem("todoList", JSON.stringify(projectList))
}

function setList(){
    const currentList = JSON.parse(localStorage.getItem("todoList"));
    projectList.splice(0,projectList.length)
    currentList.forEach(element => {
        projectList.push(element)
    });
    localStorage.setItem("todoList", JSON.stringify(projectList))
}


