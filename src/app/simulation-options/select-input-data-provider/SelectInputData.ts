import CssTypeData from './select-input-data/CssTypeData';
import DiligenceBonusData from './select-input-data/DiligenceBonusData';
import GuildEnhancementMasteryBonusData from './select-input-data/GuildEnhancementMasteryBonusData';
import GuildUpgradeSalvationLevelData from './select-input-data/GuildUpgradeSalvationBonusData';
import InnoTypeData from './select-input-data/InnoTypeData';
import TraceTypeData from './select-input-data/TraceTypeData';
import SelectInputDataInterface from './SelectInputDataInterface';
import SelectInputTypes from './SelectInputTypes';

let SelectInputData: Record<SelectInputTypes, SelectInputDataInterface[]> = {
  CssType: CssTypeData,
  InnoType: InnoTypeData,
  TraceType: TraceTypeData,
  DiligenceBonus: DiligenceBonusData,
  GuildEnhancementMasteryBonus: GuildEnhancementMasteryBonusData,
  GuildUpgradeSalvationLevel: GuildUpgradeSalvationLevelData,
};

export default SelectInputData;
