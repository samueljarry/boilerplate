import { Mesh, Raycaster, Scene, Vector2 } from "three";
import { MainThree } from "../MainThree";
import { DomEvents } from "../../common/constants/DomEvents";
import { InteractionName } from "../constants/InteractionName";
import { Ticker } from "../../common/utils/Ticker";
import { CursorConstants } from "../../common/constants/CursorConstants";
import { DeviceUtils } from "../../common/utils/DeviceUtils";

export class ThreeInteractiveManager {
  /** * @type {Map<Object3D, ThreeInteractive>} */
  static _InteractivesMap = new Map();
  
  /** * @type {Set<ThreeInteractive>} */
  static _InteractivesSet = new Set();

  /** * @type {Array<ThreeInteractive>} */
  static _InteractivesActiveArray = new Array();

  static _Raycaster = new Raycaster();
  static _PointerPosition = new Vector2(Infinity, Infinity);
  static _DomElement;
  static _Camera;

  /** * @type {Map<ThreeInteractive, Intersection>} */
  static _UnderMouseObjects = new Map();
  
  /** * @type {Map<ThreeInteractive, Intersection>} */
  static _LastUpdateUnderMouseObjects = new Map();

  static _IsEnabled = true;
  static _TimeBetweenUpdate = 100;
  static _LasTimeUpdate = 0;
  static _isMouseDown = false;

  static Start(dom) {
    DeviceUtils.Init();
    this._DomElement = dom;
    this._Resize();
    this._AddCallbacks();
  }

  static Stop() {
    this._RemoveCallbacks();
  }

  /**
   * @param {ThreeInteractive} interactive
   * @returns {any}
   */
  static AddInteractive(interactive) {
    for (const object of interactive.targets) {
        this._InteractivesMap.set(object, interactive);
    }
    this._InteractivesSet.add(interactive);
  }

  /** * @param {Camera} camera */
  static SetCamera(camera) {
    this._Camera = camera;
  }

  /**
   * @param {ThreeInteractive} interactive
   * @returns {any}
   */
  static RemoveInteractive(interactive) {
    for (const object of interactive.targets) {
        this._InteractivesMap.delete(object);
    }
    this._InteractivesSet.delete(interactive);
  }

  static _OnMouseDown = (e) => {
    this._isMouseDown = true;
    this._UpdatePointerPosition(e);
    this._Raycast(InteractionName.MOUSE_DOWN);
    window.addEventListener(DomEvents.MOUSEUP, this._OnMouseUp);
    window.addEventListener(DomEvents.MOUSELEAVE, this._OnMouseUp);
  }

  static _OnMouseUp = (e) => {
    this._isMouseDown = false;
    this._UpdatePointerPosition(e);
    this._Raycast(InteractionName.MOUSE_UP);
    window.removeEventListener(DomEvents.MOUSEUP, this._OnMouseUp);
    window.removeEventListener(DomEvents.MOUSELEAVE, this._OnMouseUp);
  }

  static _OnMouseMove = (e) => {
    this._UpdatePointerPosition(e);
    this._Raycast(InteractionName.MOUSE_MOVE);
  }

  static _Update = () => {
    const delta = Ticker.CurrentTime - this._LasTimeUpdate;
    if (delta < ThreeInteractiveManager._TimeBetweenUpdate) return;
    ThreeInteractiveManager._LasTimeUpdate = Ticker.CurrentTime;
    this._RefreshUnderMouseObjects();
  }

  static _RefreshUnderMouseObjects() {
    this._Raycast();
    for (const [key, value] of this._LastUpdateUnderMouseObjects) {
        if (!this._UnderMouseObjects.has(key)) {
            key.sendInteraction(InteractionName.MOUSE_LEAVE, value);
            this._LastUpdateUnderMouseObjects.delete(key);
        }
    }

    let hasCursor = false;
    for (const [key, value] of this._UnderMouseObjects) {
        key.sendInteraction(InteractionName.MOUSE_ENTER, value);
        if (!hasCursor && !key.passThrough) {
            hasCursor = true;
            this._DomElement.style.cursor = key.cursor;
        }
    }
    if (!hasCursor) {
        this._DomElement.style.cursor = CursorConstants.AUTO;
    }
    this._LastUpdateUnderMouseObjects.clear();
    for (const [key, value] of this._UnderMouseObjects) {
        this._LastUpdateUnderMouseObjects.set(key, value);
    }
    this._UnderMouseObjects.clear();
  }

