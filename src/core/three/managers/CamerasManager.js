import { CamerasId } from "../../../constants/CamerasId";
import { DomEvents } from "../../common/constants/DomEvents";
import { Action } from "../../common/utils/Action";

export class CamerasManager {
  static OnCameraChange = new Action()
  static ActiveCameraId = null;
  static ActiveCamera = null;

  static Init() {
    window.addEventListener(DomEvents.KEYDOWN, this.OnKeyDown)
  }

  /**
   * List of cameras
   * @type {Map<CamerasId, CameraControllerBase>}
   * @returns {any}
   */
  static CamerasMap = new Map();

  /**
   * Add a new camera to camera's list
   * @param {CamerasId} cameraId
   * @param {CameraControllerBase} camera
   * @returns {any}
   */
  static AddCamera(camera) {
    this.CamerasMap.set(camera.cameraId, camera);
  }

  /**
   * CameraController getter
   * @param {CamerasId} cameraId
   * @returns {CameraControllerBase}
  */
  static GetCamera(cameraId) {
    return this.CamerasMap.get(cameraId);
  }

  /**
   * Description
   * @param {HTMLElement} domElement
   * @returns {any}
   */
  static SetDomElementContainer(domElement) {
    for(const camera of this.CamerasMap.values()) {
      camera.setDomElementContainer(domElement);
    }
  }

  static SetActiveCamera(cameraId) {
    if(this.ActiveCamera) {
      this.ActiveCamera.stop();
    }

    this.ActiveCameraId = cameraId;
    this.ActiveCamera = this.GetCamera(this.ActiveCameraId);

    this.ActiveCamera.start();
    this.OnCameraChange.execute(cameraId)
  }

  static OnKeyDown = ({ code, shiftKey }) => {
    if(shiftKey && code === 'KeyC') {
      this._ToggleDebugCamera()
    }
  }

  static _ToggleDebugCamera() {
    // this.PreviousCameraId = this.ActiveCameraId;

    if(this.ActiveCameraId !== CamerasId.DEBUG_CAMERA) {
      this.PreviousCameraId = this.ActiveCameraId;
      this.SetActiveCamera(CamerasId.DEBUG_CAMERA)
    } else {
      this.SetActiveCamera(this.PreviousCameraId)
    }
  }
}