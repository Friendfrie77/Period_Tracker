import Moment from "moment";

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
    checkForEvents(previousPeriods, periodStartDate, periodEndDate){
        if (this.events.length === 0){
            previousPeriods.forEach((period) =>{
                let start = Moment(period.startDate).format('YYYY-MM-DD');
                let end = Moment(period.endDate).format('YYYY-MM-DD');
                this.newEvent('Period Was Active', start, end, true)
            })
        }
        if(periodStartDate && periodEndDate){
            let start = Moment(periodStartDate).format('YYYY-MM-DD');
            let end = Moment(periodEndDate).format('YYYY-MM-DD');
            this.newEvent('Period Active', start, end, true)
        }
    }
    get allEvents(){
        return this.events
    }
}

