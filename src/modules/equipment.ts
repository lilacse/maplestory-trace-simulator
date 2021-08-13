import { GuildUpgradeSalvationLevel } from "../enums/trace-bonuses";

export class Equipment {
  private _currentFailedSlots: number = 0;
  private _currentRemainingSlots: number = 0;

  private readonly _slots: number;
  private readonly _failed: number;
  private readonly _costPerClick: number;

  constructor(slots: number, failed: number, costPerClick: number) {
    if (failed > slots) {
      throw "Number of failed slots more than the total number of slots!"
    }
      
    this._slots = slots;
    this._failed = failed;
    this._currentRemainingSlots = slots;
    this._costPerClick = costPerClick;
  }

  get failedSlots(): number {
    return this._currentFailedSlots;
  }

  get remainingSlots(): number {
    return this._currentRemainingSlots;
  }

  resetEquip(): void {
    this._currentRemainingSlots = this._slots;
    this._currentFailedSlots = this._failed;
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
    this._currentRemainingSlots = this._slots;
  }
}