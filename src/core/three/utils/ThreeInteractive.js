import { Mesh } from "three";
import { ThreeInteractiveManager } from "../managers/ThreeInteractiveManager";
import { InteractionName } from "../constants/InteractionName";
import { Action } from "@core/common/utils/Action";

export class ThreeInteractive {
  /** * @type {Set<Object3D>} */
  _targets = new Set();

  onInteraction = new Action();
  interactWhenNotVisible = false;
  interactWhenNotInScene = false;
  passThrough = false;
  
  /** * @param {Object3D} target */
  constructor(target) {
    this.activate();
    if (target) {
        this.setTarget(target);
    }
  }

  /**
   * @param {Object3D} target
   * @returns {any}
  */
  setTarget(target) {
    ThreeInteractiveManager.RemoveInteractive(this);
    this._targets.length = 0;
    this.addTarget(target);
  }

  /**
   * @param {Object3D} target
   * @returns {any}
  */
  addTarget(target) {
    target.traverse((child) => {
      if (child instanceof Mesh) {
        this._targets.add(child);
      }
    });
    ThreeInteractiveManager.AddInteractive(this);
  }

  activate() {
    this._isActivate = true;
  }

  desactivate() {
    this._isActivate = false;
  }

  /**
   * @param {InteractionName} name
   * @param {Intersetion} intersect
   * @returns {any}
   */
  sendInteraction = (name, intersect) => {
    let isClick = false;
    if (name == InteractionName.MOUSE_ENTER) {
      if (this._isMouseEnter) return;
      this._isMouseEnter = true;
    }
    if (name == InteractionName.MOUSE_LEAVE) {
      if (!this._isMouseEnter) return;
      this._isMouseEnter = false;
    }

    if (name == InteractionName.MOUSE_DOWN) this._isMouseDown = true;
    if (name == InteractionName.MOUSE_UP) {
      if (this._isMouseDown) isClick = true;
      this._isMouseDown = false;
    }
    this._sendInteraction(name, intersect);
    if (isClick) this._sendInteraction(InteractionName.CLICK, intersect);
  }

  /**
   * @param {InteractionName} name
   * @param {Intersection} intersect
   * @returns {any}
   */
  _sendInteraction(name, intersect) {
    if (this.onInteraction) {
      this.onInteraction.execute(name, intersect);
    }
  }

  //#region getter/setter
  get targets() { return this._targets; }
  get isActivate() { return this._isActivate; }
  get isMouseEnter() { return this._isMouseEnter; }
  //#endregion
}