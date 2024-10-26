import { Action } from "@core/utils/Action";

export class ViewsManager {
  static OnViewsChange = new Action();

  static #DisplayedViewsSet = new Set();
  static #LayerViewsMap = new Map();
  static #ViewsMap = new Map();

  /**
   * Add specified view to views list
   * @param {ViewBase} view
   * @returns {any}
   */
  static async AddView(view) {
    this.#ViewsMap.set(view.viewId, view);
  }

  /**
   * Remove specified view to views list
   * @param {ViewId} viewId
   * @returns {any}
   */
  static async RemoveView(viewId) {
    this.#ViewsMap.delete(viewId);
  }

  /**
   * Show and init specified view
   * @param {ViewId} viewId
   * @returns {any}
   */
  static Show(viewId) {
    const view = this.#ViewsMap.get(viewId);
    const prevView = this.#LayerViewsMap.get(view.layer);

    if(prevView) {
      this.Hide(prevView.viewId);
    }

    view.init();
    this.#LayerViewsMap.set(view.layer, view);
    this.#DisplayedViewsSet.add(view);
    this.OnViewsChange.execute();
  }

  /**
   * Hide specified view
   * @param {ViewId} viewId
   * @returns {any}
   */
  static Hide(viewId) {
    const view = this.GetView(viewId);
    
    view.reset();
    this.#LayerViewsMap.delete(view.layer, view);
    this.#DisplayedViewsSet.delete(this.#ViewsMap.get(viewId));
    this.OnViewsChange.execute();
  }

  /**
   * Get specified view
   * @param {ViewId} viewId
   * @returns {ViewBase}
   */
  static GetView(viewId) {
    return this.#ViewsMap.get(viewId);
  }

  static GetDisplayedViews() {
    return this.#DisplayedViewsSet.values()
  }
}