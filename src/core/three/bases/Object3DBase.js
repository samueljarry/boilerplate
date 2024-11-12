import { Object3D } from "three";

export class Object3DBase extends Object3D {
  isExtendedObject3D = true;

  constructor() {
    super();
  }

  init() {
    for (const child of this.children) {
      if (child.isExtendedObject3D) {
        child.init();
      }
    }
  }

  reset() {
    for (const child of this.children) {
      if (child.isExtendedObject3D) {
        child.reset();
      }
    }
  }

  update = (dt) => {
    for (const child of this.children) {
      if (child.isExtendedObject3D) {
        child.update(dt);
      }
    }
  };
}
