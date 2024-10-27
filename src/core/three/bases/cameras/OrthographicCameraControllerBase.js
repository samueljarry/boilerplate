import { OrthographicCamera } from "three";
import { CameraControllerBase } from "./CameraControllerBase";
import { MainThree } from "../../MainThree";

export class OrthographicCameraControllerBase extends CameraControllerBase {
  constructor(cameraId) {
    super(cameraId);

    this.camera = new OrthographicCamera(-1, 1, 1, -1);
    this.updateCameraAspect();

    this.cameraContainer.add(this.camera);
  }

  updateCameraAspect() {
    const aspect = MainThree.DomElementContainer.offsetWidth / MainThree.DomElementContainer.offsetHeight;

    this.camera.left = -this.aspectRatio;
    this.camera.right = this.aspectRatio;
    this.camera.top = this.aspectRatio / aspect;
    this.camera.bottom = -this.aspectRatio / aspect;

    this.camera.updateProjectionMatrix();
  }

  onResize = () => {
    this.updateCameraAspect();
  }
}