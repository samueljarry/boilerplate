import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

export class HdrLoader {
  static Loader = new RGBELoader();

  static async Load(path) {
    const promise = await new Promise((resolve) => {
      this.Loader.load(path, (rgbe) => resolve(rgbe))
    })

    return promise;
  }
}