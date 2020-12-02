import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { CalendarEventAction } from 'angular-calendar';


export interface EventData {
    title: string,
    start: Date,
    end: Date,
    color: any,
    actions: CalendarEventAction[],
    draggable: boolean,
    resizeable: {}
}

@Injectable({
    providedIn: 'root'
})

export class CalendarService {

    constructor(private http: HttpClient) { }

    private request(
        method: "post",
        type: "event",
        event: EventData,
        userId: string
    ): Observable<any> {
        return this.http.post(`api/events/${userId}`, event)
    }

    saveEvent(event: EventData, userId): Observable<any>{
        console.log(event);
        return this.request("post", "event", event, userId);
    } 
}