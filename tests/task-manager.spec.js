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

		taskManager = new TaskManager(taskWrapperEl, listContainerEl, loaderEl, modalEl);
	});

	it('should retrieve tasks', (done) => {
		fetch(tasksListUrl, {
			method: 'GET',
        	headers: {
	            'Accept': 'application/json',
	            'Content-Type': 'application/json',
	        }
		}).then(response => {
			expect(response.ok).toBe(true);
			response.json().then( res => { 
				expect(res.length).not.toBeLessThan(1); 
				done(); 
			});
		});
	});

	it('should format tasks', () => {
		fetch(tasksListUrl, {
			method: 'GET',
        	headers: {
	            'Accept': 'application/json',
	            'Content-Type': 'application/json',
	        }
		}).then(response => {
			response.json().then( res => { 
				taskManager.formatTasks = jasmine.createSpy('formatTasks');
				taskManager.addTaskItem = jasmine.createSpy('addTaskItem');

				expect(taskManager.formatTasks).toHaveBeenCalled();
				expect(taskManager.addTaskItem).toHaveBeenCalled();
				done(); 
			});
		});
	});
});