  static _Raycast(interactionName = undefined) {
    if (!this._Camera) return;
    if (!this._IsEnabled) return;
    if(this._InteractivesSet.size === 0) return;
    
    this._InteractivesActiveArray.length = 0;
    for (let o of this._InteractivesSet) {
      if (!o.isActivate) continue;

      for (const mesh of o.targets) {
        if (!(this._IsInScene(mesh) || o.interactWhenNotInScene)) continue;
        if (!(mesh.visible || o.interactWhenNotVisible)) continue;

        if (!DeviceUtils.IsMobile || this._isMouseDown) {
          this._InteractivesActiveArray.push(mesh);
        }
      }
    }

    this._Raycaster.setFromCamera(this._PointerPosition, this._Camera);
    const intersects = this._Raycaster.intersectObjects(this._InteractivesActiveArray);
    
    for (let intersect of intersects) {
      if (intersect.object instanceof Mesh && this._InteractivesMap.has(intersect.object)) {
        const interactive = this._InteractivesMap.get(intersect.object);
        if (interactive.isActivate) {
          if (interactionName === InteractionName.MOUSE_MOVE && !interactive.isMouseEnter) {
            interactive.sendInteraction(InteractionName.MOUSE_ENTER, intersect);
          }
          if (interactionName) {
            interactive.sendInteraction(interactionName, intersect);
          }
          this._UnderMouseObjects.set(interactive, intersect);
          if (!interactive.passThrough) {
            return;
          }
        }
      }
    }
  }

  static _IsInScene(target) {
      let parent = target;
      while (parent.parent) {
          parent = parent.parent;
      }
      return (parent instanceof Scene);
  }

  static _UpdatePointerPosition(e) {
    if (e instanceof TouchEvent && e.touches.length == 0) return;
    const { x, y } = GetMousePosition(e);
    const rx = (x / this._DomElementRect.width) * 2 - 1;
    const ry = -((y / this._DomElementRect.height) * 2 - 1);
    this._PointerPosition.set(rx, ry);
  }

  static _AddCallbacks() {
    this._RemoveCallbacks();
    if (DeviceUtils.IsMobile) {
        this._DomElement.addEventListener(DomEvents.TOUCHSTART, this._OnMouseDown, { passive: true });
        this._DomElement.addEventListener(DomEvents.TOUCHMOVE, this._OnMouseMove, { passive: true });
        this._DomElement.addEventListener(DomEvents.TOUCHEND, this._OnMouseUp, { passive: true });
    } else {
        this._DomElement.addEventListener(DomEvents.MOUSEDOWN, this._OnMouseDown);
        this._DomElement.addEventListener(DomEvents.MOUSEUP, this._OnMouseUp);
        this._DomElement.addEventListener(DomEvents.MOUSEMOVE, this._OnMouseMove);
    }

    Ticker.Add(this._Update);
    MainThree.OnResize.add(this._Resize);
    // window.addEventListener(DomEvent.RESIZE, this._Resize);
  }

  static _RemoveCallbacks() {
    this._DomElement.removeEventListener(DomEvents.MOUSEDOWN, this._OnMouseDown);
    this._DomElement.removeEventListener(DomEvents.MOUSEUP, this._OnMouseUp);
    this._DomElement.removeEventListener(DomEvents.MOUSEMOVE, this._OnMouseMove);

    this._DomElement.removeEventListener(DomEvents.TOUCHSTART, this._OnMouseDown);
    this._DomElement.removeEventListener(DomEvents.TOUCHMOVE, this._OnMouseMove);
    this._DomElement.removeEventListener(DomEvents.TOUCHEND, this._OnMouseUp);

    window.removeEventListener(DomEvents.MOUSEUP, this._OnMouseUp);
    window.removeEventListener(DomEvents.MOUSELEAVE, this._OnMouseUp);

    Ticker.Remove(this._Update);
    MainThree.OnResize.remove(this._Resize);
    // window.removeEventListener(DomEvent.RESIZE, this._Resize);
  }

  static _Resize() {
    this._DomElement = MainThree.DomElementContainer;
    this._DomElementRect = this._DomElement.getBoundingClientRect();
  }
}

export const GetMousePosition = (e) => {
    let x = 0;
    let y = 0;
    if (e instanceof MouseEvent) {
        x = e.clientX;
        y = e.clientY;
    } else if (e instanceof TouchEvent) {
        if (e.touches.length > 0) {
            x = e.touches[0].clientX;
            y = e.touches[0].clientY;
        }
    }
    return { x: x, y: y };
}
