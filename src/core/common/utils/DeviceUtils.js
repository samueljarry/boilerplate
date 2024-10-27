
export class DeviceUtils {

    static _IsMobile

    static _IsApple() {
        return /iPad/i.test(navigator.userAgent) || /Macintosh/i.test(navigator.userAgent);
    }

    static _HasTouch() {
        // Check if the device has touch capability
        return ('maxTouchPoints' in navigator) && navigator.maxTouchPoints > 0;
    }

    static Init() {

        const testExp = new RegExp('Android|webOS|iPhone|iPad|' +
            'BlackBerry|Windows Phone|' +
            'Opera Mini|IEMobile|Mobile',
            'i');
        if (testExp.test(navigator.userAgent)) {
            this._IsMobile = true;
        } else if (this._IsApple() && this._HasTouch()) {
            this._IsMobile = true;
        } else {
            this._IsMobile = false;
        }
    }


    static get IsMobile() { this.Init(); return this._IsMobile; }
}