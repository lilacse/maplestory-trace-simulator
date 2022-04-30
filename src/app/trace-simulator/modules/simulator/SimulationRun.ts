import SimulationStep from "../../enums/SimulationStep";
import * as TraceCosts from "../../constants/trace-costs";
import Equipment from "..//equipment/Equipment";
import SimulationOptions from "./SimulationOptions";


export default class SimulationRun {
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
    console.log(`Number of upgrade slots: ${this._equip.currentRemainingSlots}`);
    console.log(`Traces used per click (before discount): ${this._equip.getCostPerClick(false)}`);
    console.log();
    console.log("Simulation Options");
    console.log("==================");
    console.log(`Base success rate of trace: ${this._options.traceType * 100}%`);
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
    else
      return 0;
  }

  get totalInnoCost(): number {
    if (this._options.useSpellTraceInno == false && this._options.useArkInno == false) {
      return this._innoUsed * this._options.innoCost;
    }
    else
      return 0;
  }

  get totalTraceCost(): number {
    return this._spellTracesUsed * this._options.traceCost;
  }

  get runCompleted(): boolean {
    if (this._equip.currentRemainingSlots == 0 && this._equip.currentFailedSlots == 0)
      return true;
    else
      return false;
  }

  get simulationSteps(): SimulationStep[] {
    return this._simulationSteps;
  }

  get equip(): Equipment {
    return this._equip;
  }

  public nextStep(): SimulationStep {
    let rng = Math.random();

    if (this._equip.currentFailedSlots < this._options.failsToInno && this._equip.currentRemainingSlots > 0) {
      return this.doTrace(rng);
    }
    else if (this._equip.currentFailedSlots >= this._options.failsToInno) {
      return this.doInno(rng);
    }
    else if (this._equip.currentRemainingSlots == 0 && this._equip.currentFailedSlots > 0) {
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
      return SimulationStep.TraceSuccess;
    }
    else {
      if (this._equip.traceFail(this._options.guildUpgradeSalvationLevel)) {
        this._simulationSteps.push(SimulationStep.TraceFail);
        return SimulationStep.TraceFail;
      }
      else {
        this._simulationSteps.push(SimulationStep.TraceFailSaved);
        return SimulationStep.TraceFailSaved;
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
