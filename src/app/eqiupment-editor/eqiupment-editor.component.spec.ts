import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EqiupmentEditorComponent } from './eqiupment-editor.component';

describe('EqiupmentEditorComponent', () => {
  let component: EqiupmentEditorComponent;
  let fixture: ComponentFixture<EqiupmentEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EqiupmentEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EqiupmentEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
