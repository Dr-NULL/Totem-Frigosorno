import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetodoComponent } from './metodo.component';

describe('MetodoComponent', () => {
  let component: MetodoComponent;
  let fixture: ComponentFixture<MetodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
