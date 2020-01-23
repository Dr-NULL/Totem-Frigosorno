import { Component, AfterViewInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export interface SimpleModalData {
  title: string;
  message: string;
  duration?: number;
}

@Component({
  selector: 'app-simple-modal',
  templateUrl: './simple-modal.component.html',
  styleUrls: ['./simple-modal.component.scss']
})
export class SimpleModalComponent implements AfterViewInit {
  constructor(
    public instanceRef: MatDialogRef<SimpleModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: SimpleModalData
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
