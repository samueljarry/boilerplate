import { Scene, WebGLRenderer } from "three";

import { Action } from "../common/utils/Action";
import { CamerasId } from "../../constants/CamerasId";
import { CamerasManager } from "./managers/CamerasManager";
import { DomEvents } from "@core/common/constants/DomEvents";
import { ThreeInteractiveManager } from "./managers/ThreeInteractiveManager";
import { Ticker } from "@core/common/utils/Ticker";
import { ViewId } from "@constants/ViewId";
import { ViewTypes } from "../common/constants/views/ViewTypes";
import { ViewsManager } from "@core/common/managers/ViewsManager";

export class MainThree {
  static _Scene = new Scene();
  static IsInit = false;
  static OnResize = new Action();
  static OnDomElementContainerSet = new Action();

  static Init() {
    this._SetRenderer();
    this._SetListeners();

    // ViewsManager.Show(ViewId.MAIN_THREE);
    ViewsManager.OnViewsChange.add(this._OnViewsChange);

    CamerasManager.OnCameraChange.add(this._ChangeCamera);
    this.IsInit = true;
  }

  static Start() {
    this.IsStarted = true;
    if (this.DomElementContainer)
      ThreeInteractiveManager.Start(this.DomElementContainer);
    Ticker.Add(this._Update);
  }

  static Stop() {
    this.IsStarted = false;
    ThreeInteractiveManager.Stop();
    Ticker.Remove(this._Update);
  }

  static _SetListeners() {
    window.addEventListener(DomEvents.RESIZE, this._OnResize);
  }

  static _RemoveListeners() {
    window.removeEventListener(DomEvents.RESIZE, this._OnResize);
  }

  static _SetCamera(cameraId) {
    this._CurrentCameraController = CamerasManager.GetCamera(cameraId);
    this._CurrentCameraController.start();

    this._OnResize();
  }

  static _SetRenderer() {
    this._Renderer = new WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    this._Renderer.setSize(window.innerWidth, window.innerHeight);
    this._Renderer.pixelRatio = window.devicePixelRatio;
  }

  static _OnViewsChange = () => {
    // Remove old views
    for (const child of this._Scene.children) {
      if (
        child.isExtendedObject3D &&
        !ViewsManager.GetDisplayedViews().has(child.name)
      ) {
        this._Scene.remove(child);
      }
    }

    // Add new views
    for (const view of ViewsManager.GetDisplayedViews()) {
      if (view.type === ViewTypes.THREE) {
        this._Scene.add(view.object3D);
      }
    }
  };

  static SetDomElementContainer(domElementContainer) {
    this.DomElementContainer = domElementContainer;
    this.DomElementContainer.appendChild(this._Renderer.domElement);

    CamerasManager.SetDomElementContainer(this.DomElementContainer);
    this.OnDomElementContainerSet.execute();
  }

  static _ChangeCamera = () => {
    this._PreviousCameraController = this._CurrentCameraController;
    this._CurrentCameraController = CamerasManager.GetCamera(
      CamerasManager.ActiveCameraId
    );

    ThreeInteractiveManager.SetCamera(this._CurrentCameraController.camera);

    if (this._PreviousCameraController) {
      this._Scene.remove(this._PreviousCameraController);
    }

    this._Scene.add(this._CurrentCameraController);
    this._OnResize();
  };

  static _OnResize = () => {
    this._Renderer.setSize(window.innerWidth, window.innerHeight);
    this.OnResize.execute();
  };

  static GetCamera() {
    return this._CurrentCameraController;
  }

  static _Update = () => {
    if (!this._CurrentCameraController?.cameraId) return;
    if (
      this._CurrentCameraController.cameraId === CamerasId.DEBUG_CAMERA &&
      this._CurrentCameraController.orbit?.enabled
    ) {
      this._CurrentCameraController.orbit.update();
    }
    this._Renderer.render(this._Scene, this._CurrentCameraController.camera);
  };

  static get Renderer() {
    return this._Renderer;
  }
}
