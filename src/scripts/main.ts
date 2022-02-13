import { CssType, InnoType, TraceType } from "./enums/scroll-types";
import { DiligenceLevel, GuildEnhancementMasteryLevel, GuildUpgradeSalvationLevel } from "./enums/trace-bonuses";
import { Equipment } from "./modules/equipment";
import { SimulationOptions, SimulationRun, SimulationTask, SimulationTaskResult } from "./modules/simulator";

//#region Consts of HTML elements

const equipOptionsSlotsInput = document.getElementById("equipOptionsSlotsInput") as HTMLInputElement;
const equipOptionsSuccededInput = document.getElementById("equipOptionsSucceededInput") as HTMLInputElement;
const equipOptionsFailedInput = document.getElementById("equipOptionsFailedInput") as HTMLInputElement;
const equipOptionsCostPerClickInput = document.getElementById("equipOptionsCostPerClickInput") as HTMLInputElement;

const equipOptionsResetButton = document.getElementById("equipOptionsResetButton") as HTMLButtonElement;

const simOptionsFailsToInnoInput = document.getElementById("simOptionsFailsToInnoInput") as HTMLInputElement;
const simOptionsUseArkInnoInput = document.getElementById("simOptionsUseArkInnoInput") as HTMLInputElement;
const simOptionsUseSpellTraceInnoInput = document.getElementById("simOptionsUseSpellTraceInnoInput") as HTMLInputElement;
const simOptionsUseSpellTraceCssInput = document.getElementById("simOptionsUseSpellTraceCssInput") as HTMLInputElement;
const simOptionsCssCostInput = document.getElementById("simOptionsCssCostInput") as HTMLInputElement;
const simOptionsInnoCostInput = document.getElementById("simOptionsInnoCostInput") as HTMLInputElement;
const simOptionsTraceCostInput = document.getElementById("simOptionsTraceCostInput") as HTMLInputElement;
const simOptionsUseCssTypeInput = document.getElementById("simOptionsUseCssTypeInput") as HTMLSelectElement;
const simOptionsUseInnoTypeInput = document.getElementById("simOptionsUseInnoTypeInput") as HTMLSelectElement;
const simOptionsTraceTypeInput = document.getElementById("simOptionsTraceTypeInput") as HTMLSelectElement;
const simOptionsHasFeverInput = document.getElementById("simOptionsHasFeverInput") as HTMLInputElement;
const simOptionsHasDiscountInput = document.getElementById("simOptionsHasDiscountInput") as HTMLInputElement;
const simOptionsDiligenceLevelInput = document.getElementById("simOptionsDiligenceLevelInput") as HTMLSelectElement;
const simOptionsGuildEnhancementMasteryBonusInput = document.getElementById("simOptionsGuildEnhancementMasteryBonusInput") as HTMLSelectElement;
const simOptionsGuildUpgradeSalvationLevelInput = document.getElementById("simOptionsGuildUpgradeSalvationLevelInput") as HTMLSelectElement;

const simOptionsResetButton = document.getElementById("simOptionsResetButton") as HTMLButtonElement;

const bulkSimOptionsIterationsInput = document.getElementById("bulkSimOptionsIterationsInput") as HTMLInputElement;

const bulkSimActionsStartAbortButton = document.getElementById("bulkSimActionsStartAbortButton") as HTMLButtonElement;

const bulkSimResult = document.getElementById("bulkSimResult") as HTMLDivElement;

const minTracesUsedValue = document.getElementById("minTracesUsedValue") as HTMLSpanElement;
const maxTracesUsedValue = document.getElementById("maxTracesUsedValue") as HTMLSpanElement;
const averageTracesUsedValue = document.getElementById("averageTracesUsedValue") as HTMLSpanElement;
const averageMesosUsedOnTracesValue = document.getElementById("averageMesosUsedOnTracesValue") as HTMLSpanElement;
const medianTracesUsedValue = document.getElementById("medianTracesUsedValue") as HTMLSpanElement;
const medianMesosUsedOnTracesValue = document.getElementById("medianMesosUsedOnTracesValue") as HTMLSpanElement;
const tracesUsedIqrValue = document.getElementById("tracesUsedIqrValue") as HTMLSpanElement;
const mesosUsedOnTracesIqrValue = document.getElementById("mesosUsedOnTracesIqrValue") as HTMLSpanElement;

