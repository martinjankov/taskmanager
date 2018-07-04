describe('TaskManager', () => {
	let  taskManager;
	let baseUrl = 'http://localhost:3000';
	let tasksListUrl = baseUrl + '/tasks';
	let tasksSaveUrl = baseUrl + '/tasks';
	let tasksDeleteUrl = baseUrl + '/tasks/#id#';

	beforeEach( () => {
		let taskWrapperEl = document.createElement('div');
		taskWrapperEl.id = 'tasks-app';
		
		let addTaskEl = document.createElement('button');
		addTaskEl.type = 'button';
		addTaskEl.classList.add('task-add');
		taskWrapperEl.appendChild(addTaskEl);

		let listContainerEl = document.createElement('ul');
		
		let loaderEl = document.createElement('div');
		loaderEl.classList.add('loader');
		
		let modalEl = document.createElement('div');
		modalEl.classList.add('task-modal');
		modalEl.id = 'task-modal';

		taskWrapperEl.appendChild(loaderEl);
		taskWrapperEl.appendChild(listContainerEl);
		taskWrapperEl.appendChild(modalEl);

		let closeModalEl = document.createElement('button');
		closeModalEl.type = 'button';
		closeModalEl.classList.add('close-modal');
		modalEl.appendChild(closeModalEl);

		let saveModalEl = document.createElement('button');
		saveModalEl.type = 'button';
		saveModalEl.classList.add('task-save');
		modalEl.appendChild(saveModalEl);

		let taskIdEl = document.createElement('input');
		taskIdEl.type = 'hidden';
		taskIdEl.name = 'task_id';
		modalEl.appendChild(taskIdEl);

		taskManager = new TaskManager(taskWrapperEl, listContainerEl, loaderEl, modalEl);
	});

	it('should have empty tasks array', () => {
		expect(Object.values(taskManager.tasksList).length).toEqual(0);
	});

	it('should access tasks db', (done) => {
		fetch(tasksListUrl, {
			method: 'GET',
        	headers: {
	            'Accept': 'application/json',
	            'Content-Type': 'application/json',
	        }
		}).then(response => {
			expect(response.ok).toBe(true);
		});
		done();
	});

	it('should format tasks', (done) => {
		let tasks = [];

		taskManager.formatTasks(tasks);
		done();
		
		expect(taskManager.loader.style.display).toEqual('none');
	});

	it('should add task', () => {
		const prevTasksSize = Object.values(taskManager.tasksList).length;

		let task = {
			'id' : 1,
			'title' : 'Test 1',
			'description' : 'This is test 1'
		}

		taskManager.addTaskItem(task);
		
		expect(Object.values(taskManager.tasksList).length).toEqual(prevTasksSize + 1);
	});
});