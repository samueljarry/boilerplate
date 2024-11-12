export class VideoLoader {
  /**
   * Load a video file
   * @param {string} path
   * @returns {Promise<HTMLVideoElement>}
   */
  static Load(path) {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");

      video.addEventListener("loadeddata", () => {
        resolve(video);
      });

      video.addEventListener("error", (error) => {
        reject(new Error(`Error loading video: ${error}`));
      });

      video.src = path;
      video.load();
    });
  }
}
