export class ImageLoader {
  /**
   * Load an image file
   * @param {string} path
   * @returns {Promise<HTMLImageElement>}
   */
  static Load(path) {
    return new Promise((resolve, reject) => {
      const image = new Image();

      image.addEventListener("load", () => {
        resolve(image);
      });

      image.addEventListener("error", (error) => {
        reject(new Error(`Error loading image: ${error}`));
      });

      image.src = path;
    });
  }
}
