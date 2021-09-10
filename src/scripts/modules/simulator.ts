import { TraceType, InnoType, CssType } from "../enums/scroll-types";
import { DiligenceLevel,GuildEnhancementMasteryLevel, GuildUpgradeSalvationLevel } from "../enums/trace-bonuses"
import * as TraceCosts from "../constants/trace-costs"

import { Equipment } from "./equipment";

export enum SimulationStep {
  TraceSuccess,
  TraceFail, 
  TraceFailSaved,
  InnoSuccess, 
  InnoFail, 
  CssSuccess, 
  CssFail,
  NoAction
}

export class SimulationRun {
  private _equip: Equipment;
  private _options: SimulationOptions;

  private _spellTracesUsed: number = 0; 
  private _cssUsed: number = 0; 
  private _innoUsed: number = 0; 

  private _simulationSteps: SimulationStep[] = [];

  constructor(equip: Equipment, options: SimulationOptions) {
    this._equip = equip;
    this._options = options;

    console.log("Created new simulation run with the following parameters.");
    console.log();
    console.log("Equipment");
    console.log("=========");
    console.log(`Number of upgrade slots: ${this._equip.remainingSlots}`);
    console.log(`Traces used per click (before discount): ${this._equip.getCostPerClick(false)}`);
    console.log();
    console.log("Simulation Options");
    console.log("==================");
    console.log(`Base success rate of trace: ${this._options.traceType * 100}%`)
    console.log(`Trace's cost in mesos: ${this._options.traceCost}`);
    console.log(`Number of fails before using Innocence Scroll: ${this._options.failsToInno}`);
    if (this._options.useArkInno) {
      console.log(`Use Ark Innocence Scroll: ${this._options.useArkInno}`);
    }
    else if (this._options.useSpellTraceInno) {
      console.log(`Use spell traces for Innocence Scrolls: ${this._options.useSpellTraceInno}`);
    }
    else {
      console.log(`Success rate of Innocence Scrolls used: ${this._options.useInnoType * 100}%`);
      console.log(`Innocence Scrolls' cost in mesos: ${this._options.innoCost}`);
    }
    if (this._options.useSpellTraceCss) {
      console.log(`Use spell traces for Clean Slate Scrolls: ${this._options.useSpellTraceCss}`);
    }
    else {
      console.log(`Success rate of Clean Slate Scrolls used: ${this._options.useCssType * 100}%`);
      console.log(`Clean Slate Scrolls' cost in mesos: ${this._options.cssCost}`);
    }
    console.log(`Has Discount: ${this._options.hasDiscount}`);
    console.log(`Has Fever: ${this._options.hasFever}`);
    console.log(`Diligence level bonus: ${this._options.diligenceLevel * 100}%`);
    console.log(`Guild Enhancement Mastery bonus: ${this._options.guildEnhancementMasteryBonus * 100}%`);
    console.log(`Guild Upgrade Salvation slot save chance: ${this._options.guildUpgradeSalvationLevel * 100}%`);
    console.log("\n");
  }

  get tracesUsed(): number {
    return this._spellTracesUsed;
  }

  get cssUsed(): number {
    return this._cssUsed;
  }

  get innoUsed(): number {
    return this._innoUsed;
  }

  get totalCssCost(): number {
    if (this._options.useSpellTraceCss == false) {
      return this._cssUsed * this._options.cssCost;
    }
    else return 0;
  }

  get totalInnoCost(): number {
    if (this._options.useSpellTraceInno == false && this._options.useArkInno == false) {
      return this._innoUsed * this._options.innoCost;
    }
    else return 0;
  }

  get totalTraceCost(): number {
    return this._spellTracesUsed * this._options.traceCost;
  }

  get runCompleted(): boolean {
    if (this._equip.remainingSlots == 0 && this._equip.failedSlots == 0) return true;
    else return false;
  }

  get simulationSteps(): SimulationStep[] {
    return this._simulationSteps;
  }

  get equip(): Equipment {
    return this._equip;
  }

  public nextStep(): SimulationStep {
    let rng = Math.random();

    if (this._equip.failedSlots < this._options.failsToInno && this._equip.remainingSlots > 0) {
      return this.doTrace(rng);
    }
    else if (this._equip.failedSlots >= this._options.failsToInno) {
      return this.doInno(rng);
    }
    else if (this._equip.remainingSlots == 0 && this._equip.failedSlots > 0) {
      return this.doCss(rng);
    }

    return SimulationStep.NoAction;
  }

  public runSimulation(): SimulationStep[] {
    while (this.runCompleted == false) {
      this.nextStep();
    }

    return this._simulationSteps;
  }

  public resetSimulation(): void {
    this._spellTracesUsed = 0;
    this._cssUsed = 0;
    this._innoUsed = 0;
    this._simulationSteps = [];
    this._equip.resetEquip();
  }

  private doTrace(rng: number): SimulationStep {
    this._spellTracesUsed += this._equip.getCostPerClick(this._options.hasDiscount);
    
    if (rng < this._options.traceSuccessRate) {
      this._equip.traceSuccess();
      this._simulationSteps.push(SimulationStep.TraceSuccess);
      return SimulationStep.TraceSuccess
    }
    else {
      if (this._equip.traceFail(this._options.guildUpgradeSalvationLevel)) {
        this._simulationSteps.push(SimulationStep.TraceFail);
        return SimulationStep.TraceFail
      }
      else {
        this._simulationSteps.push(SimulationStep.TraceFailSaved);
        return SimulationStep.TraceFailSaved
      }
    }
  }

