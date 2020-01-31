import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorServeComponent } from './visor-serve.component';

describe('VisorServeComponent', () => {
  let component: VisorServeComponent;
  let fixture: ComponentFixture<VisorServeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisorServeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisorServeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
