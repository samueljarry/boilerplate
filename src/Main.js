import { InitCommand } from "./commands/InitCommand";
import { TheatersId } from "./constants/TheatersId";
import { TheatersManager } from "./core/managers/TheatersManager";
import { Action } from "./core/utils/Action";

export class Main {
  static IsInit = false;
  static OnInit = new Action();

  static async Init() {
    const inits = [
      new InitCommand(),
    ]

    const promises = inits.map(async (initCommand) => {
      await initCommand.init();
    });

    await Promise.all(promises);
    
    this.IsInit = true;
    this.OnInit.execute();
  }

  static Start() {
    TheatersManager.Show(TheatersId.MAIN)
  }
}