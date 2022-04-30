import Equipment from "../equipment/Equipment";
import SimulationRun from "./SimulationRun";
import SimulationOptions from "./SimulationOptions";
import SimulationTaskResult from "./SimulationTaskResult";


export default class SimulationTask {
  private _equip: Equipment;
  private _options: SimulationOptions;
  private _trials: number;

  constructor(equip: Equipment, options: SimulationOptions, trials: number) {
    if (trials < 0) {
      throw "Trails must be larger or equals to 0";
    }

    this._equip = equip;
    this._options = options;
    this._trials = trials;
  }

  get equip(): Equipment {
    return this._equip;
  }

  get options(): SimulationOptions {
    return this._options;
  }

  get trials(): number {
    return this._trials;
  }

  public runSimulation(): SimulationTaskResult {
    let runCount: number = 0;
    let result: SimulationTaskResult = new SimulationTaskResult(this._options);
    let simulationRun: SimulationRun = new SimulationRun(this._equip, this._options);

    while (runCount != this._trials) {
      simulationRun.resetSimulation();
      simulationRun.runSimulation();

      result.addRecord(simulationRun);

      runCount++;
    }

    return result;
  }
}
