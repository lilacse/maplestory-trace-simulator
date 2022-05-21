import { Component, OnInit } from '@angular/core';
import CssType from '../trace-simulator/enums/probabilities/CssType';
import InnoType from '../trace-simulator/enums/probabilities/InnoType';
import TraceType from '../trace-simulator/enums/probabilities/TraceType';
import DiligenceBonus from '../trace-simulator/enums/trace-bonuses/DiligenceBonus';
import GuildEnhancementMasteryBonus from '../trace-simulator/enums/trace-bonuses/GuildEnhancementMasteryBonus';
import GuildUpgradeSalvationLevel from '../trace-simulator/enums/trace-bonuses/GuildUpgradeSalvationLevel';
import SimulationOptions from '../trace-simulator/modules/simulator/SimulationOptions';
import { TraceSimulatorService } from '../trace-simulator/trace-simulator.service';
import { SelectInputDataProviderService } from './select-input-data-provider/select-input-data-provider.service';
import SelectInputDataInterface from './select-input-data-provider/SelectInputDataInterface';

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

  public cssTypeSelectInputData: SelectInputDataInterface[];
  public innoTypeSelectInputData: SelectInputDataInterface[];
  public traceTypeSelectInputData: SelectInputDataInterface[];
  public diligenceLevelSelectInputData: SelectInputDataInterface[];
  public guildEnhancementMasteryBonusSelectInputData: SelectInputDataInterface[];
  public guildUpgradeSalvationBonusSelectInputData: SelectInputDataInterface[];

  public selectedCssType: string;
  public selectedInnoType: string;
  public selectedTraceType: string;
  public selectedDiligenceLevel: string;
  public selectedGuildEnhancementMasteryBonus: string;
  public selectedGuildUpgradeSalvationBonus: string;

  constructor(private _traceSimulatorService: TraceSimulatorService, private _selectInputDataProviderService: SelectInputDataProviderService) { 
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

    this.cssTypeSelectInputData = _selectInputDataProviderService.getSelectInputData('CssType');
    this.innoTypeSelectInputData = _selectInputDataProviderService.getSelectInputData('InnoType');
    this.traceTypeSelectInputData = _selectInputDataProviderService.getSelectInputData('TraceType');
    this.diligenceLevelSelectInputData = _selectInputDataProviderService.getSelectInputData('DiligenceBonus');
    this.guildEnhancementMasteryBonusSelectInputData = _selectInputDataProviderService.getSelectInputData('GuildEnhancementMasteryBonus');
    this.guildUpgradeSalvationBonusSelectInputData = _selectInputDataProviderService.getSelectInputData('GuildUpgradeSalvationLevel');

    this.selectedCssType = this.cssTypeSelectInputData.find(css => css.value === this._defaultCssType)?.selectValue || "";
    this.selectedInnoType = this.innoTypeSelectInputData.find(inno => inno.value === this._defaultInnoType)?.selectValue || "";
    this.selectedTraceType = this.traceTypeSelectInputData.find(trace => trace.value === this._defaultTraceType)?.selectValue || "";
    this.selectedDiligenceLevel = this.diligenceLevelSelectInputData.find(bonus => bonus.value === this._defaultDiligenceLevel)?.selectValue || "";
    this.selectedGuildEnhancementMasteryBonus = this.guildEnhancementMasteryBonusSelectInputData.find(bonus => bonus.value === this._defaultGuildEnhancementMasteryBonus)?.selectValue || "";
    this.selectedGuildUpgradeSalvationBonus = this.guildUpgradeSalvationBonusSelectInputData.find(bonus => bonus.value === this._defaultGuildUpgradeSalvationLevel)?.selectValue || "";
  }

  ngOnInit(): void {
  }

}
