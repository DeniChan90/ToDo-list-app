var taskInput = document.getElementById('new-task'),
    addButton = document.getElementsByTagName('button')[0],
    inCompletedTaskHolder = document.getElementById('incomplete-tasks'),
    CompletedTaskHolder = document.getElementById('completed-tasks'); 

var createNewTaskElement = function(taskString) {
    var listItem = document.createElement("li"),
        label = document.createElement("label"),
        editInput = document.createElement("input"),
        checkBox = document.createElement("input"),
        editButton = document.createElement("button"),
        deleteButton = document.createElement("button");
    
    checkBox.type = "checkbox";
    editInput.type = "text";
    
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
    
    label.innerText = taskString ;
    
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    
    
    return listItem ;
        
    }
var addTask = function() {
    console.log('Add...')
    
    var listItem = createNewTaskElement(taskInput.value);
    inCompletedTaskHolder.appendChild(listItem);
    bindEvent(listItem, taskCompleted);
    taskInput.value = "";
    }
    
var editTask = function() {
    var listItem = this.parentNode ,
        editInput = listItem.querySelector("input[type=text]"),
        label = listItem.querySelector("label"),
        containsClass = listItem.classList.contains("editMode");
    
    if(containsClass) {
        label.innerText = editInput.value ;
        } 
    else {
        editInput.value = label.innerText ;
        }
    listItem.classList.toggle("editMode");
    }

var deleteTask = function() {
    var listItem = this.parentNode,
        ul = listItem.parentNode;
    
    ul.removeChild(listItem);
    }

var taskCompleted = function() {
    var listItem = this.parentNode;
    CompletedTaskHolder.appendChild(listItem);
    bindEvent(listItem, taskIncompleted);
    }

var taskIncompleted = function() {
    var listItem = this.parentNode;
    inCompletedTaskHolder.appendChild(listItem);
    bindEvent(listItem, taskCompleted);
    }

var bindEvent = function(listElement, checkBoxValue){
    var checkBox = listElement.querySelector("input[type=checkbox]"),
        editButton = listElement.querySelector("button.edit"),
        deleteButton = listElement.querySelector("button.delete");
    
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxValue ;
    }


addButton.addEventListener("click", addTask)

for(var i = 0; i<inCompletedTaskHolder.children.length; i++){
    bindEvent(inCompletedTaskHolder.children[i], taskCompleted);
    }

for(var i = 0; i<CompletedTaskHolder.children.length; i++){
    bindEvent(CompletedTaskHolder.children[i], taskIncompleted);
    }

