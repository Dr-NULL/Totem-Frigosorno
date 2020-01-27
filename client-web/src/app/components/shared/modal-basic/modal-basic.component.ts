import { Component, AfterViewInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export interface ModalBasicData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-simple-modal',
  templateUrl: './modal-basic.component.html',
  styleUrls: ['./modal-basic.component.scss']
})
export class ModalBasicComponent implements AfterViewInit {
  closed: () => void;

  constructor(
    public instanceRef: MatDialogRef<ModalBasicComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: ModalBasicData
  ) { }

  ngAfterViewInit() {
  }

  dismiss() {
    this.instanceRef.close();
  }
}
