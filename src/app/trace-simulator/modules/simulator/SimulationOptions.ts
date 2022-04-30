import InnoType from "../../enums/probabilities/InnoType";
import CssType from "../../enums/probabilities/CssType";
import TraceType from "../../enums/probabilities/TraceType";
import GuildUpgradeSalvationBonus from "../../enums/trace-bonuses/GuildUpgradeSalvationBonus";
import GuildEnhancementMasteryBonus from "../../enums/trace-bonuses/GuildEnhancementMasteryBonus";
import DiligenceBonus from "../../enums/trace-bonuses/DiligenceBonus";


export default class SimulationOptions {
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
  public diligenceLevel: DiligenceBonus = DiligenceBonus.DiligenceLv0;
  public guildEnhancementMasteryBonus: GuildEnhancementMasteryBonus = GuildEnhancementMasteryBonus.EnhanceMasteryLv0;
  public guildUpgradeSalvationLevel: GuildUpgradeSalvationBonus = GuildUpgradeSalvationBonus.UpgradeSalvationLv0;

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
      if (this.hasFever)
        return 0.45;
      else
        return 0.3;
    }

    if (this.useSpellTraceInno) {
      if (this.hasFever)
        return 0.45;
      else
        return 0.3;
    }
    else {
      return this.useInnoType;
    }
  }

  get cssSuccessRate(): number {
    if (this.useSpellTraceCss) {
      if (this.hasFever)
        return 0.1;
      else
        return 0.05;
    }
    else {
      return this.useCssType;
    }
  }
}
