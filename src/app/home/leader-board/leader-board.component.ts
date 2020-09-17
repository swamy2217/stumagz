import { Component, OnInit, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
    selector: 'app-leader-board',
    templateUrl: './leader-board.component.html',
    styleUrls: ['./leader-board.component.scss'],
})
export class LeaderBoardComponent implements OnInit {
    @Input() boardTitle;
    @Input() isLoadingData;
    @Input() leaderBoardInfo;
    @Input() monthlyBoard;
    @Input() weeklyBoard;
    color: ThemePalette = 'accent';
    weeklyData = [];
    MonthlyData = [];
    boardData = [];
    isChecked = true;

    constructor() {
        if (this.boardTitle === 'Leader Board') {
            this.boardData = this.leaderBoardInfo;
        } else {
            this.boardData = this.leaderBoardInfo;
        }
    }

    ngOnInit(): void {
        this.isChecked = true;
    }

    // don't remove this method
    dataChanged(event) {}
}
