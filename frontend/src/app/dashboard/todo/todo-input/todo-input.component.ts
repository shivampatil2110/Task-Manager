import {
  Component,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/services/data.service';
import { TaskService } from 'src/services/task.service';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css'],
})
export class TodoInputComponent implements OnInit, OnChanges {
  taskForm: FormGroup;
  @Output() todoData = new EventEmitter<any>();
  @Output() statusData = new EventEmitter<[]>();

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private dataService: DataService
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {}
  ngOnInit(): void {
    this.getTodo();
  }
  getTodo() {
    this.taskService.getTasks().subscribe(
      (tasks) => {
        console.log(tasks);
        this.todoData.emit(tasks);
      },
      (error) => {
        console.log('Error fetching tasks', error);
      }
    );
  }

  addTask(): void {
    let todo = this.taskForm.getRawValue();
    this.taskService.addTask(todo).subscribe(() => {
      this.getTodo();
    });
    console.log(todo);
    this.taskForm.reset();
  }
  updateTodoData(updatedData: any[]) {
    // this.todoData = updatedData;
  }
}
