export class WindowItems{
    itemName : string
    itemState : itemStates
    icon : string
    constructor(){
        this.itemName = ""
        this.itemState = 'opened'
        this.icon = ''
    }
}


type itemStates = 'opened' | 'minimized'