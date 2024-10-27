export class TheaterBase {
  /**
   * Set of views, those added in this set are present on Theater activation.
   * @type {Set<ViewId>}
   * @returns {any}
   */
  viewsList = new Set();

  /**
   * Set of views, those added in this set aren't present on Theater activation.
   * @type {Set<ViewId>}
   * @returns {any}
  */
  siblingViewsList = new Set();

  /**
   * The unique identifier of the theater
   * @type {TheaterId}
   */
  id;

  /**
   * The layer of the theater
   * @type {TheaterLayer}
  */
  layer;
  
  /**
   * TheaterBase
   * @param {TheaterId} theaterId
   * @param {TheaterLayer} theaterLayer
   * @returns {any}
  */
  constructor(theaterId, theaterLayer) {
    this.id = theaterId;
    this.layer = theaterLayer;
  }

  /**
    function to be overriden, runned when the Theater is shown
  */
  init() {
    // 
  }

  /**
    function to be overriden, runned when the Theater is hidden
  */
  reset() {
    // 
  }
}