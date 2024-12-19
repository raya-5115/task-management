const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');


taskForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const taskInput = document.getElementById('task-input').value.trim();
    if (taskInput) {
        addTask(taskInput);
        document.getElementById('task-input').value = '';
    }
});

function addTask(task) {
    const taskItem = document.createElement('div');
    taskItem.className = 'task';
    taskItem.innerHTML = `
        <span>${task}</span>
        <button class="delete-btn">Delete</button>
    `;

    taskItem.querySelector('span').addEventListener('click', function () {
        taskItem.classList.toggle('completed');
    });

    taskItem.querySelector('.delete-btn').addEventListener('click', function () {
        taskItem.remove();
    });

    taskList.appendChild(taskItem);
}

/* const toggleThemeBtn = document.createElement('button');
toggleThemeBtn.textContent = 'Dark / Light';
document.body.prepend(toggleThemeBtn);

toggleThemeBtn.addEventListener('click', function () {
    document.body.classList.toggle('dark-theme');
}); */


document.head.insertAdjacentHTML(
    'beforeend',
    `<style>
        .dark-theme {
            background-color: #333;
            color: white;
        }
        .dark-theme input,
        .dark-theme button {
            background-color: #555;
            color: white;
        }
    </style>`
);

function saveTasks() {
  const tasks = Array.from(taskList.children).map(task => ({
      text: task.querySelector('span').textContent,
      completed: task.classList.contains('completed')
  }));
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
      const taskItem = document.createElement('div');
      taskItem.className = 'task';
      if (task.completed) taskItem.classList.add('completed');
      taskItem.innerHTML = `
          <span>${task.text}</span>
          <button class="delete-btn">Delete</button>
      `;
      taskItem.querySelector('span').addEventListener('click', function () {
          taskItem.classList.toggle('completed');
          saveTasks();
      });
      taskItem.querySelector('.delete-btn').addEventListener('click', function () {
          taskItem.remove();
          saveTasks();
      });
      taskList.appendChild(taskItem);
  });
}

loadTasks();

taskForm.addEventListener('submit', function () {
  saveTasks();
});
