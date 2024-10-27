export class InitCommandBase {
  async init() {
    await this.initProxies();
    await this.initManagers();
    await this.initThree();
    await this.initViews();
    await this.initTheaters();
    await this.loadAssets();
    await this.initAfterLoad();
  }

  /**
   * Init all proxies 
  */
  async initProxies() {
    
  }

  /**
   * Init all Managers
  */
  async initManagers() {
    
  }

  /**
   * Init every Three.js related assets
  */
  async initThree() {
    
  }

  /**
   * Init all views
  */
  async initViews() {

  }

  /**
   * Init theaters
  */
  async initTheaters() {

  }

  /**
   * Load all assets added to queue
  */
  async loadAssets() {
    
  }

  /**
   * Init anything after everything is loaded
  */
  async initAfterLoad() {
    
  }
}