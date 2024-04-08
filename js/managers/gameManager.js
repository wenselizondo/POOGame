import { LoadingController } from "../controllers/loading/loadingController.js";
import { MenuController } from "../controllers/menu/menuController.js";
import { div } from "../libs/html.js";


export class GameManager {
    constructor( ){
        this.mainContainer = div({id:'mainContainer',className:'mainContainer'},document.body);
        this.navContainer = div({id:'navContainer',className:'navContainer'},this.mainContainer);
        this.contentContainer = div({id:'contentContainer',className:'contentContainer'},this.mainContainer);
        this.currentController = null;   
        this.menuController = null;     


        this.mainContainer.addEventListener('on-loading-completed',(event) => {
            this.loadingComplete();
        })
        
        this.mainContainer.addEventListener('goto-state',(event) => {
            this.goto(event.detail.state)
        })

        this.goto(LOADING_STATE)

    }

    loadingComplete(){
        console.log('loading complete continue after loading complete')
        this.currentController.delete()

    }

    goto(state){
        switch (state) {
            case LOADING_STATE:
                this.currentController = new LoadingController(this.contentContainer)
                break;
        
            case MENU_STATE:
                this.menuController = new MenuController(this.contentContainer)
                break;
            case RESULTS_STATE:
                
                break;
            case LOGIN_STATE:

                break;
        
            default:
                break;
        }
       
    }
}

export const LOADING_STATE = 0
export const MENU_STATE = 1
export const RESULTS_STATE = 2
export const LOGIN_STATE = 3