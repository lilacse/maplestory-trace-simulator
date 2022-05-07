import { Component, OnInit } from '@angular/core';
import Equipment from '../trace-simulator/modules/equipment/Equipment';
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

  public equipRef: Equipment;

  constructor(public traceSimulatorService: TraceSimulatorService) {
    this.equipRef = traceSimulatorService.equipment;

    this._defaultEquipTotalSlots = this.equipRef.totalSlotCount;
    this._defaultEquipInitialSucceededSlots = this.equipRef.succededSlotCount;
    this._defaultEquipInitialFailedSlots = this.equipRef.failedSlotCount;
    this._defaultEquipCostPerClick = this.equipRef.costPerClick;
  }

  ngOnInit(): void {
  }

  public resetEquipOptions(): void {
    this.equipRef.totalSlotCount = this._defaultEquipTotalSlots;
    this.equipRef.succededSlotCount = this._defaultEquipInitialSucceededSlots;
    this.equipRef.failedSlotCount = this._defaultEquipInitialFailedSlots;
    this.equipRef.costPerClick = this._defaultEquipCostPerClick;
  }

}
