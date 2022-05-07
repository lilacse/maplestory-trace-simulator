import { Component, OnInit } from '@angular/core';
import { TraceSimulatorService } from '../trace-simulator/trace-simulator.service';

@Component({
  selector: 'app-eqiupment-editor',
  templateUrl: './eqiupment-editor.component.html',
  styleUrls: ['./eqiupment-editor.component.css']
})
export class EqiupmentEditorComponent implements OnInit {

  private readonly _defaultEquipTotalSlots: number;
  private readonly _defaultEquipInitialSucceededSlots: number;
  private readonly _defaultEquipInitialFailedSlots: number;
  private readonly _defaultEquipCostPerClick: number;

  constructor(public traceSimulatorService: TraceSimulatorService) {
    this._defaultEquipTotalSlots = traceSimulatorService.equipment.totalSlotCount;
    this._defaultEquipInitialSucceededSlots = traceSimulatorService.equipment.succededSlotCount;
    this._defaultEquipInitialFailedSlots = traceSimulatorService.equipment.failedSlotCount;
    this._defaultEquipCostPerClick = traceSimulatorService.equipment.costPerClick;
  }

  ngOnInit(): void {
  }

  public resetEquipOptions(): void {
    this.traceSimulatorService.equipment.totalSlotCount = this._defaultEquipTotalSlots;
    this.traceSimulatorService.equipment.succededSlotCount = this._defaultEquipInitialSucceededSlots;
    this.traceSimulatorService.equipment.failedSlotCount = this._defaultEquipInitialFailedSlots;
    this.traceSimulatorService.equipment.costPerClick = this._defaultEquipCostPerClick;
  }

}
