import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { TaskService } from 'src/services/task.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css'],
})
export class CompletedComponent implements OnInit {
  todoData: any = [];
  statusData: any = [];
  constructor(
    private tasksService: TaskService,
    public dataService: DataService
  ) {}
  ngOnInit(): void {
    this.getTodo();
  }

  getTodo() {
    this.tasksService.getTasks().subscribe((result) => {
      this.todoData = result;
      this.todoData.map((el: any) => {
        if (el.status == 'completed') {
          this.statusData.push(el);
        }
      });
    });
  }
  reProgress(index: number) {
    const id = this.statusData[index].id;
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
    this.tasksService.updateTask(id, obj).subscribe(() => {
      this.statusData = [];
      this.getTodo();
    });
  }
}
