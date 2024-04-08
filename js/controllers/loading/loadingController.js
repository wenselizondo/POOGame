import { MENU_STATE } from "../../managers/gameManager.js";
import { Controller } from "../controller.js";
import { LoadingService } from "./loadingService.js";
import { LoadingView } from "./loadingView.js";

export class LoadingController extends Controller{
     constructor(parent){
        super(parent);
        this.view = new LoadingView(parent, this);
        this.view.className = 'loadingView';
        this.service = new LoadingService(this);

    }

    delete(){
        let event = new CustomEvent('goto-state',{
            detail:{
                state:MENU_STATE
            },
            bubbles:true,
            cancelable:true,
            composed:false
        });
        this.view.dispatchEvent(event);
        super.delete();
    }
}