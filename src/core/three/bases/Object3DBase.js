import { Object3D } from "three";
import { Ticker } from "../../common/utils/Ticker";

export class Object3DBase extends Object3D {
  isExtendedObject3D = true;
  
  constructor() {
    super();
  }

  init() {
    if(typeof this.update === 'function') {
      Ticker.Add(this.update)
    }
  }

  reset() {
    if(typeof this.update === 'function') {
      Ticker.Remove(this.update)
    }
  }
}