const minCssUsedValue = document.getElementById("minCssUsedValue") as HTMLSpanElement;
const maxCssUsedValue = document.getElementById("maxCssUsedValue") as HTMLSpanElement;
const averageCssUsedValue = document.getElementById("averageCssUsedValue") as HTMLSpanElement;
const averageMesosUsedOnCssValue = document.getElementById("averageMesosUsedOnCssValue") as HTMLSpanElement;
const medianCssUsedValue = document.getElementById("medianCssUsedValue") as HTMLSpanElement;
const medianMesosUsedOnCssValue = document.getElementById("medianMesosUsedOnCssValue") as HTMLSpanElement;
const cssUsedIqrValue = document.getElementById("cssUsedIqrValue") as HTMLSpanElement;
const mesosUsedOnCssIqrValue = document.getElementById("mesosUsedOnCssIqrValue") as HTMLSpanElement;

const minInnoUsedValue = document.getElementById("minInnoUsedValue") as HTMLSpanElement;
const maxInnoUsedValue = document.getElementById("maxInnoUsedValue") as HTMLSpanElement;
const averageInnoUsedValue = document.getElementById("averageInnoUsedValue") as HTMLSpanElement;
const averageMesosUsedOnInnoValue = document.getElementById("averageMesosUsedOnInnoValue") as HTMLSpanElement;
const medianInnoUsedValue = document.getElementById("medianInnoUsedValue") as HTMLSpanElement;
const medianMesosUsedOnInnoValue = document.getElementById("medianMesosUsedOnInnoValue") as HTMLSpanElement;
const innoUsedIqrValue = document.getElementById("innoUsedIqrValue") as HTMLSpanElement;
const mesosUsedOnInnoIqrValue = document.getElementById("mesosUsedOnInnoIqrValue") as HTMLSpanElement;

const minMesosUsedValue = document.getElementById("minMesosUsedValue") as HTMLSpanElement;
const maxMesosUsedValue = document.getElementById("maxMesosUsedValue") as HTMLSpanElement;
const averageTotalMesosUsedValue = document.getElementById("averageTotalMesosUsedValue") as HTMLSpanElement;
const medianTotalMesosUsedValue = document.getElementById("medianTotalMesosUsedValue") as HTMLSpanElement;
const totalMesosUsedIqrValue = document.getElementById("totalMesosUsedIqrValue") as HTMLSpanElement;

const customPercentileStatsInput = document.getElementById("customPercentileStatsInput") as HTMLInputElement;
const customPercentileSubmitButton = document.getElementById("customPercentileSubmitButton") as HTMLButtonElement;

const customTracesUsedPercentile = document.getElementById("customTracesUsedPercentile") as HTMLSpanElement;
const customMesosUsedOnTracesPercentile = document.getElementById("customMesosUsedOnTracesPercentile") as HTMLSpanElement;
const customCssUsedPercentile = document.getElementById("customCssUsedPercentile") as HTMLSpanElement;
const customMesosUsedOnCssPercentile = document.getElementById("customMesosUsedOnCssPercentile") as HTMLSpanElement;
const customInnoUsedPercentile = document.getElementById("customInnoUsedPercentile") as HTMLSpanElement;
const customMesosUsedOnInnoPercentile = document.getElementById("customMesosUsedOnInnoPercentile") as HTMLSpanElement;
const customTotalMesosUsedPercentile = document.getElementById("customTotalMesosUsedPercentile") as HTMLSpanElement;

const customTracesUsedPercentileValue = document.getElementById("customTracesUsedPercentileValue") as HTMLSpanElement;
const customMesosUsedOnTracesPercentileValue = document.getElementById("customMesosUsedOnTracesPercentileValue") as HTMLSpanElement;
const customCssUsedPercentileValue = document.getElementById("customCssUsedPercentileValue") as HTMLSpanElement;
const customMesosUsedOnCssPercentileValue = document.getElementById("customMesosUsedOnCssPercentileValue") as HTMLSpanElement;
const customInnoUsedPercentileValue = document.getElementById("customInnoUsedPercentileValue") as HTMLSpanElement;
const customMesosUsedOnInnoPercentileValue = document.getElementById("customMesosUsedOnInnoPercentileValue") as HTMLSpanElement;
const customTotalMesosUsedPercentileValue = document.getElementById("customTotalMesosUsedPercentileValue") as HTMLSpanElement;

//#endregion

//#region Globals
let simResult: SimulationTaskResult|null = null;
//#endregion

function resetEquipOptions(): void {
  equipOptionsSlotsInput.value = "0";
  equipOptionsFailedInput.value = "0";
  equipOptionsCostPerClickInput.value = "0";
}

