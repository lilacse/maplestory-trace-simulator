import { Injectable } from '@angular/core';
import SelectInputDataInterface from './SelectInputDataInterface';
import SelectInputTypes from './SelectInputTypes';
import SelectInputData from './SelectInputData';

@Injectable({
  providedIn: 'root'
})
export class SelectInputDataProviderService {
  private _data: Record<SelectInputTypes, SelectInputDataInterface[]>;

  constructor() { 
    this._data = SelectInputData;
  }

  public getSelectInputData(selectInputType: SelectInputTypes): SelectInputDataInterface[] {
    return this._data[selectInputType];
  }
}
