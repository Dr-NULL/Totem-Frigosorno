import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintRutComponent } from './print-rut.component';

describe('PrintRutComponent', () => {
  let component: PrintRutComponent;
  let fixture: ComponentFixture<PrintRutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintRutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintRutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
