import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class GlbLoader {
  static Loader = new GLTFLoader();

  static async Load(path) {
    const promise = await new Promise((resolve) => {
      this.Loader.load(path, (model) => resolve(model))
    })

    return promise;
  }
}