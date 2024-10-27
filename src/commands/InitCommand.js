import { ViewId } from "@constants/ViewId";
import { InitCommandBase } from "@core/common/bases/commands/InitCommandBase";
import { ViewLayer } from "@core/common/constants/views/ViewLayer";
import { ViewsManager } from "@core/common/managers/ViewsManager";
import { TheatersManager } from "@core/common/managers/TheatersManager";
import { MainTheater } from "@theaters/MainTheater";
import { MainThreeView } from "../core/three/views/MainThreeView";
import { TestThreeView } from "../views/TestThreeView";
import { CamerasManager } from "../core/three/managers/CamerasManager";
import { DebugCameraController } from "../controllers/DebugCameraController";
import { DummyCameraController } from "../controllers/DummyCameraController";
import { ThreeAssetsManager } from "../core/three/managers/ThreeAssetsManager";

export class InitCommand extends InitCommandBase {
  async init() {
    await super.init();
  }
  
  async initProxies() {
  }

  async initManagers() {
    CamerasManager.Init()
  }

  async initThree() {
    ViewsManager.AddThreeView(ViewId.THREE_TEST, TestThreeView);

    CamerasManager.AddCamera(new DebugCameraController());
    CamerasManager.AddCamera(new DummyCameraController());
  }

  async initViews() {
    ViewsManager.AddReactView(ViewId.MAIN_THREE, ViewLayer.MAIN_THREE, MainThreeView);
  }

  async initTheaters() {
    TheatersManager.AddTheater(new MainTheater());
  }

  async initAfterLoad() {
    await ThreeAssetsManager.Load()
  }
}