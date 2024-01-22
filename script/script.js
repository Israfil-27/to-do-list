const addBtn=document.querySelector("#add-btn");
const newTaskInput=document.querySelector("#wrapper input");
const tasksContainer = document.querySelector("#tasks");
const error = document.querySelector("#error");
const countValue=document.querySelector(".count-value");
let taskCount=0;
const displayCount = (taskCount)=>{
    countValue.innerText=taskCount
}
const addTask = ()=>{
    const taskname =newTaskInput.value.trim();
    error.style.display="none"
    if (!taskname) {
        setTimeout(()=>{
            error.style.display="block"
        },200);
        return
    }
    const task = `<div class="task">
    <input type="checkbox" class="task-check">
    <span class="taskname">${taskname}</span>
    <button class="edit"><i class='bx bxs-edit-alt'></i></button>
    <button class="delete"><i class='bx bxs-trash'></i></button>
    </div>`
    tasksContainer.insertAdjacentHTML("beforeend",task)
    const deleteButton = document.querySelectorAll(".delete")
    deleteButton.forEach((button)=>{
        button.onclick = () =>{
            button.parentNode.remove()
            taskCount -= 1
            displayCount(taskCount)
        }
    })
    const editButton = document.querySelectorAll(".edit");
    editButton.forEach((editBtn)=>{
        editBtn.onclick =(e)=>{
            let targetElement=e.target;
            if(!(e.target.className == "edit")){
                targetElement=e.target.parentElement}
            newTaskInput.value=targetElement.previousElementSibling?.innerText;
            targetElement.parentNode.remove();
            taskCount -= 1;
            displayCount(taskCount)
        }
    })
    const tasksCheck = document.querySelectorAll(".task-check")
    tasksCheck.forEach((checkBox)=>{
        checkBox.onchange =()=>{
            checkBox.nextElementSibling.classList.toggle("completed");
            if (checkBox.checked) {
                taskCount -=1
            }
            else{
                taskCount+=1
            }
            displayCount(taskCount)
        }
    })
    taskCount += 1
    displayCount(taskCount)
    newTaskInput.value=""

}
addBtn.addEventListener("click",addTask)