function resetSimOptions(): void {
  simOptionsFailsToInnoInput.value = "0";
  simOptionsUseArkInnoInput.checked = false;
  simOptionsUseSpellTraceInnoInput.checked = false;
  simOptionsUseSpellTraceCssInput.checked = false;
  simOptionsCssCostInput.value = "0";
  simOptionsInnoCostInput.value = "0";
  simOptionsTraceCostInput.value = "0";
  simOptionsUseCssTypeInput.value = "Css10p";
  simOptionsUseInnoTypeInput.value = "Inno50p";
  simOptionsTraceTypeInput.value = "Trace100p";
  simOptionsHasFeverInput.checked = false;
  simOptionsHasDiscountInput.checked = false;
  simOptionsDiligenceLevelInput.value = "DiligenceLv0";
  simOptionsGuildEnhancementMasteryBonusInput.value = "EnhanceMasteryLv0";
  simOptionsGuildUpgradeSalvationLevelInput.value = "UpgradeSalvationLv0";
}

function startBulkSimulation(): void {
  let equip = new Equipment(Number(equipOptionsSlotsInput.value), 
    Number(equipOptionsSuccededInput.value),
    Number(equipOptionsFailedInput.value), 
    Number(equipOptionsCostPerClickInput.value));
  
  let simOptions = new SimulationOptions();
  simOptions.failsToInno = Number(simOptionsFailsToInnoInput.value);
  simOptions.useArkInno = simOptionsUseArkInnoInput.checked;
  simOptions.useSpellTraceInno = simOptionsUseSpellTraceInnoInput.checked;
  simOptions.useSpellTraceCss = simOptionsUseSpellTraceCssInput.checked;
  simOptions.cssCost = Number(simOptionsCssCostInput.value);
  simOptions.innoCost = Number(simOptionsInnoCostInput.value);
  simOptions.traceCost = Number(simOptionsTraceCostInput.value);
  simOptions.useCssType = CssType[simOptionsUseCssTypeInput.value as keyof typeof CssType];
  simOptions.useInnoType = InnoType[simOptionsUseInnoTypeInput.value as keyof typeof InnoType];
  simOptions.traceType = TraceType[simOptionsTraceTypeInput.value as keyof typeof TraceType];
  simOptions.hasFever = simOptionsHasFeverInput.checked;
  simOptions.hasDiscount = simOptionsHasDiscountInput.checked;
  simOptions.diligenceLevel = DiligenceLevel[simOptionsDiligenceLevelInput.value as keyof typeof DiligenceLevel];
  simOptions.guildEnhancementMasteryBonus = GuildEnhancementMasteryLevel[simOptionsGuildEnhancementMasteryBonusInput.value as keyof typeof GuildEnhancementMasteryLevel];
  simOptions.guildUpgradeSalvationLevel = GuildUpgradeSalvationLevel[simOptionsGuildUpgradeSalvationLevelInput.value as keyof typeof GuildUpgradeSalvationLevel];

  let simTask = new SimulationTask(equip, simOptions, Number(bulkSimOptionsIterationsInput.value));

  simResult = simTask.runSimulation();

  console.log("Result: ");
  console.log("Traces used record: " + simResult.tracesUsedRecord);
  console.log("CSSs used record: " + simResult.cssUsedRecord);
  console.log("Innos used record: " + simResult.innoUsedRecord);
  console.log("Mesos used record: " + simResult.totalMesosUsedRecord);

  minTracesUsedValue.innerHTML = simResult.minTracesUsed.toString();
  maxTracesUsedValue.innerHTML = simResult.maxTracesUsed.toString();
  averageTracesUsedValue.innerHTML = simResult.averageTracesUsed.toString();
  averageMesosUsedOnTracesValue.innerHTML = simResult.averageMesosUsedOnTraces.toString();
  medianTracesUsedValue.innerHTML = simResult.medianTracesUsed.toString();
  medianMesosUsedOnTracesValue.innerHTML = simResult.medianMesosUsedOnTraces.toString();
  tracesUsedIqrValue.innerHTML = simResult.tracesIqr.toString();
  mesosUsedOnTracesIqrValue.innerHTML = simResult.mesosUsedOnTracesIqr.toString();

  minCssUsedValue.innerHTML = simResult.minCssUsed.toString();
  maxCssUsedValue.innerHTML = simResult.maxCssUsed.toString();
  averageCssUsedValue.innerHTML = simResult.averageCssUsed.toString();
  averageMesosUsedOnCssValue.innerHTML = simResult.averageMesosUsedOnCss.toString();
  medianCssUsedValue.innerHTML = simResult.medianCssUsed.toString();
  medianMesosUsedOnCssValue.innerHTML = simResult.medianMesosUsedOnCss.toString();
  cssUsedIqrValue.innerHTML = simResult.cssUsedIqr.toString();
  mesosUsedOnCssIqrValue.innerHTML = simResult.mesosUsedOnCssIqr.toString();

  minInnoUsedValue.innerHTML = simResult.minInnoUsed.toString();
  maxInnoUsedValue.innerHTML = simResult.maxInnoUsed.toString();
  averageInnoUsedValue.innerHTML = simResult.averageInnoUsed.toString();
  averageMesosUsedOnInnoValue.innerHTML = simResult.averageMesosUsedOnInno.toString();
  medianInnoUsedValue.innerHTML = simResult.medianInnoUsed.toString();
  medianMesosUsedOnInnoValue.innerHTML = simResult.medianMesosUsedOnInno.toString();
  innoUsedIqrValue.innerHTML = simResult.innoUsedIqr.toString();
  mesosUsedOnInnoIqrValue.innerHTML = simResult.mesosUsedOnInnoIqr.toString();

  minMesosUsedValue.innerHTML = simResult.minMesosUsed.toString();
  maxMesosUsedValue.innerHTML = simResult.maxMesosUsed.toString();
  averageTotalMesosUsedValue.innerHTML = simResult.averageTotalMesosUsed.toString();
  medianTotalMesosUsedValue.innerHTML = simResult.medianTotalMesosUsed.toString();
  totalMesosUsedIqrValue.innerHTML = simResult.totalMesosUsedIqr.toString();

  resetCustomPercentileDisplay();
}

