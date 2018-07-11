export default class TaskManager {
	constructor(taskWrapper, taskListContainer, loader, modal) {
		this.tasksList = {};
		this.baseUrl = 'http://localhost:3000';
		this.tasksListUrl = this.baseUrl + '/tasks';
		this.tasksSaveUrl = this.baseUrl + '/tasks';
		this.tasksDeleteUrl = this.baseUrl + '/tasks/#id#';

		this.taskWrapper = taskWrapper;
		this.listContainer = taskListContainer;
		this.loader = loader;
		this.modal = modal;

		this.modal.querySelector('.close-modal').addEventListener('click', this.closeModal.bind(this));
		this.modal.querySelector('.task-save').addEventListener('click', this.saveTask.bind(this));
		this.taskWrapper.querySelector('.task-add').addEventListener('click', this.showModal.bind(this));
	}

	listTasks() {
	    return fetch(this.tasksListUrl, {
			method: 'GET',
        	headers: {
	            'Accept': 'application/json',
	            'Content-Type': 'application/json',
	        }
		}).then(response => {
			response.json().then(this.formatTasks.bind(this))
							.then(this.deleteEvent.bind(this))
							.then(this.updateEvent.bind(this));
		});
	}

	saveTask() {
		const taskId = this.modal.querySelector('input[name="task_id"]').value;
		let method = 'POST';

		let url = this.tasksSaveUrl;

		if(taskId !== '') {
			method = 'PUT';
			url += '/' + taskId;
		}

		const title = this.modal.querySelector('#modal-task-title').value;
		const description = this.modal.querySelector('#modal-task-description').value;

		const newTask = {
			'title': title,
			'description': description
		}

		fetch(url, {
			"method" : method,
        	headers: {
	            'Accept': 'application/json',
	            'Content-Type': 'application/json',
	        },
	        body: JSON.stringify(newTask)
		}).then(response => {
			if(method === 'PUT') {
				response.json().then(this.addTaskItem.bind(this))
								.then(this.closeModal.bind(this));
			} else {
				response.json().then(this.addTaskItem.bind(this))
							.then(this.deleteEvent.bind(this))
							.then(this.updateEvent.bind(this))
							.then(this.closeModal.bind(this));
			}
		});
	}

	deleteTask(taskId) {
		let deleteUrl = this.tasksDeleteUrl.replace('#id#', taskId);

		fetch(deleteUrl, {
			method: 'DELETE',
        	headers: {
	            'Accept': 'application/json',
	            'Content-Type': 'application/json',
	        }
		}).then(response => {
			this.listContainer.querySelector(`#item-${taskId}`).remove();
		});
	}

	formatTasks(tasks) {
		let listItem = '';
		if(tasks.length > 0) {
			for (let task of tasks) {
				this.addTaskItem(task);
			}
		}
		this.loader.style.display = 'none';
	}

	addTaskItem(task) {
		if(this.tasksList[task.id]) {
			const existingTask = document.querySelector('#item-'+task.id);
			existingTask.querySelector('.task-title').innerHTML = task.title;
			existingTask.querySelector('.task-description').innerHTML = task.description;
		} else {
			const taskId = task.id;
			this.tasksList[taskId] = task;
			const taskEl =  `<li id="item-${task.id}" class="task-item">
					<div class="task-meta">
						<h3 class="task-title">${task.title}</h3>	
						<p class="task-description">${task.description}</p>
					</div>
					<div class="task-actions">
						<button type="button" data-id=${task.id} class="task-update">Update</button>
						<button type="button" data-id=${task.id} class="task-delete">Delete</button>
					</div>
				</li>`;
			this.listContainer.innerHTML += taskEl;
		}
	}

	updateEvent() {
		const updateButtons = document.querySelectorAll('.task-update');
		(updateButtons || []).forEach(link => {
		    link.addEventListener('click', event => {
		        this.showModal(event.target.dataset.id);
		    }, false);
		});
	}

	deleteEvent() {
		const deleteButtons = document.querySelectorAll('.task-delete');
		(deleteButtons || []).forEach(link => {
		    link.addEventListener('click', event => {
		        if (!confirm('Sure u want to delete?')) {
		            event.preventDefault();
		            return false;
		        }

		        this.deleteTask(event.target.dataset.id);
		    });
		});
	}

	showModal(taskId) {
		this.modal.style.display = 'block';
		if(typeof taskId !== 'object') {
			const task = this.tasksList[taskId];
			this.modal.querySelector('input[name="task_id"]').value = taskId;
			this.modal.querySelector('h3').innerHTML = 'Update Task';
			this.modal.querySelector('button.task-save').text = 'Update Task';
			this.modal.querySelector('#modal-task-title').value = task.title;
			this.modal.querySelector('#modal-task-description').value = task.description;
		}
	}

	closeModal() {
	    this.modal.style.display = 'none';
		this.modal.querySelector('h3').innerHTML = 'Add New Task';
		this.modal.querySelector('button.task-save').text = '';
		this.modal.querySelector('#modal-task-title').value = '';
		this.modal.querySelector('#modal-task-description').value = '';
	}
}