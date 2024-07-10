document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');
    const addTaskButton = document.getElementById('add-task-button');

    // Load tasks from localStorage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task.text, task.completed));
    };

    // Save tasks to localStorage
    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll('.task').forEach(taskElement => {
            tasks.push({
                text: taskElement.querySelector('span').textContent,
                completed: taskElement.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Add task to DOM
    const addTaskToDOM = (taskText, completed = false) => {
        const taskElement = document.createElement('li');
        taskElement.classList.add('task');
        if (completed) {
            taskElement.classList.add('completed');
        }

        const span = document.createElement('span');
        span.textContent = taskText;
        span.contentEditable = true;
        span.addEventListener('input', saveTasks);

        const completeButton = document.createElement('button');
        completeButton.textContent = completed ? 'Undo' : 'Complete';
        completeButton.addEventListener('click', () => {
            taskElement.classList.toggle('completed');
            completeButton.textContent = taskElement.classList.contains('completed') ? 'Undo' : 'Complete';
            saveTasks();
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            taskElement.remove();
            saveTasks();
        });

        taskElement.appendChild(span);
        taskElement.appendChild(completeButton);
        taskElement.appendChild(deleteButton);
        taskList.appendChild(taskElement);
    };

    // Add task event
    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTaskToDOM(taskText);
            taskInput.value = '';
            saveTasks();
        }
    });

    // Load tasks on page load
    loadTasks();
});
