export class Event{
    constructor(title, start, end){
        this.title = title;
        this.start = start;
        this.end = end;
    }
}

export class Events{
    constructor(){
        this.events=[]
    }
    newEvent(title, start, end){
        this.events.push(new Event(title, start, end))
    }
    get allEvents(){
        return this.events
    }
}

