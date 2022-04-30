import SimulationRun from "./SimulationRun";
import SimulationOptions from "./SimulationOptions";


export default class SimulationTaskResult {
  private _optionsRef: SimulationOptions;

  constructor(options: SimulationOptions) {
    this._optionsRef = options;
  }

  public tracesUsedRecord: number[] = [];
  public cssUsedRecord: number[] = [];
  public innoUsedRecord: number[] = [];

  public totalMesosUsedRecord: number[] = [];

  public minTracesUsed: number = Infinity;
  public maxTracesUsed: number = -Infinity;
  public minCssUsed: number = Infinity;
  public maxCssUsed: number = -Infinity;
  public minInnoUsed: number = Infinity;
  public maxInnoUsed: number = -Infinity;
  public minMesosUsed: number = Infinity;
  public maxMesosUsed: number = -Infinity;

  private _totalTracesUsed: number = 0;
  private _totalCssUsed: number = 0;
  private _totalInnoUsed: number = 0;

  private _totalMesosUsed: number = 0;

  public addRecord(run: SimulationRun): void {
    this.tracesUsedRecord.push(run.tracesUsed);
    this._totalTracesUsed += run.tracesUsed;
    this.minTracesUsed = this.minTracesUsed > run.tracesUsed ? run.tracesUsed : this.minTracesUsed;
    this.maxTracesUsed = this.maxTracesUsed < run.tracesUsed ? run.tracesUsed : this.maxTracesUsed;

    this.cssUsedRecord.push(run.cssUsed);
    this._totalCssUsed += run.cssUsed;
    this.minCssUsed = this.minCssUsed > run.cssUsed ? run.cssUsed : this.minCssUsed;
    this.maxCssUsed = this.maxCssUsed < run.cssUsed ? run.cssUsed : this.maxCssUsed;

    this.innoUsedRecord.push(run.innoUsed);
    this._totalInnoUsed += run.innoUsed;
    this.minInnoUsed = this.minInnoUsed > run.innoUsed ? run.innoUsed : this.minInnoUsed;
    this.maxInnoUsed = this.maxInnoUsed < run.innoUsed ? run.innoUsed : this.maxInnoUsed;

    let mesosUsedForRun: number = this.getMesosUsedForRun(run);
    this.totalMesosUsedRecord.push(mesosUsedForRun);
    this._totalMesosUsed += mesosUsedForRun;
    this.minMesosUsed = this.minMesosUsed > mesosUsedForRun ? mesosUsedForRun : this.minMesosUsed;
    this.maxMesosUsed = this.maxMesosUsed < mesosUsedForRun ? mesosUsedForRun : this.maxMesosUsed;
  }

  private getMesosUsedForRun(run: SimulationRun): number {
    return run.tracesUsed * this._optionsRef.traceCost
      + run.cssUsed * this._optionsRef.cssCost
      + run.innoUsed * this._optionsRef.innoCost;
  }

  public get averageTracesUsed(): number {
    return this._totalTracesUsed / this.tracesUsedRecord.length;
  }

  public get averageMesosUsedOnTraces(): number {
    return this.averageTracesUsed * this._optionsRef.traceCost;
  }

  public get averageCssUsed(): number {
    return this._totalCssUsed / this.cssUsedRecord.length;
  }

  public get averageMesosUsedOnCss(): number {
    return this.averageCssUsed * this._optionsRef.cssCost;
  }

  public get averageInnoUsed(): number {
    return this._totalInnoUsed / this.innoUsedRecord.length;
  }

  public get averageMesosUsedOnInno(): number {
    return this.averageInnoUsed * this._optionsRef.innoCost;
  }

  public get averageTotalMesosUsed(): number {
    return this._totalMesosUsed / this.totalMesosUsedRecord.length;
  }

  public get medianTracesUsed(): number {
    return this.getTracesPercentile(0.5);
  }

  public get medianMesosUsedOnTraces(): number {
    return this.medianTracesUsed * this._optionsRef.traceCost;
  }

  public get medianCssUsed(): number {
    return this.getCssPercentile(0.5);
  }

  public get medianMesosUsedOnCss(): number {
    return this.medianCssUsed * this._optionsRef.cssCost;
  }

  public get medianInnoUsed(): number {
    return this.getInnoPercentile(0.5);
  }

  public get medianMesosUsedOnInno(): number {
    return this.medianInnoUsed * this._optionsRef.innoCost;
  }

  public get medianTotalMesosUsed(): number {
    return this.getTotalMesosUsedPercentile(0.5);
  }

  public getTracesPercentile(percentile: number): number {
    return this.getPercentile(this.tracesUsedRecord, percentile);
  }

  public getCssPercentile(percentile: number): number {
    return this.getPercentile(this.cssUsedRecord, percentile);
  }

  public getInnoPercentile(percentile: number): number {
    return this.getPercentile(this.innoUsedRecord, percentile);
  }

  public getTotalMesosUsedPercentile(percentile: number): number {
    return this.getPercentile(this.totalMesosUsedRecord, percentile);
  }

  public getMesosUsedOnTracesPercentile(percentile: number): number {
    return this.getTracesPercentile(percentile) * this._optionsRef.traceCost;
  }

  public getMesosUsedOnCssPercentile(percentile: number): number {
    return this.getCssPercentile(percentile) * this._optionsRef.cssCost;
  }

  public getMesosUsedOnInnoPercentile(percentile: number): number {
    return this.getInnoPercentile(percentile) * this._optionsRef.innoCost;
  }

  public get tracesIqr(): number {
    return this.getTracesPercentile(0.75) - this.getTracesPercentile(0.25);
  }

  public get mesosUsedOnTracesIqr(): number {
    return this.tracesIqr * this._optionsRef.traceCost;
  }

  public get cssUsedIqr(): number {
    return this.getCssPercentile(0.75) - this.getCssPercentile(0.25);
  }

  public get mesosUsedOnCssIqr(): number {
    return this.cssUsedIqr * this._optionsRef.cssCost;
  }

  public get innoUsedIqr(): number {
    return this.getInnoPercentile(0.75) - this.getInnoPercentile(0.25);
  }

  public get mesosUsedOnInnoIqr(): number {
    return this.innoUsedIqr * this._optionsRef.innoCost;
  }

  public get totalMesosUsedIqr(): number {
    return this.getTotalMesosUsedPercentile(0.75) - this.getTotalMesosUsedPercentile(0.25);
  }

  private getPercentile(list: number[], percentile: number): number {
    // implements the R-7 method
    if (list.length == 0)
      throw "Percentile could not be calculated from empty list.";
    if (percentile < 0 || percentile > 1)
      throw "Percentile must be between 0 and 1 (inclusive).";

    list.sort((a, b) => a - b);

    let pos: number = (list.length - 1) * percentile;
    let pos_floor: number = Math.floor(pos);
    let pos_ceil: number = Math.ceil(pos);

    return list[pos_floor] + (pos - pos_floor) * (list[pos_ceil] - list[pos_floor]);
  }
}
