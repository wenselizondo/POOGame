export class LoadingService {
    constructor(controller){
        this.controller = controller;
        this.getData();
    }

    getData(){
        window.setTimeout(() => {
            let event = new CustomEvent('on-loading-completed',{
                detail:{
                    state:'state'
                },
                bubbles:true,
                cancelable:true,
                composed:false
            });
            this.controller.view.dispatchEvent(event);
        },500);
    }
}