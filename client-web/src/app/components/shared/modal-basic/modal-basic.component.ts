import { Component, AfterViewInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export interface ModalBasicData {
  title: string;
  message: string;
  duration?: number;
}

@Component({
  selector: 'app-simple-modal',
  templateUrl: './modal-basic.component.html',
  styleUrls: ['./modal-basic.component.scss']
})
export class ModalBasicComponent implements AfterViewInit {
  constructor(
    public instanceRef: MatDialogRef<ModalBasicComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: ModalBasicData
  ) { }

  ngAfterViewInit() {
    if (this.data.duration != null) {
      setTimeout(() => {
        this.instanceRef.close();
      }, this.data.duration);
    }
  }

  dismiss() {
    this.instanceRef.close();
  }
}
