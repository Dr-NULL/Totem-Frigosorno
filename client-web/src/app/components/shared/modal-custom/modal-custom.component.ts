import { Component, AfterViewInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export interface ModalCustomButton {
  text: string;
  icon: string;
  color: 'primary' | 'accent' | 'warn';
  dissmiss?: boolean;
  callback?: () => void;
}

export interface ModalCustomData {
  title: string;
  message: string;
  duration?: number;
  callback?: () => void;
  buttons?: ModalCustomButton[];
}
@Component({
  selector: 'app-modal-custom',
  templateUrl: './modal-custom.component.html',
  styleUrls: ['./modal-custom.component.scss']
})
export class ModalCustomComponent implements AfterViewInit {
  constructor(
    public ref: MatDialogRef<ModalCustomComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: ModalCustomData
  ) { }

  ngAfterViewInit() {
    // Ejecutar Callback
    if (this.data.callback != null) {
      this.ref
        .afterClosed()
        .subscribe(() => {
          this.data.callback();
        });
    }

    // Autoclose
    if (this.data.duration != null) {
      setTimeout(() => {
        this.ref.close();
      }, this.data.duration);
    }

    // Default Button
    if (this.data.buttons == null) {
      this.data.buttons = [];
    }
    if (this.data.buttons.length === 0) {
      this.data.buttons.push({
        text: 'Cerrar',
        icon: 'fas fa-thumbs-up',
        color: 'primary',
        dissmiss: true
      });
    }
  }

  execute(dissmiss: boolean, callback: () => void) {
    if (dissmiss !== false) {
      this.ref.close();
    }

    if (callback != null) {
      callback();
    }
  }
}
