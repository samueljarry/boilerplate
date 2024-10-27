import { ViewsManager } from "@core/common/managers/ViewsManager";

export class TheatersManager {
  /**
   * List of theaters
   * @type {Map<TheaterId, TheaterBase>}
   */
  static TheatersMap = new Map();
  
  /**
   * List of theaters based on their layer
   * @type {Map<TheaterLayer, TheaterBase>}
  */
  static TheatersLayerMap = new Map();

  /**
   * List of theaters that are currently displayed
   * @type {Set<TheaterId>}
   */
  static DisplayedTheatersSet = new Set();

  static Init() {
    this.TheatersMap.clear();
    this.TheatersLayerMap.clear();
    this.DisplayedTheatersSet.clear();
  }


  /**
   * Add theater to theater's list
   * @param {TheaterId} theaterId
   * @param {TheaterBase} theater
   * @returns {any}
  */
  static AddTheater(theater) {
    this.TheatersMap.set(theater.id, theater)
  }

  /**
   * Remove theater from theater's list
   * @param {TheaterId} theaterId
   * @returns {any}
   */
  static RemoveTheater(theaterId) {
    this.TheatersMap.delete(theaterId)
  }

  static GetTheater(theater) {
    return this.TheatersMap(theater)
  }

  /**
   * Show specified theater and his views
   * @param {TheaterId} theaterId
   * @returns {any}
  */
  static Show(theaterId) {
    const theater = this.TheatersMap.get(theaterId);
    if(!theater) {
      throw new Error(`Theater with id "${theaterId}" not declared in TheatersMap`)
    }

    const prevTheater = this.TheatersLayerMap.get(theater.layer);


    if(prevTheater) {
      this.Hide(prevTheater.id);
    }

    theater.init();
    for(const viewId of theater.viewsList.values()) {
      ViewsManager.Show(viewId);
    }

    this.DisplayedTheatersSet.add(theaterId);
    this.TheatersLayerMap.set(theater.layer, theater)
  }

  /**
   * Hide specified theater and his views
   * @param {TheaterId} theaterId
   * @returns {any}
  */
  static Hide(theaterId) {
    const theater = this.TheatersMap.get(theaterId);

    theater.reset();

    for(const viewId of theater.viewsList) {
      ViewsManager.Hide(viewId);
    }

    for(const viewId of theater.siblingViewsList) {
      ViewsManager.Hide(viewId);
    }

    this.DisplayedTheatersSet.delete(theaterId);
  }
}