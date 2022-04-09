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

const numberConverter: Intl.NumberFormat = Intl.NumberFormat();
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

  minTracesUsedValue.innerHTML = numberConverter.format(simResult.minTracesUsed);
  maxTracesUsedValue.innerHTML = numberConverter.format(simResult.maxTracesUsed);
  averageTracesUsedValue.innerHTML = numberConverter.format(simResult.averageTracesUsed);
  averageMesosUsedOnTracesValue.innerHTML = numberConverter.format(simResult.averageMesosUsedOnTraces);
  medianTracesUsedValue.innerHTML = numberConverter.format(simResult.medianTracesUsed);
  medianMesosUsedOnTracesValue.innerHTML = numberConverter.format(simResult.medianMesosUsedOnTraces);
  tracesUsedIqrValue.innerHTML = numberConverter.format(simResult.tracesIqr);
  mesosUsedOnTracesIqrValue.innerHTML = numberConverter.format(simResult.mesosUsedOnTracesIqr);

  minCssUsedValue.innerHTML = numberConverter.format(simResult.minCssUsed);
  maxCssUsedValue.innerHTML = numberConverter.format(simResult.maxCssUsed);
  averageCssUsedValue.innerHTML = numberConverter.format(simResult.averageCssUsed);
  averageMesosUsedOnCssValue.innerHTML = numberConverter.format(simResult.averageMesosUsedOnCss);
  medianCssUsedValue.innerHTML = numberConverter.format(simResult.medianCssUsed);
  medianMesosUsedOnCssValue.innerHTML = numberConverter.format(simResult.medianMesosUsedOnCss);
  cssUsedIqrValue.innerHTML = numberConverter.format(simResult.cssUsedIqr);
  mesosUsedOnCssIqrValue.innerHTML = numberConverter.format(simResult.mesosUsedOnCssIqr);

  minInnoUsedValue.innerHTML = numberConverter.format(simResult.minInnoUsed);
  maxInnoUsedValue.innerHTML = numberConverter.format(simResult.maxInnoUsed);
  averageInnoUsedValue.innerHTML = numberConverter.format(simResult.averageInnoUsed);
  averageMesosUsedOnInnoValue.innerHTML = numberConverter.format(simResult.averageMesosUsedOnInno);
  medianInnoUsedValue.innerHTML = numberConverter.format(simResult.medianInnoUsed);
  medianMesosUsedOnInnoValue.innerHTML = numberConverter.format(simResult.medianMesosUsedOnInno);
  innoUsedIqrValue.innerHTML = numberConverter.format(simResult.innoUsedIqr);
  mesosUsedOnInnoIqrValue.innerHTML = numberConverter.format(simResult.mesosUsedOnInnoIqr);

  minMesosUsedValue.innerHTML = numberConverter.format(simResult.minMesosUsed);
  maxMesosUsedValue.innerHTML = numberConverter.format(simResult.maxMesosUsed);
  averageTotalMesosUsedValue.innerHTML = numberConverter.format(simResult.averageTotalMesosUsed);
  medianTotalMesosUsedValue.innerHTML = numberConverter.format(simResult.medianTotalMesosUsed);
  totalMesosUsedIqrValue.innerHTML = numberConverter.format(simResult.totalMesosUsedIqr);

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

  customTracesUsedPercentileValue.innerHTML = numberConverter.format(simResult!!.getTracesPercentile(percentile_float));
  customMesosUsedOnTracesPercentileValue.innerHTML = numberConverter.format(simResult!!.getMesosUsedOnTracesPercentile(percentile_float));
  customCssUsedPercentileValue.innerHTML = numberConverter.format(simResult!!.getCssPercentile(percentile_float));
  customMesosUsedOnCssPercentileValue.innerHTML = numberConverter.format(simResult!!.getMesosUsedOnCssPercentile(percentile_float));
  customInnoUsedPercentileValue.innerHTML = numberConverter.format(simResult!!.getInnoPercentile(percentile_float))
  customMesosUsedOnInnoPercentileValue.innerHTML = numberConverter.format(simResult!!.getMesosUsedOnInnoPercentile(percentile_float));
  customTotalMesosUsedPercentileValue.innerHTML = numberConverter.format(simResult!!.getTotalMesosUsedPercentile(percentile_float));
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