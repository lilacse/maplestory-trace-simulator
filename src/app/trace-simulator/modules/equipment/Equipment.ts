import GuildUpgradeSalvationLevel from "../../enums/trace-bonuses/GuildUpgradeSalvationLevel";


export default class Equipment {
  private _currentFailedSlots: number = 0;
  private _currentRemainingSlots: number = 0;

  public totalSlotCount: number;
  public succededSlotCount: number;
  public failedSlotCount: number;
  public costPerClick: number;

  constructor(totalSlots: number, succeeded: number, failed: number, costPerClick: number) {
    if (failed + succeeded > totalSlots) {
      throw "Number of succeeded and failed slots more than the total number of slots!"
    }
      
    this.totalSlotCount = totalSlots;
    this.succededSlotCount = succeeded;
    this.failedSlotCount = failed;

    this._currentRemainingSlots = totalSlots - succeeded - failed;
    this._currentFailedSlots = failed;
    this.costPerClick = costPerClick;
  }

  get currentFailedSlots(): number {
    return this._currentFailedSlots;
  }

  get currentRemainingSlots(): number {
    return this._currentRemainingSlots;
  }

  resetEquip(): void {
    this._currentRemainingSlots = this.totalSlotCount - this.succededSlotCount - this.failedSlotCount;
    this._currentFailedSlots = this.failedSlotCount;
  }

  getCostPerClick(hasDiscount: boolean = false): number {
    if (hasDiscount) return Math.ceil(this.costPerClick) / 2;
    else return this.costPerClick;
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
    this._currentRemainingSlots = this.totalSlotCount;
  }
}