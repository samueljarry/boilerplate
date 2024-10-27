import * as THREE from 'three';

export class TextureLoader {
  static Loader = new THREE.TextureLoader();
  
  static async Load(path) {
    const texture = await this.Loader.loadAsync(path);
    texture.colorSpace = THREE.SRGBColorSpace
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    
    return texture;
  }
}