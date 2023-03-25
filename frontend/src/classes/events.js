export class Event{
    constructor(title, start, end, allDay){
        this.title = title;
        this.start = start;
        this.end = end;
        this.allDay = allDay;
    }
}

export class Events{
    constructor(){
        this.events=[]
    }
    newEvent(title, start, end, allDay){
        this.events.push(new Event(title, start, end, allDay))
    }
    get allEvents(){
        return this.events
    }
}