  private doCss(rng: number): SimulationStep {
    if (this._options.useSpellTraceCss) {
      this.addCssSpellTraceCost();
    }
    else {
      this._cssUsed++;
    }

    if (rng < this._options.cssSuccessRate) {
      this._equip.cssSuccess();
      this._simulationSteps.push(SimulationStep.CssSuccess);
      return SimulationStep.CssSuccess;
    }
    else {
      this._simulationSteps.push(SimulationStep.CssFail);
      return SimulationStep.CssFail;
    }
  }

  private doInno(rng: number): SimulationStep {
    if (this._options.useSpellTraceInno || this._options.useArkInno) {
      this.addInnoSpellTraceCost();
    }
    else {
      this._innoUsed++;
    }

    if (rng < this._options.innoSuccessRate) {
      this._equip.innoSuccess();
      this._simulationSteps.push(SimulationStep.InnoSuccess);
      return SimulationStep.InnoSuccess;
    }
    else {
      this._simulationSteps.push(SimulationStep.InnoFail);
      return SimulationStep.InnoFail;
    }
  }

  private addCssSpellTraceCost() {
    if (this._options.hasDiscount) {
      this._spellTracesUsed += Math.ceil(TraceCosts.SPELL_TRACE_CSS_COST / 2);
    }
    else {
      this._spellTracesUsed += TraceCosts.SPELL_TRACE_CSS_COST;
    }
  }

  private addInnoSpellTraceCost() {
    if (this._options.useArkInno) {
      if (this._options.hasDiscount) {
        this._spellTracesUsed += Math.ceil(TraceCosts.SPELL_TRACE_ARK_INNO_COST / 2);
      }
      else {
        this._spellTracesUsed += TraceCosts.SPELL_TRACE_ARK_INNO_COST;
      }
    }
    else {
      if (this._options.hasDiscount) {
        this._spellTracesUsed += Math.ceil(TraceCosts.SPELL_TRACE_INNO_COST / 2);
      }
      else {
        this._spellTracesUsed += Math.ceil(TraceCosts.SPELL_TRACE_INNO_COST);
      }
    }
  }
}

export class SimulationTask {
  private _equip: Equipment;
  private _options: SimulationOptions;
  private _trials: number;

  constructor(equip: Equipment, options: SimulationOptions, trials: number) {
    if(trials < 0) {
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

export class SimulationTaskResult {
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
      + run.innoUsed * this._optionsRef.innoCost
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
    return this._totalMesosUsed / this.totalMesosUsedRecord.length
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

    if (list.length == 0) throw "Percentile could not be calculated from empty list.";
    if (percentile < 0 || percentile > 1) throw "Percentile must be between 0 and 1 (inclusive).";

    list.sort();

    let pos: number = (list.length - 1) * percentile;
    let pos_floor: number = Math.floor(pos);
    let pos_ceil: number = Math.ceil(pos);

    return list[pos_floor] + (pos - pos_floor) * (list[pos_ceil] - list[pos_floor]);
  }
}

export class SimulationOptions {
  public failsToInno: number = 0; 
  public useArkInno: boolean = false;
  public useSpellTraceInno: boolean = false; 
  public useSpellTraceCss: boolean = false;
  public cssCost: number = 0;
  public innoCost: number = 0;
  public traceCost: number = 0;
  public useCssType: CssType = CssType.Css10p;
  public useInnoType: InnoType = InnoType.Inno50p;
  public traceType: TraceType = TraceType.Trace100p;
  public hasFever: boolean = false; 
  public hasDiscount: boolean = false; 
  public diligenceLevel: DiligenceLevel = DiligenceLevel.DiligenceLv0;
  public guildEnhancementMasteryBonus: GuildEnhancementMasteryLevel = GuildEnhancementMasteryLevel.EnhanceMasteryLv0;
  public guildUpgradeSalvationLevel: GuildUpgradeSalvationLevel = GuildUpgradeSalvationLevel.UpgradeSalvationLv0;

  get traceSuccessRate(): number {
    let successRate: number;

    if (this.hasFever) {
      switch (this.traceType) {
        case TraceType.Trace100p: 
          successRate = 1;
          break;
        case TraceType.Trace70p:
          successRate = 0.95;
          break;
        case TraceType.Trace30p: 
          successRate = 0.45;
          break;
        case TraceType.Trace15p:
          successRate = 0.25;
          break;
      }
    }
    else {
      successRate = this.traceType;
    }

    successRate += this.diligenceLevel;
    successRate += this.guildEnhancementMasteryBonus;

    return Math.min(1, successRate);
  }

  get innoSuccessRate(): number {
    if (this.useArkInno) {
      if (this.hasFever) return 0.45;
      else return 0.3
    }

    if (this.useSpellTraceInno) {
      if (this.hasFever) return 0.45;
      else return 0.3;
    }
    else {
      return this.useInnoType;
    }
  }

  get cssSuccessRate(): number {
    if (this.useSpellTraceCss) {
      if (this.hasFever) return 0.1;
      else return 0.05;
    }
    else {
      return this.useCssType;
    }
  }
}