import { sideBarDisplay } from "./sidebarshow.js";

export function addTodo(task,checker){
    const title = document.getElementById("title");
    const description = document.getElementById("description");
    if(checker == "true"){
        const dueDate = document.getElementById("dueDate");
        let priority = document.getElementById("priority");
        if(priority.checked){
            priority = true;
        }
        else{
            priority = false;
        };
        task.push(todoItem(title.value,description.value,dueDate.value,priority));
    }
    else{
        task.push(listItem(title.value,description.value));
    }
    title.value = "";
    description.value = "";
    if(checker == "true"){
        dueDate.value = "";
        document.getElementById("priority").checked = false;
    }
    if(checker != "true"){
        sideBarDisplay();
    }
    document.getElementById("taskDialog").close();
}

function todoItem(title,description,dueDate,priority){
    return {title: title, description: description, dueDate: dueDate, priority: priority, done: false, id: crypto.randomUUID()}
}
function listItem(title,description){
    return {title: title, description: description, id: crypto.randomUUID(), tasks: []}
}