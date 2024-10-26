import { TheaterBase } from '@core/bases/theaters/TheaterBase';
import { TheatersId } from '../constants/TheatersId';
import { TheaterLayer } from '../core/constants/theaters/TheaterLayer';
import { ViewId } from '../constants/ViewId';

export class DummyTheater extends TheaterBase {
  constructor() {
    super(TheatersId.DUMMY, TheaterLayer.MAIN);

    this.viewsList.add(ViewId.TEST_VIEW)
  }
}
