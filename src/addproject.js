import { sideBarDisplay } from "./sidebarshow.js";
import { projectList } from "./sidebarshow.js";

export function btnAddProject(){
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
    localStorage.setItem("todoList", JSON.stringify(projectList));
}

function addProject(newProject){
    return {
        title: newProject,
        id: crypto.randomUUID(),
        lists: []
    }
}
