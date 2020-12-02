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
  changeDetection: ChangeDetectionStrategy.OnPush,
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
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    // {
    //   start: subDays(startOfDay(new Date()), 1),
    //   end: addDays(new Date(), 1),
    //   title: 'A 3 day event',
    //   color: colors.red,
    //   actions: this.actions,
    //   allDay: true,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
    // {
    //   start: startOfDay(new Date()),
    //   title: 'An event with no end date',
    //   color: colors.yellow,
    //   actions: this.actions,
    // },
    // {
    //   start: subDays(endOfMonth(new Date()), 3),
    //   end: addDays(endOfMonth(new Date()), 3),
    //   title: 'A long event that spans 2 months',
    //   color: colors.blue,
    //   allDay: true,
    // },
    // {
    //   start: addHours(startOfDay(new Date()), 2),
    //   end: addHours(new Date(), 2),
    //   title: 'A draggable and resizable event',
    //   color: colors.yellow,
    //   actions: this.actions,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
  ];

  activeDayIsOpen: boolean = true;

  // clickedDate: Date;
  // clickedColumn: number;

  constructor(private modal: NgbModal, private cdr: ChangeDetectorRef, private calendarService: CalendarService) {}

  ngAfterViewInit() {
    this.scrollToCurrentView();
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
  }

  selectedEvent: CalendarEvent<any>

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
    this.selectedEvent = event;
  }

  event: EventData = {
    title: "",
    start: new Date(),
    end: new Date(),
    color: "",
    actions: this.actions,
    draggable: true,
    resizeable: {}
  }

  addEvent(clickedDate: Date): void {
    this.event =       {
      title: 'New event - Click to Edit',
      start: clickedDate,
      end: addHours(clickedDate, 1),
      color: colors.red,
      actions: this.actions,
      draggable: true,
      resizeable: {
        beforeStart: true,
        afterEnd: true,
      }
    };

    this.events = [
      ...this.events,
      this.event
    ];

    this.calendarService.saveEvent(this.event, this.userId).subscribe(
      () => {
        console.log(`event requested for ${this.userId}`)
      }
    );
  }

  eventInput: string;

  editEvent() {
    this.selectedEvent.title = this.eventInput;
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
