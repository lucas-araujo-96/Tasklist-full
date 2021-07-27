class Task {
    constructor() {
        this.taskText = document.querySelector(`.txtTarefa`).value;
        this.risked = false;
    };

    static insertTask(node) {
        document.querySelector(`.lista`).appendChild(node);
    };

    static generateDeleteBtn() {
        let btn = document.createElement(`input`);

        btn.setAttribute(`type`, `button`);
        btn.setAttribute(`value`, `Apagar`);
        btn.classList.add(`remove`);

        return btn;
    };

    static generateDoneChkBox() {
        let chk = document.createElement(`input`);

        chk.setAttribute(`type`, `checkbox`);
        chk.classList.add(`risk`);

        return chk;
    };

    configureNode() {
        const txtNode = document.createTextNode(this.taskText);
        const deleteBtn = Task.generateDeleteBtn();
        const doneChkBox = Task.generateDoneChkBox();

        let node = document.createElement(`li`);
        node.classList.add(`taskItem`);
        node.appendChild(doneChkBox);
        node.appendChild(txtNode);
        node.appendChild(deleteBtn);

        return node;
    };  
};

class TaskList {
    constructor() {
        this.taskList = document.querySelector(`.lista`);
        this.taskForm = document.querySelector(`.newTarefa`);
    };

    static listTasks() {
        const tasks = document.querySelectorAll(`.taskItem`);
        const taskArray = [];
        tasks.forEach((e) => {
            taskArray.push({task: e.innerText, risked: e.classList.contains(`risked`)});
        });
        return taskArray;
    };

    static updateTaskList() {
        const taskList = TaskList.listTasks();
        const jsonString = JSON.stringify(taskList);
        const options = {
            method: `POST`,
            headers: {
                'Content-Type':'application/json',
            },
            body:jsonString,
        };
        fetch(`/updateTaskList`, options).then((fetched) => {
            return;
        });
        return;
    };

    newTask() {
        const task = new Task();
        Task.insertTask(task.configureNode());
    };

    listenForEvents() {
        this.taskList.addEventListener(`click`, (e) => {
            const element = e.target;
            if(element.classList.contains(`remove`)) element.parentElement.remove();
            if (element.classList.contains(`risk`)) {
                if(element.parentElement.classList.contains(`risked`)) element.parentElement.classList.remove(`risked`);
                else element.parentElement.classList.add(`risked`);
            }; 
            TaskList.updateTaskList();
      });

      this.taskForm.addEventListener(`click`, (e) => {
        const element = e.target;
        if(element.classList.contains(`newTarefaBtn`)) {
            this.newTask();    
            TaskList.updateTaskList();
        }; 
      });
    };
};

(() => {
    const userTaskList = new TaskList();
    userTaskList.listenForEvents();
})();