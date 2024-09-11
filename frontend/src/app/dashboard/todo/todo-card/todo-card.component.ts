import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from '../../../../services/task.service';
import { TodoModalComponent } from '../../../TODO view/support view/todo-modal/todo-modal.component';
import { UpdateModalComponent } from '../../../TODO view/support view/update-modal/update-modal.component';
import { DataService } from 'src/services/data.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.css'],
  providers: [DatePipe],
})
export class TodoCardComponent implements OnInit, OnChanges {
  // @Input() todo: any = [];
  @Input() todoData: any = [];
  statusTodo: any = [];
  matDatepicker: any;
  selectedDate: any;
  constructor(
    private taskService: TaskService,
    private dialoRef: MatDialog,
    private dataService: DataService,
    private datePipe: DatePipe
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.todoData.map((el: any) => {
      this.statusTodo = this.todoData.map((el: { status: any }) => el.status);
    });
    console.log(this.todoData);
  }

  ngOnInit(): void {}

  openDialog(index: number) {
    console.log(this.todoData[index]);
    this.dialoRef.open(TodoModalComponent, {
      data: { items: this.todoData, selectedIndex: index },
    });
  }

  openUpdateModal(index: number) {
    const i = this.todoData[index].id;
    const dialog = this.dialoRef.open(UpdateModalComponent, {
      data: { items: this.todoData, selectedIndex: index },
    });
    dialog.afterClosed().subscribe((result: any) => {
      console.log(result);
      this.taskService.updateTask(i, result).subscribe(() => {
        this.getTodo();
      });
    });
  }

  getTodo() {
    this.taskService.getTasks().subscribe(
      (tasks) => {
        console.log(tasks);
        this.todoData = tasks;
        this.statusTodo = this.todoData.map((el: { status: any }) => el.status);
        this.dataService.todoData = this.todoData;
        this.dataService.statusData = this.statusTodo;
        console.log(this.statusTodo);
      },
      (error) => {
        console.log('Error fetching tasks', error);
      }
    );
  }

  deleteTodo(i: number) {
    const todo_id = this.todoData[i].id;
    if (confirm('Are you sure you want to delete')) {
      this.taskService.deleteTask(todo_id).subscribe((data) => {
        console.log(data);
        this.getTodo();
      });
    }
  }

  markAsCompleted(i: number) {
    const todo_id = this.todoData[i].id;
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    let yourDate = new Date();
    yourDate.toISOString().split('T')[0];
    const offset = yourDate.getTimezoneOffset();
    yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);
    const date = yourDate.toISOString().split('T')[0];
    const complete = date + ` ${hours}:${minutes}:${seconds}`;
    const obj = {
      completed_at: complete,
      status: 'completed',
    };
    console.log(complete);
    this.statusTodo[i] = 'completed';
    this.taskService.updateTask(todo_id, obj).subscribe((data) => {
      this.getTodo();
    });
  }

  updateProgress(i: number) {
    const todo_id = this.todoData[i].id;
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    let yourDate = new Date();
    yourDate.toISOString().split('T')[0];
    const offset = yourDate.getTimezoneOffset();
    yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);
    const date = yourDate.toISOString().split('T')[0];
    const complete = date + ` ${hours}:${minutes}:${seconds}`;
    const obj = {
      started_at: complete,
      status: 'progress',
    };
    console.log(complete);
    this.statusTodo[i] = 'progress';
    this.taskService.updateTask(todo_id, obj).subscribe(async (data) => {
      this.getTodo();
    });
  }

  cancelTodo(i: number) {
    const todo_id = this.todoData[i].id;
    const obj = {
      status: 'cancel',
    };
    this.statusTodo[i] = 'cancel';
    this.taskService.updateTask(todo_id, obj).subscribe((data) => {
      this.deleteTodo(i);
      this.getTodo();
    });
  }

  setDueDate(event: MatDatepickerInputEvent<Date>, i: number) {
    const todo_id = this.todoData[i].id;
    this.selectedDate = event.value;
    const formattedDate = this.datePipe.transform(
      this.selectedDate,
      'yyyy-MM-dd'
    );
    const complete = formattedDate;
    const obj = {
      due_at: complete,
    };
    this.taskService.updateTask(todo_id, obj).subscribe((data) => {
      console.log(data);
      this.getTodo();
    });

    console.log(complete);
  }
}
