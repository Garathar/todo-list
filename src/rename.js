import { sideBarDisplay } from "./sidebarshow.js";

export function rename(object,isItList){
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
        document.getElementById("content").removeChild(renameDia);
    })
}