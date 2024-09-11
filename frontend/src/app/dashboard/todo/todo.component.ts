import { Component } from '@angular/core';
import { TaskService } from 'src/services/task.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  receivedTodo: any = [];
  receiveTodo(data: string) {
    this.receivedTodo = data;
  }
  constructor(private taskService: TaskService) {}
}
