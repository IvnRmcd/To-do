'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ToDoClass = function () {
    function ToDoClass(tasks, loadTasks, addEventListeners) {
        _classCallCheck(this, ToDoClass);

        this.tasks = JSON.parse(localStorage.getItem('TASKS'));
        if (!this.tasks) {
            this.tasks = [{ task: 'Go to the Dentist', isComplete: false }, { task: 'Do the Gardening', isComplete: true }, { task: 'Renew Library Account', isComplete: false }];
        }
        this.loadTasks();
        this.addEventListeners();
    }

    _createClass(ToDoClass, [{
        key: 'loadTasks',
        value: function loadTasks() {
            var _this = this;

            var tasksHtml = this.tasks.reduce(function (html, task, index) {
                return html += _this.generateTaskHtml(task, index);
            }, '');
            document.getElementById('taskList').innerHTML = tasksHtml;
            localStorage.setItem('TASKS', JSON.stringify(this.tasks));
        }
    }, {
        key: 'generateTaskHtml',
        value: function generateTaskHtml(task, index) {
            return ' <li class="list-group-item checkbox">\n        <div class="row">\n          <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 checkbox-item">\n            <label><input  id="toggleTaskStatus" type="checkbox" \n            onchange="todo.toggleTaskStatus(' + index + ')" value="" class="" ' + (task.isComplete ? 'checked' : '') + '></label>\n          </div>\n          <div class="col-md-10 col-xs-10 col-lg-10 col-sm-10 task-text ' + (task.isComplete ? 'complete' : '') + '">\n            ' + task.task + '\n          </div>\n                <div class="col-md-1 col-xs-1 col-lg-1 col-sm-1 delete-icon-area">\n                    <a class="" href="/" onClick="todo.deleteTask(event, ' + index + ')">\n                    <i id="deleteTask" data-id=' + index + '   class="delete-icon glyphicon glyphicon-trash">\n                    </i>\n                    </a>\n                </div>\n            </div>\n        </div>\n      </li>';
        }
    }, {
        key: 'toggleTaskStatus',
        value: function toggleTaskStatus(index) {
            this.tasks[index].isComplete = !this.tasks[index].isComplete;
            this.loadTasks();
        }
    }, {
        key: 'deleteTask',
        value: function deleteTask(event, taskIndex) {
            event.preventDefault();
            this.tasks.splice(taskIndex, 1);
            this.loadTasks();
        }
    }, {
        key: 'addTaskClick',
        value: function addTaskClick() {
            var target = document.getElementById('addTask');
            this.addTask(target.value);
            target.value = '';
        }
    }, {
        key: 'addTask',
        value: function addTask(task) {
            var newTask = {
                task: task,
                isComplete: false
            };
            var parentDiv = document.getElementById('addTask').parentElement;
            if (task === '') {
                parentDiv.classList.add('has-error');
            } else {
                parentDiv.classList.remove('has-error');
                this.tasks.push(newTask);
                this.loadTasks();
            }
        }
    }, {
        key: 'addEventListeners',
        value: function addEventListeners() {
            var _this2 = this;

            document.getElementById('addTask').addEventListener('keypress', function (event) {
                if (event.keyCode === 13) {
                    _this2.addTask(event.target.value);
                    event.target.value = '';
                }
            });
        }
    }]);

    return ToDoClass;
}();

var todo = void 0;
window.addEventListener('load', function () {
    todo = new ToDoClass();
});
//# sourceMappingURL=scripts.js.map