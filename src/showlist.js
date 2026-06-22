import { addTask } from "./addtask.js";

export function showList(list,project){
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
    addTask(list,project);
}