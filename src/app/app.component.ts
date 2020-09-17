import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'stumagz-quiz-angular';
    constructor(private _elementRef: ElementRef) {}

    ngOnInit(): void {
        this._elementRef.nativeElement.removeAttribute('ng-version');
    }
}