function displayCustomPercentile(): void {
  let percentile: number = Number(customPercentileStatsInput.value)
  let percentile_float: number = percentile / 100;

  customTracesUsedPercentile.innerHTML = percentile.toString();
  customMesosUsedOnTracesPercentile.innerHTML = percentile.toString();
  customCssUsedPercentile.innerHTML = percentile.toString();
  customMesosUsedOnCssPercentile.innerHTML = percentile.toString();
  customInnoUsedPercentile.innerHTML = percentile.toString();
  customMesosUsedOnInnoPercentile.innerHTML = percentile.toString();
  customTotalMesosUsedPercentile.innerHTML = percentile.toString();

  customTracesUsedPercentileValue.innerHTML = simResult!!.getTracesPercentile(percentile_float).toString();
  customMesosUsedOnTracesPercentileValue.innerHTML = simResult!!.getMesosUsedOnTracesPercentile(percentile_float).toString();
  customCssUsedPercentileValue.innerHTML = simResult!!.getCssPercentile(percentile_float).toString();
  customMesosUsedOnCssPercentileValue.innerHTML = simResult!!.getMesosUsedOnCssPercentile(percentile_float).toString();
  customInnoUsedPercentileValue.innerHTML = simResult!!.getInnoPercentile(percentile_float).toString();
  customMesosUsedOnInnoPercentileValue.innerHTML = simResult!!.getMesosUsedOnInnoPercentile(percentile_float).toString();
  customTotalMesosUsedPercentileValue.innerHTML = simResult!!.getTotalMesosUsedPercentile(percentile_float).toString();
}

function resetCustomPercentileDisplay(): void {
  customPercentileStatsInput.value = "";

  customTracesUsedPercentile.innerHTML = " -- ";
  customMesosUsedOnTracesPercentile.innerHTML = " -- ";
  customCssUsedPercentile.innerHTML = " -- ";
  customMesosUsedOnCssPercentile.innerHTML = " -- ";
  customInnoUsedPercentile.innerHTML = " -- ";
  customMesosUsedOnInnoPercentile.innerHTML = " -- ";
  customTotalMesosUsedPercentile.innerHTML = " -- ";

  customTracesUsedPercentileValue.innerHTML = " -- ";
  customMesosUsedOnTracesPercentileValue.innerHTML = " -- ";
  customCssUsedPercentileValue.innerHTML = " -- ";
  customMesosUsedOnCssPercentileValue.innerHTML = " -- ";
  customInnoUsedPercentileValue.innerHTML = " -- ";
  customMesosUsedOnInnoPercentileValue.innerHTML = " -- ";
  customTotalMesosUsedPercentileValue.innerHTML = " -- ";
}

equipOptionsResetButton.onclick = resetEquipOptions;
simOptionsResetButton.onclick = resetSimOptions;
bulkSimActionsStartAbortButton.onclick = startBulkSimulation;
customPercentileSubmitButton.onclick = displayCustomPercentile;