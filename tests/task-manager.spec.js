describe('TaskManager', () => {
	let  taskManager;
	let baseUrl = 'http://localhost:3000';
	let tasksListUrl = baseUrl + '/tasks';
	let tasksSaveUrl = baseUrl + '/tasks';
	let tasksDeleteUrl = baseUrl + '/tasks/#id#';

	beforeEach( () => {
		taskManager = new TaskManager();
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