import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { CalendarEventAction } from 'angular-calendar';


export interface EventData {
    title: string,
    start: Date,
    end?: Date,
    color: any,
    actions?: CalendarEventAction[],
    draggable?: boolean,
    resizable?: {
      beforeStart?: boolean;
      afterEnd?: boolean;
    }
}

@Injectable({
    providedIn: 'root'
})

export class CalendarService {

    constructor(private http: HttpClient) { }

    private request(
        method: "post" | "get",
        type: "event" | "allEvents",
        userId: string,
        event?: EventData,
    ): Observable<any> {
        if (method === "post") {
          return this.http.post(`api/events/${userId}`, event)
        } else {
          return this.http.get(`api/events/5fadd31bdc630d854c5832ea`);
        }

    }

    saveEvent(event: EventData, userId): Observable<any>{
        console.log(event);
        return this.request("post", "event", userId, event);
    }

    getEvents(userId): Observable<any>{
      console.log(userId);
      return this.request("get", "allEvents", userId);
    }
}