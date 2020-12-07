import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, AfterViewInit, ElementRef, ChangeDetectorRef, Input } from '@angular/core';
import { isSameDay, isSameMonth, addHours, differenceInMinutes, startOfDay, startOfHour } from "date-fns";
import { Subject } from "rxjs";
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from "angular-calendar";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CalendarService, EventData } from "./calendar.service";

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements AfterViewInit {
  @Input() userName: string;
  @Input() userId: string;

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  @ViewChild('scrollContainer') scrollContainer: ElementRef<HTMLElement>;

  view: CalendarView = CalendarView.Day;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-trash-alt">Delete</i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.calendarService.deleteEvent(event.id, this.userId).subscribe(
          () => {
            console.log(`${event.id} deleted`);
          }
        )
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  // clickedDate: Date;
  // clickedColumn: number;

  constructor(private modal: NgbModal, private cdr: ChangeDetectorRef, private calendarService: CalendarService) {}
  
  ngAfterViewInit() {
    this.scrollToCurrentView();
    this.getAllEvents();
  }

  viewChanged() {
    this.cdr.detectChanges();
    this.scrollToCurrentView();
  }

  private scrollToCurrentView() {
    if (this.view === CalendarView.Week || CalendarView.Day) {
      // each hour is 60px high, so to get the pixels to scroll it's just the amount of minutes since midnight
      const minutesSinceStartOfDay = differenceInMinutes(
        startOfHour(new Date()),
        startOfDay(new Date())
      );
      const headerHeight = this.view === CalendarView.Week ? 60 : 0;
      this.scrollContainer.nativeElement.scrollTop =
        minutesSinceStartOfDay + headerHeight;
    }
  }

  getAllEvents() {
    this.calendarService.getEvents(this.userId).subscribe(
      userEvents => {
        console.log(userEvents);
        userEvents.events.forEach(event => {
          this.events = [
            ...this.events,
            {
              title: event.title,
              start: new Date(event.start),
              end: new Date(event.end),
              color: event.color,
              actions: this.actions,
              draggable: event.draggable,
              resizable: event.resizable,
              id: event._id
            }
          ]
          })
        })
        console.log(this.events);
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    console.log("event time change")
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
    let update = {
      start: newStart,
      end: newEnd
    }
    this.calendarService.updateEvent(event.id, update).subscribe(
      () => {
        console.log(`Event time updated`);
      }
    )
  }

  selectedEvent: CalendarEvent<any>

  handleEvent(action: string, event: CalendarEvent): void {
    // console.log(action);
    if (action === "Clicked") {
      this.modalData = { event, action };
      this.modal.open(this.modalContent, { size: 'lg' });
      this.selectedEvent = event;
    }
  }

  event: EventData = {
    title: "",
    start: new Date(),
    end: new Date(),
    color: "",
    actions: this.actions,
    draggable: true,
    resizable: {
      beforeStart: true,
      afterEnd: true,
    }
  }

  addEvent(clickedDate: Date): void {
    this.event =       {
      title: 'New event - Click to Edit',
      start: clickedDate,
      end: addHours(clickedDate, 1),
      color: colors.red,
      actions: this.actions,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      }
    };

    this.calendarService.saveEvent(this.event, this.userId).subscribe(
      (event) => {
        console.log(`event requested for ${this.userId}`)
        this.events = [
          ...this.events,
          {
            title: event.title,
            start: new Date(event.start),
            end: new Date(event.end),
            color: event.color,
            actions: this.actions,
            draggable: event.draggable,
            resizable: event.resizable,
            id: event._id
          }
        ];
      }
    );
  }

  eventInput: string;

  editEvent() {
    this.selectedEvent.title = this.eventInput;
    let update = {
      title: this.eventInput
    }
    this.calendarService.updateEvent(this.selectedEvent.id, update).subscribe(
      () => {
        console.log(`title updated`)
      }
    )
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
