import { TheatersId } from "@constants/TheatersId";
import { ViewId } from "@constants/ViewId";
import { TheaterBase } from "@core/bases/theaters/TheaterBase";
import { TheaterLayer } from "@core/constants/theaters/TheaterLayer";

export class MainTheater extends TheaterBase {
  constructor() {
    super(TheatersId.MAIN, TheaterLayer.MAIN);

    this.viewsList.add(ViewId.HELLO_WORLD);
  }
}