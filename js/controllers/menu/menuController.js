import { Controller } from "../controller.js";
import { MenuView } from "./menuView.js";

export class MenuController extends Controller{
     constructor(parent){
        super(parent);
        this.view = new MenuView(parent, this);
    }
}