import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from 'src/services/task.service';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.css'],
})
export class UpdateModalComponent {
  form: FormGroup;
  titleData: string = this.data.items[this.data.selectedIndex].title;
  descData: string = this.data.items[this.data.selectedIndex].description;

  constructor(
    public dialogRef: MatDialogRef<UpdateModalComponent>,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) public data: { items: any; selectedIndex: number },
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      title: [this.titleData],
      description: [this.descData],
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.form.getRawValue());
  }
}
