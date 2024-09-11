import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private taskService: TaskService) {}
  ngOnInit(): void {
    // this.getTasks();
  }
  // title = 'frontend';
  // taskTitle: string = '';
  // tasks: any = [];

  // createTask() {
  //   this.taskService
  //     .addTask({ title: this.taskTitle })
  //     .subscribe((result: any) => {
  //       this.tasks.push(result);
  //     });
  //   this.getTasks();
  // }
  // getTasks() {
  //   this.taskService.getTasks().subscribe((result: any) => {
  //     console.log(result);
  //     this.tasks = result;
  //   });
  // }
  // deleteTask(i: number) {
  //   this.taskService.deleteTask(this.tasks[i].id).subscribe((result: any) => {
  //     console.log(result);
  //   });
  //   this.getTasks();
  // }
}
