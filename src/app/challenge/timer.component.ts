import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { interval, timer, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'timer',
    template: `<ng-container *ngIf="timerValue"><span *ngIf="timerValue?.hours">{{timerValue.hours|number :'2.0'}}</span>:{{timerValue.minutes|number :'2.0'}}:{{timerValue.seconds|number :'2.0-0'}}</ng-container>`,
})
export class TimerComponent implements OnInit, OnDestroy {
    @Input() value: number;
    // tslint:disable-next-line: no-output-rename
    @Output('onComplete') timerOver = new EventEmitter<any>();
    timerValue;
    areTenSecsRemainings = false;
    subscription = Subscription.EMPTY;
    subscription1 = Subscription.EMPTY;
    constructor() { }

    ngOnInit() {
        const timerInterval$ = interval(1000);
        const timer$ = timer(this.value * 1000);
        const time = this.value;
        const countDown$ = timerInterval$.pipe(take(time));

        this.subscription = countDown$.subscribe(val => {
            const second = (time - val);
            let mins = parseInt('' + second / 60, 10);
            const secs = second % 60;
            const hrs = parseInt('' + mins / 60, 10);
            mins = mins % 60;
            const res = {
                hours: hrs,
                minutes: mins,
                seconds: secs
            };
            this.timerValue = res;
        });
        this.subscription1 = timer$.subscribe(val => {
            this.timerOver.emit('TIMER OVER');
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.subscription1.unsubscribe();
    }
}
