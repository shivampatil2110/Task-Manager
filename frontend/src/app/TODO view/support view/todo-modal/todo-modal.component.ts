import {
  Component,
  Inject,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-todo-modal',
  templateUrl: './todo-modal.component.html',
  styleUrls: ['./todo-modal.component.css'],
})
export class TodoModalComponent implements OnChanges, OnInit {
  constructor(
    public dialogRef: MatDialogRef<TodoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { items: any; selectedIndex: number }
  ) {}
  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit() {
    console.log('dialog', this.data);
  }

  get selectedItem() {
    console.log(this.data.items[this.data.selectedIndex]);
    return this.data.items[this.data.selectedIndex];
  }
  closeModal() {
    this.dialogRef.close();
  }
}
