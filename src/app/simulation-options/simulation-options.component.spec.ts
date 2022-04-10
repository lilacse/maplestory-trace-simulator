import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationOptionsComponent } from './simulation-options.component';

describe('SimulationOptionsComponent', () => {
  let component: SimulationOptionsComponent;
  let fixture: ComponentFixture<SimulationOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimulationOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulationOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
