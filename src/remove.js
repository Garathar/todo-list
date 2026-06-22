import { projectList } from "./sidebarshow.js";
import { sideBarDisplay } from "./sidebarshow.js";

export function remove(element,parent,grandparent){
    const itID = element
    if (parent == "project"){
       const itemIndex = projectList.indexOf(projectList.find(item => item.id == itID))
       projectList.splice(itemIndex,1);
    }
    else if(grandparent == "list"){
        const parentProject = projectList.indexOf(projectList.find(item => item.id == parent))
        const itemIndex = projectList[parentProject].lists.indexOf(projectList[parentProject].lists.find(list => list.id == element))
        projectList[parentProject].lists.splice(itemIndex,1);
    }
    else{
        const grandParentIndex = projectList.indexOf(projectList.find(item => item.id == grandparent));
        const parentIndex = projectList[grandParentIndex].lists.indexOf(projectList[grandParentIndex].lists.find(list => list.id == parent));
        const itemIndex = projectList[grandParentIndex].lists[parentIndex].tasks.indexOf(projectList[grandParentIndex].lists[parentIndex].tasks.find(task => task.id == element));
        projectList[grandParentIndex].lists[parentIndex].tasks.splice(itemIndex,1);
    } 
    sideBarDisplay();
    document.getElementById("listContainer").innerHTML = "";
}