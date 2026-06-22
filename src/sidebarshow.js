import { rename } from "./rename.js";
import { dialogCreationTest } from "./addobject.js";
import { remove } from "./remove.js";
import { showList } from "./showlist.js"
import { listCheck } from "./projectlist.js";

export let projectList = [];
listCheck();


projectList.onchange = localStorage.setItem("todoList", JSON.stringify(projectList))


export function sideBarDisplay(){
    const projectContainer = document.getElementById("projectList");
    projectContainer.innerHTML = "";
    projectList.forEach((project) => {
        const projectItem = document.createElement("li");
        const projectDetail = document.createElement("details");
        const projectSummary = document.createElement("summary");
        const listForLists = document.createElement("ul");
        const renameProjectBtn = document.createElement("button");
        const addListBtn = document.createElement("button");
        const removeProjectBtn = document.createElement("button")
        renameProjectBtn.innerText = "R";
        renameProjectBtn.setAttribute("title","Rename project");
        renameProjectBtn.addEventListener("click",()=>{
            rename(project,"false");
        });
        projectItem.appendChild(renameProjectBtn);
        addListBtn.innerText = "+";
            addListBtn.setAttribute("title","Add task");
            addListBtn.addEventListener("click",()=>{
                dialogCreationTest(project.lists,"")
        });
        projectItem.appendChild(addListBtn)
        removeProjectBtn.innerText = "-";
        removeProjectBtn.setAttribute("title","Remove project")
        removeProjectBtn.addEventListener("click",()=>{
            remove(project.id,"project","")
        })
        projectItem.appendChild(removeProjectBtn);
        projectSummary.innerText = project.title;
        project.lists.forEach((list) => {
            const listItem = document.createElement("li");
            const listTitle = document.createElement("p");
            const taskBtn = document.createElement("button");
            const renameBtn = document.createElement("button");
            const removeListBtn = document.createElement("button")
            taskBtn.innerText = "+";
            taskBtn.setAttribute("title","Add task");
            taskBtn.addEventListener("click",()=>{
                dialogCreationTest(list.tasks,"true")
            })
            renameBtn.innerText = "R";
            renameBtn.setAttribute("title","Rename list");
            renameBtn.addEventListener("click",()=>{
                rename(list,"true");
            })
            removeListBtn.innerText = "-";
            removeListBtn.setAttribute("title","Remove project")
            removeListBtn.addEventListener("click",()=>{
            remove(list.id,project.id,"list")
            })
            listItem.appendChild(taskBtn);
            listItem.appendChild(removeListBtn);
            listItem.appendChild(renameBtn);
            listTitle.innerText = list.title;
            listItem.appendChild(listTitle);
            listItem.addEventListener("click",()=>{
                showList(list,project)
            });
            listForLists.appendChild(listItem);
        })
        projectDetail.appendChild(listForLists)
        projectDetail.appendChild(projectSummary)
        projectItem.appendChild(projectDetail)
        projectContainer.appendChild(projectItem)
    })
    localStorage.setItem("todoList", JSON.stringify(projectList))
}