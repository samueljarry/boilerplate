export class SoundLoader {
  /**
   * Load an MP3 file
   * @param {string} path
   * @returns {Promise<HTMLAudioElement>}
   */
  static Load(path) {
    return new Promise((resolve, reject) => {
      const audio = new Audio();

      audio.addEventListener("canplaythrough", () => {
        resolve(audio);
      });

      audio.addEventListener("error", (error) => {
        reject(new Error(`Error loading sound: ${error}`));
      });

      audio.src = path;
      audio.load();
    });
  }
}
