import InnoType from "../../enums/probabilities/InnoType";
import CssType from "../../enums/probabilities/CssType";
import TraceType from "../../enums/probabilities/TraceType";
import GuildUpgradeSalvationLevel from "../../enums/trace-bonuses/GuildUpgradeSalvationLevel";
import GuildEnhancementMasteryBonus from "../../enums/trace-bonuses/GuildEnhancementMasteryBonus";
import DiligenceBonus from "../../enums/trace-bonuses/DiligenceBonus";


export default class SimulationOptions {
  public failsBeforeInno: number = 4;
  public useArkInno: boolean = false;
  public useSpellTraceInno: boolean = false;
  public useSpellTraceCss: boolean = false;
  public cssCost: number = 10000000;
  public innoCost: number = 20000000;
  public traceCost: number = 4150;
  public cssType: CssType = CssType.Css10p;
  public innoType: InnoType = InnoType.Inno50p;
  public traceType: TraceType = TraceType.Trace15p;
  public hasFever: boolean = false;
  public hasDiscount: boolean = false;
  public diligenceLevel: DiligenceBonus = DiligenceBonus.DiligenceLv100;
  public guildEnhancementMasteryBonus: GuildEnhancementMasteryBonus = GuildEnhancementMasteryBonus.EnhanceMasteryLv4;
  public guildUpgradeSalvationLevel: GuildUpgradeSalvationLevel = GuildUpgradeSalvationLevel.UpgradeSalvationLv4;

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
      return this.innoType;
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
      return this.cssType;
    }
  }
}
