(function(){
	const TaskManager = require('../../components/TaskManager.js');

	const taskWrapper = document.querySelector('#tasks-app');
	const listContainer = document.querySelector('#tasks-app ul');
	const loader = document.querySelector('#tasks-app .loader');
	const modal = document.querySelector('#tasks-app .task-modal');

	const taskMng = new TaskManager(taskWrapper, listContainer, loader, modal);
	taskMng.listTasks();
})();