import { Injectable } from "@angular/core";
import { cloneDeep } from "lodash-es";

import { Performance } from "../../performances/performance.type";
import { SortDirection } from "../../performances/performances.service";
import { AppMockApiService } from "../mock-api.service";
import { performances as performancesData } from "./data";

@Injectable({
  providedIn: "root",
})
export class PerformancesMockApiService {
  private _performances: any[] = performancesData;
  private _sortByYear: any = {
    "FR-1": 0,
    "SO-2": 1,
    "JR-3": 2,
    "SR-4": 3,
  };
  private _sortByValue: any = {
    "1:44.41": 0,
    "1:44.84": 1,
    "1:45.05": 2,
    "1:46.40": 3,
    "1:46.45": 4,
    "1:46.58": 5,
    "1:47.28": 6,
    "1:47.48": 7,
  };
  private _sortConfig: Map<SortDirection, (a: Performance, b: Performance) => number> = new Map();

  /**
   * Constructor
   */
  constructor(private _appMockApiService: AppMockApiService) {
    // Register Mock API handlers
    this.registerHandlers();
    this._sortConfig.set("year:frToSr", this.sortByYearFrToSr.bind(this));
    this._sortConfig.set("year:srToFr", this.sortByYearSrToFr.bind(this));
    this._sortConfig.set("time:fastToSlow", this.sortByTimeFastToSlow.bind(this));
    this._sortConfig.set("time:slowToFast", this.sortByTimeSlowToFast.bind(this));
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Register Mock API handlers
   */
  registerHandlers(): void {
    // -----------------------------------------------------------------------------------------------------
    // @ Performances - GET
    // -----------------------------------------------------------------------------------------------------
    this._appMockApiService.onGet("api/performances").reply(() => {
      // Clone the performances
      const performances = cloneDeep(this._performances);

      // Return the response
      return [200, performances];
    });

    // sort helpers
    const sortByYearFrToSr: SortDirection = "year:frToSr";
    const sortByYearSrToFr: SortDirection = "year:srToFr";
    const sortByTimeFastToSlow: SortDirection = "time:fastToSlow";
    const sortByTimeSlowToFast: SortDirection = "time:slowToFast";

    this._appMockApiService.onGet(`api/performances?sortBy=${sortByYearFrToSr}`).reply(() => {
      // Clone the performances
      const performances: Performance[] = cloneDeep(this._performances);

      // Sort the performances by the year field
      performances.sort(this._sortConfig.get(sortByYearFrToSr));

      // Return the response
      return [200, performances];
    });

    this._appMockApiService.onGet(`api/performances?sortBy=${sortByYearSrToFr}`).reply(() => {
      // Clone the performances
      const performances: Performance[] = cloneDeep(this._performances);

      // Sort the performances by the year field
      performances.sort(this._sortConfig.get(sortByYearSrToFr));

      // Return the response
      return [200, performances];
    });

    this._appMockApiService.onGet(`api/performances?sortBy=${sortByTimeFastToSlow}`).reply(() => {
      // Clone the performances
      const performances: Performance[] = cloneDeep(this._performances);

      // Sort the performances by the year field
      performances.sort(this._sortConfig.get(sortByTimeFastToSlow));

      // Return the response
      return [200, performances];
    });

    this._appMockApiService.onGet(`api/performances?sortBy=${sortByTimeSlowToFast}`).reply(() => {
      // Clone the performances
      const performances: Performance[] = cloneDeep(this._performances);

      // Sort the performances by the year field
      performances.sort(this._sortConfig.get(sortByTimeSlowToFast));

      // Return the response
      return [200, performances];
    });

  }

  private sortByYearFrToSr(a: Performance, b: Performance): number {
    return this._sortByYear[a.year] - this._sortByYear[b.year];
  }

  private sortByYearSrToFr(a: Performance, b: Performance): number {
    return this._sortByYear[b.year] - this._sortByYear[a.year];
  }

  private sortByTimeFastToSlow(a: Performance, b: Performance): number {
    return this._sortByValue[a.value] - this._sortByValue[b.value];
  }

  private sortByTimeSlowToFast(a: Performance, b: Performance): number {
    return this._sortByValue[b.value] - this._sortByValue[a.value];
  }
}
