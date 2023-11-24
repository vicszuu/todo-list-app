window.addEventListener('load', () => {

    const form = document.querySelector("#new-task-form");

    const input = document.querySelector("#new-task-input");

    const list_el = document.querySelector("#task");


    const saveToDoList = () => {

        const tasks = Array.from(list_el.children).map(tasksElement => {

            return {

                task: tasksElement.querySelector('.text').value,

                completed: tasksElement.classList.contains('completed')

            };

        });

        localStorage.setItem('tasks', JSON.stringify(tasks));

    };


    const loadToDoList = () => {

        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

        storedTasks.forEach(task => {

            const tasks_el = createTaskElement(task.task, task.completed);

            list_el.appendChild(tasks_el);

        });

    };


    const createTaskElement = (task, completed) => {

        const tasks_el = document.createElement("div");

        tasks_el.classList.add("tasks");


        const tasks_content_el = document.createElement("div");

        tasks_content_el.classList.add("content");


        tasks_el.appendChild(tasks_content_el);


        const tasks_input_el = document.createElement("input");

        tasks_input_el.classList.add("text");

        tasks_input_el.type = "text";

        tasks_input_el.value = task;

        tasks_input_el.setAttribute("readonly", "readonly");


        tasks_content_el.appendChild(tasks_input_el);


        const tasks_actions_el = document.createElement("div");

        tasks_actions_el.classList.add("actions");


        const tasks_edit_el = document.createElement("button");

        tasks_edit_el.classList.add("edit");

        tasks_edit_el.innerHTML = completed ? '<i class="ri-save-3-line"></i>' : '<i class="ri-edit-box-line">edit</i>';


        const tasks_delete_el = document.createElement("button");

        tasks_delete_el.classList.add("delete");

        tasks_delete_el.innerHTML = '<i class="ri-delete-bin-7-line"></i>';


        tasks_actions_el.appendChild(tasks_edit_el);

        tasks_actions_el.appendChild(tasks_delete_el);


        tasks_el.appendChild(tasks_actions_el);


        if (completed) {

            tasks_el.classList.add('completed');

        }


        tasks_edit_el.addEventListener('click', () => {

            handleEdit(tasks_el, tasks_input_el, tasks_edit_el);

        });


        tasks_delete_el.addEventListener('click', () => {

            list_el.removeChild(tasks_el);

            saveToDoList();

        });


        return tasks_el;

    };


    const handleEdit = (tasks_el, tasks_input_el, tasks_edit_el) => {

        if (tasks_edit_el.innerText.toLowerCase() == "edit") {

            tasks_input_el.removeAttribute("readonly");

            tasks_input_el.focus();

            tasks_edit_el.innerHTML = '<i class="ri-save-3-line"></i>';

        } else {

            tasks_input_el.setAttribute("readonly", "readonly");

            tasks_edit_el.innerHTML = '<i class="ri-edit-box-line">edit</i>';

        }

        saveToDoList();

    };


    form.addEventListener('submit', (e) => {

        e.preventDefault();


        const tasks = input.value;


        if (!tasks) {

            alert("Please list your task");

            return;

        }


        const tasks_el = createTaskElement(tasks, false);

        list_el.appendChild(tasks_el);


        input.value = "";

        saveToDoList();

    });


    loadToDoList();

});