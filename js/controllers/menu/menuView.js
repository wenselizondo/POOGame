import { div, span } from "../../libs/html.js";
import { LOGIN_STATE } from "../../managers/gameManager.js";
import { BaseView } from "../../views/baseView.js";
import { GameButton } from "../../views/gameButton.js";
export class MenuView extends BaseView{
    constructor(parent, controller){
        super(parent, controller);
        this.className = "menuView"
        span({innerHTML:'Get ready to flex those brain muscles'},this);
        var logo = document.createElement('img');
        logo.src = 'img/1.png';
        this.appendChild(logo);
        logo.style.width ='250px'
        var beatUnicornBanner = document.createElement('img');
        beatUnicornBanner.src = 'img/2.png';
        this.appendChild(beatUnicornBanner);
        beatUnicornBanner.style.width ='280px'
        new GameButton (this,"Log In", () => {
            let event = new CustomEvent('goto-state',{
                detail:{
                    state:LOGIN_STATE
                },
                bubbles:true,
                cancelable:true,
                composed:false
            });
            this.dispatchEvent(event);
        });
        new GameButton (this,"Themes", () => {console.log("Themes")});
        new GameButton (this,"Level", () => {console.log("Level")});
        new GameButton (this,"Scores", () => {console.log("Scores")});
        new GameButton (this,"Credits", () => {console.log("Credits")});
        new GameButton (this,"PLAY", () => {console.log("PLAY")});
    }
}
customElements.define('menu-view',MenuView);