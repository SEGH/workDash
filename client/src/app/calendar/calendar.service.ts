import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

export interface EventData {
  title: string,
  start: Date,
  end?: Date,
  color?: any,
  actions?: any,
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
    userId?: string,
    event?: EventData
  ): Observable<any> {
    if (method === "post") {
      return this.http.post(`api/events/${userId}`, event)
    } else {
      return this.http.get(`api/events/${userId}`);
    }

  }

  saveEvent(event: EventData, userId): Observable<any> {
    console.log(event);
    return this.request("post", "event", userId, event);
  }

  getEvents(userId): Observable<any> {
    console.log(userId);
    return this.request("get", "allEvents", userId);
  }

  deleteEvent(eventId, userId) {
    return this.http.delete(`api/events/${userId}/${eventId}`);
  }

  updateTitle(eventId, title) {
    console.log(`event ${eventId} updated to ${title}`);
    const body = { title: title };
    return this.http.put(`api/events/${eventId}`, body);
  }
}