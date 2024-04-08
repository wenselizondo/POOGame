import { div, span } from "../../libs/html.js";
import { BaseView } from "../../views/baseView.js";


export class LoadingView extends BaseView{
    constructor(parent, controller){
        super(parent, controller);
        this.className = "loadingView"
        // this.innerHTML = 'Loading...'
        let spinner = div ({className:'loadingView-spinner'},this)
        span({innerHTML:'loading'},this)

        gsap.to(spinner,{rotation:360,duration:2,repeat:-1})
    }
}

customElements.define('loading-view',LoadingView);