import { Object3D } from "three";
import { DomEvents } from "../../../common/constants/DomEvents";
import { MainThree } from "../../MainThree";

export class CameraControllerBase extends Object3D {
  isOrbitCamera = false;

  /**
   * Creates new CameraControllerBase
   * @param {CamerasId} cameraId
   * @returns {any}
   */
  constructor(cameraId) {
    super()
    this.cameraId = cameraId;
    
    this.camera = null;
    this.cameraContainer = new Object3D();
    this.add(this.cameraContainer);
  }

  start() {
    this.started = true;

    window.addEventListener(DomEvents.RESIZE, this.onResize)
    this.onResize();
  }

  stop() {
    this.started = false;

    window.removeEventListener(DomEvents.RESIZE, this.onResize)
  }

  setDomElementContainer(domElementContainer) {
    this._domElementContainer = domElementContainer
  }

  onResize = () => {}
}