export class ViewBase {
  /**
   * The unique identifier of the view
   * @type {ViewId}
  */
  viewId

  /**
   * The layer of the view
   * @type {TheaterLayer}
  */
  layer

  /**
   * The view type
   * @type {ViewTypes}
  */
  
  /**
   * @param {ViewId} viewId 
   * @param {ViewLayer} layer 
   * @param {ViewTypes} viewType 
  */
  constructor(viewId, layer, viewType) {
    this.viewId = viewId;
    this.layer = layer;
    this.type = viewType;
  }

  /**
   * function to be overriden, runned when the view is shown
  */
  init() {
    // 
  }

  /**
   * function to be overriden, runned when the view is hidden
  */
  reset() {
    // 
  }
}