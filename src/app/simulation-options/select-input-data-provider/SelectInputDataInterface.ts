import CssType from 'src/app/trace-simulator/enums/probabilities/CssType';
import InnoType from 'src/app/trace-simulator/enums/probabilities/InnoType';
import TraceType from 'src/app/trace-simulator/enums/probabilities/TraceType';
import DiligenceBonus from 'src/app/trace-simulator/enums/trace-bonuses/DiligenceBonus';
import GuildEnhancementMasteryBonus from 'src/app/trace-simulator/enums/trace-bonuses/GuildEnhancementMasteryBonus';
import GuildUpgradeSalvationLevel from 'src/app/trace-simulator/enums/trace-bonuses/GuildUpgradeSalvationLevel';

interface SelectInputDataInterface {
  value:
    | CssType
    | InnoType
    | TraceType
    | DiligenceBonus
    | GuildEnhancementMasteryBonus
    | GuildUpgradeSalvationLevel;
  selectValue: string;
  displayString: string;
}

export default SelectInputDataInterface;
