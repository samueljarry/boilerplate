import { PerspectiveCamera } from "three";
import { CameraControllerBase } from "./CameraControllerBase";

export class PerspectiveCameraControllerBase extends CameraControllerBase {
  constructor(cameraId) {
    super(cameraId);
    
    this.camera = new PerspectiveCamera(75, this.getAspect(), 0.1, 10000)
    this.cameraContainer.add(this.camera);
  }

  getAspect() {
    return this._domElementContainer 
      ? this._domElementContainer.offsetWidth / this._domElementContainer.offsetHeight
      : window.innerWidth / window.innerHeight
  }

  onResize = () => {
    this.camera.aspect = this.getAspect();
    this.camera.updateProjectionMatrix();
  }
}