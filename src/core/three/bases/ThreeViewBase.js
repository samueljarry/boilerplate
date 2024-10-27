import { ViewBase } from "@core/common/bases/views/ViewBase";
import { ViewTypes } from "@core/common/constants/views/ViewTypes";
import { Object3DBase } from "./Object3DBase";
import { Ticker } from "../../common/utils/Ticker";

export class ThreeViewBase extends ViewBase {
  constructor(viewId, viewLayer) {
    super(viewId, viewLayer, ViewTypes.THREE);

    this.object3D = new Object3DBase();
    this.object3D.name = viewId;
  }

  init() {
    super.init();
    this.object3D.init();

    if(typeof this.update === 'function') {
      Ticker.Add(this.update)
    }
  }

  reset() {
    super.reset()
    this.object3D.reset();

    if(typeof this.update === 'function') {
      Ticker.Remove(this.update)
    }
  }

  add(...params) {
    this.object3D.add(...params);
  }

  remove(...params) {
    this.object3D.remove(...params);
  }
}