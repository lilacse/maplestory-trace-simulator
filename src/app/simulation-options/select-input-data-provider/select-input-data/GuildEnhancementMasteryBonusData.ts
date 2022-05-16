import GuildEnhancementMasteryBonus from 'src/app/trace-simulator/enums/trace-bonuses/GuildEnhancementMasteryBonus';
import SelectInputDataInterface from '../SelectInputDataInterface';

let GuildEnhancementMasteryBonusData: SelectInputDataInterface[] = [
  {
    value: GuildEnhancementMasteryBonus.EnhanceMasteryLv0,
    selectValue: 'EnhanceMasteryLv0',
    displayString: 'Enhancement Mastery Lv0 (+0%)',
  },
  {
    value: GuildEnhancementMasteryBonus.EnhanceMasteryLv1,
    selectValue: 'EnhanceMasteryLv1',
    displayString: 'Enhancement Mastery Lv1 (+1%)',
  },
  {
    value: GuildEnhancementMasteryBonus.EnhanceMasteryLv2,
    selectValue: 'EnhanceMasteryLv2',
    displayString: 'Enhancement Mastery Lv2 (+2%)',
  },
  {
    value: GuildEnhancementMasteryBonus.EnhanceMasteryLv3,
    selectValue: 'EnhanceMasteryLv3',
    displayString: 'Enhancement Mastery Lv3 (+3%)',
  },
  {
    value: GuildEnhancementMasteryBonus.EnhanceMasteryLv4,
    selectValue: 'EnhanceMasteryLv4',
    displayString: 'Enhancement Mastery Lv4 (+4%)',
  },
];

export default GuildEnhancementMasteryBonusData;
