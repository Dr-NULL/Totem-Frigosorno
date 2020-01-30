import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorColaComponent } from './visor-cola.component';

describe('VisorColaComponent', () => {
  let component: VisorColaComponent;
  let fixture: ComponentFixture<VisorColaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisorColaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisorColaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
