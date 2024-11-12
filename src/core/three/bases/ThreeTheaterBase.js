import { CamerasManager } from "../managers/CamerasManager";
import { MainThree } from "../MainThree";
import { TheaterBase } from "@core/common/bases/theaters/TheaterBase";

export class ThreeTheaterBase extends TheaterBase {
  constructor(theaterId, theaterLayer, cameraId) {
    super(theaterId, theaterLayer);

    this.cameraId = cameraId;

    if (!MainThree.IsInit) {
      MainThree.Init();
    }
  }

  init() {
    super.init();

    CamerasManager.SetActiveCamera(this.cameraId);
  }

  reset() {
    super.reset();
  }
}
