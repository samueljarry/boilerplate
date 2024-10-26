import { ViewId } from "@constants/ViewId";
import { InitCommandBase } from "@core/bases/commands/InitCommandBase";
import { ViewLayer } from "@core/constants/views/ViewLayer";
import { ViewsManager } from "@core/managers/ViewsManager";
import { HelloWorldView } from "@views/HelloWorldView";
import { ReactViewBase } from '@core/bases/views/react/ReactViewBase';
import { TheatersManager } from "@core/managers/TheatersManager";
import { MainTheater } from "@theaters/MainTheater";

export class InitCommand extends InitCommandBase {
  async init() {
    await super.init();
  }
  
  async initProxies() {
  }

  async initManagers() {
  }

  async initThree() {
  }

  async initViews() {
    ViewsManager.AddView(new ReactViewBase(ViewId.HELLO_WORLD, ViewLayer.MAIN, HelloWorldView));

  }

  async initTheaters() {
    TheatersManager.AddTheater(new MainTheater());
  }

  async initAfterLoad() {
  }
}