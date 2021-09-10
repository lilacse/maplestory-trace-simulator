const equipOptionsSlotsInput = document.getElementById("equipOptionsSlotsInput") as HTMLInputElement;
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

const averageTracesUsedValue = document.getElementById("averageTracesUsedValue") as HTMLSpanElement;
const averageMesosUsedOnTracesValue = document.getElementById("averageMesosUsedOnTracesValue") as HTMLSpanElement;
const medianTracesUsedValue = document.getElementById("medianTracesUsedValue") as HTMLSpanElement;
const medianMesosUsedOnTracesValue = document.getElementById("medianMesosUsedOnTracesValue") as HTMLSpanElement;
const tracesUsedIqrValue = document.getElementById("tracesUsedIqrValue") as HTMLSpanElement;
const mesosUsedOnTracesIqrValue = document.getElementById("mesosUsedOnTracesIqrValue") as HTMLSpanElement;

const averageCssUsedValue = document.getElementById("averageCssUsedValue") as HTMLSpanElement;
const averageMesosUsedOnCssValue = document.getElementById("averageMesosUsedOnCssValue") as HTMLSpanElement;
const medianCssUsedValue = document.getElementById("medianCssUsedValue") as HTMLSpanElement;
const medianMesosUsedOnCssValue = document.getElementById("medianMesosUsedOnCssValue") as HTMLSpanElement;
const cssUsedIqrValue = document.getElementById("cssUsedIqrValue") as HTMLSpanElement;
const mesosUsedOnCssIqrValue = document.getElementById("mesosUsedOnCssIqrValue") as HTMLSpanElement;

const averageInnoUsedValue = document.getElementById("averageInnoUsedValue") as HTMLSpanElement;
const averageMesosUsedOnInnoValue = document.getElementById("averageMesosUsedOnInnoValue") as HTMLSpanElement;
const medianInnoUsedValue = document.getElementById("medianInnoUsedValue") as HTMLSpanElement;
const medianMesosUsedOnInnoValue = document.getElementById("medianMesosUsedOnInnoValue") as HTMLSpanElement;
const innoUsedIqrValue = document.getElementById("innoUsedIqrValue") as HTMLSpanElement;
const mesosUsedOnInnoIqrValue = document.getElementById("mesosUsedOnInnoIqrValue") as HTMLSpanElement;

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

equipOptionsResetButton.onclick = resetEquipOptions;
simOptionsResetButton.onclick = resetSimOptions;