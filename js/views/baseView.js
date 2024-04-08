import { div } from "../libs/html.js";

export class BaseView extends HTMLElement{
    constructor(parent, controller = null ){
        super()
        this.parent = parent;
        this.controller = controller;
        this.parent.appendChild(this);
    }

    delete(){
        this.parent.removeChild(this);
    }
}


customElements.define('base-view',BaseView);