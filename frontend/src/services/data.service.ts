import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}
  public todoData: [] | undefined;
  public statusData: [] | undefined;
  public todo: object | undefined;
}
