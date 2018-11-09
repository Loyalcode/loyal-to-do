//(function () {
    var addTask = document.getElementById('addbutton'),
        inputTask = document.getElementById('app__task-new'),
        allTasks = document.getElementById('js-all-tasks'),
        doneTasks = document.getElementById('js-done-tasks'),
        unfTasks = document.getElementById('unf-tasks'),
        fTasks = document.getElementById('f-tasks'),
        poloska = document.getElementById('poloska');
    
    function createNewTask (task, finished) {
        var listItem=document.createElement('li'),
            checkbox=document.createElement('button');
        
        if(finished){
            checkbox.className="checkbox";
            checkbox.innerHTML="<i class='fa fa-check-circle-o' aria-hidden='true'></i>";
        }else {
            checkbox.className="checkbox";
            checkbox.innerHTML="<i class='fa fa-circle-o' aria-hidden='true'></i>";
        }
        
        var label=document.createElement('label');
        label.innerText=task;
        /*var input=document.createElement('input');
        input.type="text";*/
        var editButton=document.createElement('button');
        editButton.className="edit";
        editButton.innerHTML="<i class='fa fa-pencil' aria-hidden='true'></i>";
        var deleteButton=document.createElement('button');
        deleteButton.className="delete";
        deleteButton.innerHTML="<i class='fa fa-trash-o' aria-hidden='true'></i>";
        
        listItem.appendChild(checkbox);
        listItem.appendChild(label);
        //listItem.appendChild(input);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        
        return listItem;
    }
    
    function addTask1(){
        if(inputTask.value){
            var listItem=createNewTask(inputTask.value, false);
            unfTasks.appendChild(listItem);
            bindTaskEvents(listItem,finishTask);
            inputTask.value="";
            save();
            var rand=randomInteger(1,2);
            switch (rand){
                case rand=1:
                     var zplay = document.getElementById('sound1');
                break;
                case rand=2:
                    var zplay = document.getElementById('sound2');
                break;
            }
            zplay.play();
           
        }
    }
    addTask.onclick=addTask1;


    function randomInteger(min, max) {
        var rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);
        return rand;
  }



    function deleteTask(){
        var listItem = this.parentNode;
        var ul = listItem.parentNode;
        ul.removeChild(listItem);
        save();
        if (doneTasks.innerHTML>0 && allTasks.innerHTML>0) {
        poloska.style.width=((doneTasks.innerHTML)/(allTasks.innerHTML)*100)+'%';
        } else poloska.style.width=0;
    }
    function editTask(){
        var editButton=this;
        var listItem=this.parentNode;
        var label=listItem.querySelector('label');
        //var input=listItem.querySelector('input[type=text]');
        
        var containsClass=listItem.classList.contains('editMode');
        if (containsClass) {
           // label.innerText=input.value;
            editButton.className="edit";
            editButton.innerHTML="<i class='fa fa-pencil' aria-hidden='true'></i>";
            label.setAttribute('contenteditable','false');
            save();
        } else {
           // input.value=label.innerText;
            editButton.className="save";
            editButton.innerHTML="<i class='fa fa-floppy-o' aria-hidden='true'></i>";
            label.setAttribute('contenteditable','true');
            label.focus();
            save();
        }
        listItem.classList.toggle('editMode');
    }
    function finishTask(){
        var listItem = this.parentNode;
        var checkbox = listItem.querySelector('button.checkbox');
        checkbox.className="checkbox";
        checkbox.innerHTML="<i class='fa fa-check-circle-o' aria-hidden='true'></i>";
        
        fTasks.appendChild(listItem);
        bindTaskEvents(listItem,unfinishTask);
        save();
    }
    function unfinishTask(){
        var listItem = this.parentNode;
        var checkbox = listItem.querySelector('button.checkbox');
        checkbox.className = "checkbox";
        checkbox.innerHTML="<i class='fa fa-circle-o' aria-hidden='true'></i>";
        
        unfTasks.appendChild(listItem);
        bindTaskEvents(listItem,finishTask);
        save();
    }
    function bindTaskEvents (listItem, checkboxEvent) {
        var checkbox=listItem.querySelector('button.checkbox');
        var editButton=listItem.querySelector('button.edit');
        var deleteButton=listItem.querySelector('button.delete');
        
        checkbox.onclick=checkboxEvent;
        editButton.onclick=editTask;
        deleteButton.onclick=deleteTask;
    }
    
    function save(){
        var unfTasksArr=[];
        for(var i=0;i<unfTasks.children.length;i++){
            unfTasksArr.push(unfTasks.children[i].getElementsByTagName('label')[0].innerText);
        }
        var fTasksArr=[];
        
        for(var i=0;i<fTasks.children.length;i++){
            fTasksArr.push(fTasks.children[i].getElementsByTagName('label')[0].innerText);
        }
        allTasks.innerHTML=unfTasks.children.length+fTasks.children.length;
        doneTasks.innerHTML=fTasks.children.length;
        var p_paint = ((doneTasks.innerHTML)/(allTasks.innerHTML)*100)+'%';
        poloska.style.width=p_paint;
        localStorage.removeItem('todo');
        localStorage.setItem('todo',JSON.stringify({
            unfinishedTasks: unfTasksArr,
            finishedTasks: fTasksArr,
            all: allTasks.innerHTML,
            done: doneTasks.innerHTML,
            progress: p_paint
        }))
    }
    function load(){
        return JSON.parse(localStorage.getItem('todo'));
    }
    var data=load();

    for (var i=0;i<data.unfinishedTasks.length;i++){
        var listItem=createNewTask(data.unfinishedTasks[i], false);
        unfTasks.appendChild(listItem);
        bindTaskEvents(listItem,finishTask);
    }
    for (var i=0;i<data.finishedTasks.length;i++){
        var listItem=createNewTask(data.finishedTasks[i], true);
        fTasks.appendChild(listItem);
        bindTaskEvents(listItem,unfinishTask);
    }
    allTasks.innerHTML=data.all;
    doneTasks.innerHTML=data.done;
    if (doneTasks.innerHTML>0 && allTasks.innerHTML>0) {
    poloska.style.width=((doneTasks.innerHTML)/(allTasks.innerHTML)*100)+'%';
    } else poloska.style.width=0;



function func() {
  var dat = new Date();
  console.log( dat.getHours()+':'+dat.getMinutes() );
}

setInterval(func, 5000);

// })();