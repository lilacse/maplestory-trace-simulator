import GuildUpgradeSalvationLevel from 'src/app/trace-simulator/enums/trace-bonuses/GuildUpgradeSalvationLevel';
import SelectInputDataInterface from '../SelectInputDataInterface';

let GuildUpgradeSalvationLevelData: SelectInputDataInterface[] = [
  {
    value: GuildUpgradeSalvationLevel.UpgradeSalvationLv0,
    selectValue: 'UpgradeSalvationLv0',
    displayString: 'Upgrade Salvatiion Lv0 (0%)',
  },
  {
    value: GuildUpgradeSalvationLevel.UpgradeSalvationLv1,
    selectValue: 'UpgradeSalvationLv1',
    displayString: 'Upgrade Salvatiion Lv1 (1%)',
  },
  {
    value: GuildUpgradeSalvationLevel.UpgradeSalvationLv2,
    selectValue: 'UpgradeSalvationLv2',
    displayString: 'Upgrade Salvatiion Lv2 (2%)',
  },
  {
    value: GuildUpgradeSalvationLevel.UpgradeSalvationLv3,
    selectValue: 'UpgradeSalvationLv3',
    displayString: 'Upgrade Salvatiion Lv3 (3%)',
  },
  {
    value: GuildUpgradeSalvationLevel.UpgradeSalvationLv4,
    selectValue: 'UpgradeSalvationLv4',
    displayString: 'Upgrade Salvatiion Lv4 (4%)',
  },
];

export default GuildUpgradeSalvationLevelData;
