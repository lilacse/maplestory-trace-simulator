import { GuildUpgradeSalvationLevel } from "../enums/trace-bonuses";

export class Equipment {
  private _currentFailedSlots: number = 0;
  private _currentRemainingSlots: number = 0;

  private readonly _totalSlotCount: number;
  private readonly _succededSlotCount: number;
  private readonly _failedSlotCount: number;
  private readonly _costPerClick: number;

  constructor(totalSlots: number, succeeded: number, failed: number, costPerClick: number) {
    if (failed + succeeded > totalSlots) {
      throw "Number of succeeded and failed slots more than the total number of slots!"
    }
      
    this._totalSlotCount = totalSlots;
    this._succededSlotCount = succeeded;
    this._failedSlotCount = failed;

    this._currentRemainingSlots = totalSlots - succeeded - failed;
    this._currentFailedSlots = failed;
    this._costPerClick = costPerClick;
  }

  get currentFailedSlots(): number {
    return this._currentFailedSlots;
  }

  get currentRemainingSlots(): number {
    return this._currentRemainingSlots;
  }

  resetEquip(): void {
    this._currentRemainingSlots = this._totalSlotCount - this._succededSlotCount - this._failedSlotCount;
    this._currentFailedSlots = this._failedSlotCount;
  }

  getCostPerClick(hasDiscount: boolean = false): number {
    if (hasDiscount) return Math.ceil(this._costPerClick) / 2;
    else return this._costPerClick;
  }

  traceSuccess(): void {
    this._currentRemainingSlots--;
  }

  traceFail(salvationLevel: GuildUpgradeSalvationLevel = GuildUpgradeSalvationLevel.UpgradeSalvationLv0): boolean {
    let rng = Math.random();

    if (rng >= salvationLevel) {
      this._currentFailedSlots++;
      this._currentRemainingSlots--;
      return true;
    }
    else return false;
  }

  cssSuccess(): void {
    this._currentFailedSlots--;
    this._currentRemainingSlots++;
  }

  innoSuccess(): void {
    this._currentFailedSlots = 0;
    this._currentRemainingSlots = this._totalSlotCount;
  }
}