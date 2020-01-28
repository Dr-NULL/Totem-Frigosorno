import { Component, AfterViewInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export interface ModalBasicData {
  title: string;
  message: string;
  duration?: number;
  callback?: () => void;
}

@Component({
  selector: 'app-simple-modal',
  templateUrl: './modal-basic.component.html',
  styleUrls: ['./modal-basic.component.scss']
})
export class ModalBasicComponent implements AfterViewInit {
  constructor(
    public ref: MatDialogRef<ModalBasicComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: ModalBasicData
  ) { }

  ngAfterViewInit() {
    // Lanzar callback después de que se cierre el modal
    if (this.data.callback != null) {
      this.ref
        .afterClosed()
        .subscribe(() => {
          this.data.callback();
        });
    }

    // Cerrar el modal después de x ms
    if (this.data.duration != null) {
      setTimeout(() => {
        this.ref.close();
      }, this.data.duration);
    }
  }

  dismiss() {
    this.ref.close();
  }
}
