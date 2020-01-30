import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTotemComponent } from './select-totem.component';

describe('SelectTotemComponent', () => {
  let component: SelectTotemComponent;
  let fixture: ComponentFixture<SelectTotemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectTotemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTotemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
