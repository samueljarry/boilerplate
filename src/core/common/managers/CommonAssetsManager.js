import { Action } from "../utils/Action.js";
import { AssetsTypes } from "../constants/AssetsTypes.js";
import { ImageLoader } from "../loaders/ImageLoader.js";
import { SoundLoader } from "../loaders/SoundLoader.js";
import { VideoLoader } from "../loaders/VideoLoader.js";

const assetToLoad = (path, type) => ({ path, type });

export class CommonAssetsManager {
  static Queue = new Map();
  static VideosMap = new Map();
  static ImagesMap = new Map();
  static SoundsMap = new Map();
  static Loaded = 0;
  static OnAssetLoaded = new Action();

  /**
   * Add a video to load
   * @param {AssetsId} videoId
   * @param {string} videoPath
   * @returns {void}
   */
  static AddVideo(videoId, videoPath) {
    this.Queue.set(videoId, assetToLoad(videoPath, AssetsTypes.VIDEO));
  }

  /**
   * Add an image to load
   * @param {AssetsId} imageId
   * @param {string} imagePath
   * @returns {void}
   */
  static AddImage(imageId, imagePath) {
    this.Queue.set(imageId, assetToLoad(imagePath, AssetsTypes.IMAGE));
  }

  /**
   * Add a sound to load
   * @param {AssetsId} soundId
   * @param {string} soundPath
   * @returns {void}
   */
  static AddSound(soundId, soundPath) {
    this.Queue.set(soundId, assetToLoad(soundPath, AssetsTypes.SOUND));
  }

  /**
   * Load all common assets added to queue
   * @returns {Promise<void>}
   */
  static async Load() {
    const updateLoadedAssetsCount = () => {
      this.Loaded++;
      this.OnAssetLoaded.execute();
    };

    const promises = Array.from(this.Queue.entries()).map(
      async ([id, { type, path }]) => {
        let asset = undefined;

        switch (type) {
          case AssetsTypes.VIDEO:
            asset = await VideoLoader.Load(path);
            updateLoadedAssetsCount();
            this.VideosMap.set(id, asset);
            break;
          case AssetsTypes.IMAGE:
            asset = await ImageLoader.Load(path);
            updateLoadedAssetsCount();
            this.ImagesMap.set(id, asset);
            break;
          case AssetsTypes.SOUND:
            asset = await SoundLoader.Load(path);
            updateLoadedAssetsCount();
            this.SoundsMap.set(id, asset);
            break;
        }
      }
    );

    await Promise.all(promises);
  }

  /**
   * Video Getter
   * @param {AssetsId} videoId
   * @returns {HTMLVideoElement}
   */
  static GetVideo(videoId) {
    return this.VideosMap.get(videoId);
  }

  /**
   * Image Getter
   * @param {AssetsId} imageId
   * @returns {HTMLImageElement}
   */
  static GetImage(imageId) {
    return this.ImagesMap.get(imageId);
  }

  /**
   * Sound Getter
   * @param {AssetsId} soundId
   * @returns {HTMLAudioElement}
   */
  static GetSound(soundId) {
    return this.SoundsMap.get(soundId);
  }
}
