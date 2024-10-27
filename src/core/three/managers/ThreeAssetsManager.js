import { AssetsTypes } from "../constants/AssetsTypes.js";
import { GlbLoader } from "../loaders/GlbLoader.js";
import { HdrLoader } from "../loaders/HdrLoader.js";
import { TextureLoader } from "../loaders/TextureLoader.js";

const assetToLoad = (path, type) => ({ path, type })

export class ThreeAssetsManager {
  static Queue = new Map();
  static TexturesMap = new Map();
  static ModelsMap = new Map();
  static HdrMap = new Map();

  /**
   * Add a Three.js texture to load
   * @param {AssetsId} textureId
   * @param {string} texturePath
   * @returns {any}
  */
  static AddTexture(textureId, texturePath) {
    this.Queue.set(textureId, assetToLoad(texturePath, AssetsTypes.TEXTURE));
  }

  /**
   * Add a GLB to load
   * @param {AssetsId} textureId
   * @param {string} texturePath
   * @returns {any}
  */
  static AddGlb(modelId, modelPath) {
    this.Queue.set(modelId, assetToLoad(modelPath, AssetsTypes.GLB));
  }

  /**
   * Add an HDR to load
   * @param {AssetsId} textureId
   * @param {string} texturePath
   * @returns {any}
  */
  static AddHdr(hdrId, hdrPath) {
    this.Queue.set(hdrId, assetToLoad(hdrPath, AssetsTypes.HDR));
  }

  /**
   * Load all Three.js related assets added to queue
   * @returns {any}
  */
  static async Load() {
    const promises = Array.from(this.Queue.entries()).map(async ([id, { type, path }]) => {
      let asset = undefined;

      switch (type) {
        case AssetsTypes.TEXTURE:
          asset = await TextureLoader.Load(path);
          this.TexturesMap.set(id, asset);
          break;
        case AssetsTypes.GLB:
          asset = await GlbLoader.Load(path);
          this.ModelsMap.set(id, asset);
          break;
        case AssetsTypes.HDR:
          asset = await HdrLoader.Load(path);
          this.HdrMap.set(id, asset);
          break;
      }
    });

    await Promise.all(promises);
  }

  /**
   * Texture Getter
   * @param {AssetsId} textureId
   * @returns {Texture}
  */
  static GetTexture(textureId) {
    return this.TexturesMap.get(textureId);
  }

  /**
   * 3D Model Getter
   * @param {AssetsId} textureId
   * @returns {any}
  */
  static GetModel(modelId) {
    return this.ModelsMap.get(modelId);
  }

  /**
   * HDR Getter
   * @param {AssetsId} textureId
   * @returns {any}
  */
  static GetHdr(hdrId) {
    return this.HdrMap.get(hdrId);
  }
}