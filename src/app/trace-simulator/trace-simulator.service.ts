import { Injectable } from '@angular/core';
import Equipment from './modules/equipment/Equipment';
import SimulationOptions from './modules/simulator/SimulationOptions';

@Injectable({
  providedIn: 'root'
})
export class TraceSimulatorService {

  public simulationOptions: SimulationOptions;
  public equipment: Equipment;

  constructor() { 
    this.simulationOptions = new SimulationOptions();
    this.equipment = new Equipment(8, 0, 0, 1350);
  }
}
