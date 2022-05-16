import { Component, OnInit } from '@angular/core';
import CssType from '../trace-simulator/enums/probabilities/CssType';
import InnoType from '../trace-simulator/enums/probabilities/InnoType';
import TraceType from '../trace-simulator/enums/probabilities/TraceType';
import DiligenceBonus from '../trace-simulator/enums/trace-bonuses/DiligenceBonus';
import GuildEnhancementMasteryBonus from '../trace-simulator/enums/trace-bonuses/GuildEnhancementMasteryBonus';
import GuildUpgradeSalvationLevel from '../trace-simulator/enums/trace-bonuses/GuildUpgradeSalvationLevel';
import SimulationOptions from '../trace-simulator/modules/simulator/SimulationOptions';
import { TraceSimulatorService } from '../trace-simulator/trace-simulator.service';

@Component({
  selector: 'app-simulation-options',
  templateUrl: './simulation-options.component.html',
  styleUrls: ['./simulation-options.component.css']
})
export class SimulationOptionsComponent implements OnInit {

  private readonly _defaultFailsBeforeInno: number;
  private readonly _defaultUseArkInno: boolean;
  private readonly _defaultUseSpellTraceInno: boolean;
  private readonly _defaultUseSpellTraceCss: boolean;
  private readonly _defaultCssCost: number;
  private readonly _defaultInnoCost: number;
  private readonly _defaultTraceCost: number;
  private readonly _defaultCssType: CssType;
  private readonly _defaultInnoType: InnoType;
  private readonly _defaultTraceType: TraceType;
  private readonly _defaultHasFever: boolean;
  private readonly _defaultHasDiscount: boolean;
  private readonly _defaultDiligenceLevel: DiligenceBonus;
  private readonly _defaultGuildEnhancementMasteryBonus: GuildEnhancementMasteryBonus;
  private readonly _defaultGuildUpgradeSalvationLevel: GuildUpgradeSalvationLevel;

  public simOptions: SimulationOptions;

  constructor(private _traceSimulatorService: TraceSimulatorService) { 
    this.simOptions = _traceSimulatorService.simulationOptions;

    this._defaultFailsBeforeInno = this.simOptions.failsBeforeInno;
    this._defaultUseArkInno = this.simOptions.useArkInno;
    this._defaultUseSpellTraceInno = this.simOptions.useSpellTraceInno;
    this._defaultUseSpellTraceCss = this.simOptions.useSpellTraceCss;
    this._defaultCssCost = this.simOptions.cssCost;
    this._defaultInnoCost = this.simOptions.innoCost;
    this._defaultTraceCost = this.simOptions.traceCost;
    this._defaultCssType = this.simOptions.cssType;
    this._defaultInnoType = this.simOptions.innoType;
    this._defaultTraceType = this.simOptions.traceType;
    this._defaultHasFever = this.simOptions.hasFever;
    this._defaultHasDiscount = this.simOptions.hasDiscount;
    this._defaultDiligenceLevel = this.simOptions.diligenceLevel;
    this._defaultGuildEnhancementMasteryBonus = this.simOptions.guildEnhancementMasteryBonus;
    this._defaultGuildUpgradeSalvationLevel = this.simOptions.guildUpgradeSalvationLevel;
  }

  ngOnInit(): void {
  }

}
