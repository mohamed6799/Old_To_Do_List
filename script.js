let texttask = document.querySelector(".addTask input[type='text']");
let submit = document.querySelector(".addTask input[type='submit']")
let tasks = document.querySelector(".tasks");
let Arr=[];

onload = function(){
    texttask.focus();
}
submit.addEventListener("click",function(){
    if(texttask.value != ""){
        let Obj = {
            value : texttask.value,
            id :    Date.now(),
            done : false
        }
        Arr.push(Obj);
        addtoStorage(Arr);
        createElement();
        texttask.value = "";
    }
})

savetoTask()

// add Array to localStorage
function addtoStorage(e){
    let trans = JSON.stringify(e);
    window.localStorage.setItem("tasks",trans);
}

// get Array to localStorage and createElement to html
function createElement(){
    // get Array to localStorage
    let getArr = JSON.parse(window.localStorage.getItem("tasks"));
    tasks.innerHTML = "";

    for( let  i in getArr){
        let createDiv = document.createElement("div");
        createDiv.className = "task";
        createDiv.id = getArr[i].id;
        createDiv.style.cssText = `
        padding:10px 20px ;
        background-color:white;
        border-radius : 10px 50px;
        margin:7px 0 ;
        display : flex;
        transition : 0.2s ease;
        box-shadow : 0 0 5px rgba(50,50,50,0.7);
        justify-content : space-between;
        align-items  :center;
        `;
        let createP = document.createElement("p");
        
        let createText = document.createTextNode(getArr[i].value);
        let createBut = document.createElement("button");
        createBut.textContent = "X";
        createBut.style.cssText = `
        padding:10px 12px;
        cursor:pointer;
        background-color:orangered;
        color:white;
        border-radius : 10px ;
        border:none;
        `;
        createP.appendChild(createText);
        createDiv.appendChild(createText);
        createDiv.appendChild(createBut);
        tasks.appendChild(createDiv);

        doneTask(createDiv,getArr);
        deletetask(createBut);
    }   
}
function savetoTask(){
    if(window.localStorage.length>0){
        if(window.localStorage.getItem.length>0){
            Arr =JSON.parse(window.localStorage.getItem("tasks"));
            createElement();
        }
    }
}
function deletetask(e){
    e.addEventListener("click",function(u){
        let taskss = JSON.parse(window.localStorage.getItem("tasks"));
        let m = taskss.filter((a)=> a.id != u.target.parentElement.id);
        addtoStorage(m);
        savetoTask();
    })
}
function doneTask(createDiv,getArr){
    createDiv.addEventListener("click",function(e){
        for(let i in getArr){
            if(e.target.id == getArr[i].id){
                getArr[i].done == false ? getArr[i].done = true : getArr[i].done = false;
                addtoStorage(getArr);
                savetoTask();
                getArr[i].done == true ? createDiv.classList.add("done"):createDiv.classList.remove("done");
            }
        }
    })
    for(let i in getArr){
        if(createDiv.id == getArr[i].id){
            getArr[i].done == true ? createDiv.classList.add("done"):createDiv.classList.remove("done");
        }
    }
}


