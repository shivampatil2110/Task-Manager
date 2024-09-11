import { Component } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private taskService: TaskService, private router: Router) {}

  logout(): void {
    this.taskService.logout().subscribe(() => {});
    this.router.navigate(['/']);
  }
}
