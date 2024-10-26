import { ViewBase } from "@core/bases/views/ViewBase";
import { ViewTypes } from "@core/constants/views/ViewTypes";

export class ReactViewBase extends ViewBase {
  #props = {};

  constructor(viewId, viewLayer, viewComponent) {
    super(viewId, viewLayer, ViewTypes.REACT);

    this.component = viewComponent;
    
    this.#props = {
      viewId
    }
  }

  setHtmlElement(htmlElement) {
    this.htmlElement = htmlElement
    
    if(this.layer > -1) {
      this.htmlElement.style.zIndex = this.layer;
    }
  }
}