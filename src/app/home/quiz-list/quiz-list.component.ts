import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-quiz-list',
    templateUrl: './quiz-list.component.html',
    styleUrls: ['./quiz-list.component.scss'],
})
export class QuizListComponent implements OnInit {
    @Input() type;
    @Input() Listdata;
    @Input() loadingStatus;
    featureList = [
        { title: 'brand', questions: 60 },
        { title: 'skill', questions: 30 },
        { title: 'participated', questions: 50 },
    ];
    listRange = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    title = 'Skill';

    constructor() {}

    ngOnInit(): void {}
}
