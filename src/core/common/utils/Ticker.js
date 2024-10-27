export class Ticker {

    static _IsRunning
    static _IntervalId
    static _CurrentTime
    static _ElapsedTime
    static _StartTime
    static _Callbacks = new Array();
    // static _minTimeBetweenFrame: number = 1000 / 100;
    static _minTimeBetweenFrame = 0;

    static Start(time = -1) {
        this.Stop();
        this._IsRunning = true;
        Ticker._CurrentTime = Date.now();
        this._StartTime = Date.now();
        clearInterval(this._IntervalId);
        if (time < 0) {
            Ticker._RenderRaf();
        } else {
            this._IntervalId = setInterval(this._RenderInterval, time);
        }
    }

    static Stop() {
        this._IsRunning = false;
        clearInterval(this._IntervalId);
    }


    static Add(callback, priority = 0) {
        for (const icallback of Ticker._Callbacks) {
            if (icallback.callback === callback) return;
        }
        Ticker._Callbacks.push({ callback: callback, priority: priority });
        Ticker._Callbacks.sort(Ticker._SortCallbacks);
    }

    static Remove(callback) {
        for (let i = 0; i < Ticker._Callbacks.length; i++) {
            if (Ticker._Callbacks[i].callback === callback) {
                Ticker._Callbacks.splice(i, 1);
                return;
            }
        }
    }

    static _SortCallbacks(a, b) {
        if (a.priority > b.priority) return -1;
        if (a.priority < b.priority) return 1;
        return 0;
    }

    static SetFPS(fps) {
        this._minTimeBetweenFrame = 1000 / fps;
    }

    static _RenderRaf = () => {
        this._Render();
        if (this._IsRunning) {
            requestAnimationFrame(Ticker._RenderRaf);
        }
    }

    static _RenderInterval = () => {
        this._Render();
    }

    static _Render() {
        const now = Date.now();
        const lastFrame = Ticker._CurrentTime;
        const dt = now - lastFrame;
        if (dt < this._minTimeBetweenFrame) {
            return;
        }
        this._ElapsedTime += dt;
        Ticker._CurrentTime = now;
        for (const icallback of Ticker._Callbacks) {
            icallback.callback(dt / 1000);
        }
    }

    /**
    * Timestamp in milliseconds at the start of the game
    */
    static get StartTime() { return this._StartTime };

    /**
    * Current timestamp of the game in milliseconds (Date.now())
    */
    static get CurrentTime() { return this._CurrentTime };

    /**
    * Time since the start of the game in milliseconds
    */
    static get ElapsedTime() { return this._ElapsedTime };
}