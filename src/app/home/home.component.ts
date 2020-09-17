import { Component, OnInit, ViewChild, OnDestroy, Inject } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { environment } from '@env/environment';
import { HttpService } from '@app/services/http.service';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { URLS } from '@app/constants';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@app/services/dialog.component';
import { CreateQuizComponent } from '@app/create/create-quiz.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
    data = [];
    destroy$: Subject<boolean> = new Subject<boolean>();
    features = [];
    defaultFeatures = [
        { groupName: 'BRAND', groupCount: 0 },
        { groupName: 'SKILL', groupCount: 0 },
        { groupName: 'PARTICIPATED', groupCount: 0 },
        { groupName: 'DAILY', groupCount: 0 },
    ];
    title = 'Skill';
    opened = true;
    userInfo: any;
    featureType: string;
    featureData = [];
    featureList = [];
    leaderboard = [];
    boardData = [];
    weeklyBoard = [];
    monthlyBoard = [];
    boardTitle: string;
    defaultFeatureType = 'DAILY';
    isStatsLoading: boolean;
    isLoading: boolean;
    isBoardLoading: boolean;
    toggleMenu: boolean;

    constructor(
        private httpService: HttpService,
        private dialog: MatDialog) { }

    ngOnInit() {
        this.isLoading = true;
        this.featureType = this.defaultFeatureType;
        this.boardTitle = 'Leader Board';

        // this.featureList = this.removeItemOnce(this.features, this.featureType);
        // this.featureData = this.listRange;
        /* const decoded = jwt_decode(environment.adminToken);
        console.log(decoded); */
        this.getStats();
        this.loadData(this.featureType);
        this.getLeaderBoardData(this.featureType);
    }

    openAsideMenu() {
        this.toggleMenu = true;
    }

    closeSidebar() {
        this.toggleMenu = false;
    }

    openFeatureData(title) {
        this.featureType = title;
        this.boardTitle =
            this.featureType === this.defaultFeatureType
                ? 'Leader Board'
                : ['PARTICIPATED', 'BRAND'].includes(this.featureType)
                    ? 'Participating Brands'
                    : '';
        this.featureList = this.removeItemOnce(this.features, this.featureType);
        this.isLoading = true;
        this.loadData(this.featureType);
        this.getLeaderBoardData(this.featureType);
    }

    getStats(): void {
        this.isStatsLoading = true;
        this.httpService
            .get(`${URLS.STATS}`)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (data: any[]) => {
                    this.isStatsLoading = false;
                    this.features = data;
                    this.featureList = this.removeItemOnce(
                        this.features,
                        this.defaultFeatureType
                    );
                },
                (err) => {
                    this.features = this.defaultFeatures;
                    this.featureList = this.removeItemOnce(
                        this.defaultFeatures,
                        this.defaultFeatureType
                    );
                    this.isStatsLoading = false;
                    console.log(err);
                }
            );
    }

    loadData(featureType: string): void {
        const url =
            featureType === 'PARTICIPATED'
                ? `${URLS.PARTICIPATED}`
                : `${URLS.API}?type=${featureType}`;
        this.httpService
            .get(`${url}`)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (data: any[]) => {
                    this.isLoading = false;
                    this.featureData = data;
                },
                (err) => {
                    this.featureData = [];
                    this.isLoading = false;
                }
            );
    }

    getLeaderBoardData(type): void {
        this.isBoardLoading = true;
        if (type === this.defaultFeatureType) {
            this.httpService
                .get(`${URLS.MONTHLYBOARD}`)
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                    (data: any[]) => {
                        this.monthlyBoard = data;
                        this.isBoardLoading = false;
                    },
                    (err) => { }
                );

            this.httpService
                .get(`${URLS.WEEKLYBOARD}`)
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                    (data: any[]) => {
                        this.weeklyBoard = data;
                        this.isBoardLoading = false;
                    },
                    (err) => {
                        this.isBoardLoading = false;
                    }
                );
        } else if (type === 'SKILL') {
            this.httpService
                .get(`${URLS.SKILLBOARD}`)
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                    (data: any[]) => {
                        this.boardData = data;
                        this.isBoardLoading = false;
                    },
                    (err) => {
                        this.isBoardLoading = false;
                    }
                );
        } else if (['PARTICIPATED', 'BRAND'].includes(type)) {
            this.httpService
                .get(`${URLS.MONTHLYBOARD}`)
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                    (data: any[]) => {
                        this.boardData = data;
                        this.isBoardLoading = false;
                    },
                    (err) => {
                        this.isBoardLoading = false;
                    }
                );
        }
    }

    removeItemOnce(items, value) {
        return items.filter((item) => item.groupName !== value);
    }

    /* createQuiz() {
        const dialogRef = this.dialog.open(CreateQuizComponent);

        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
        });
    } */

    ngOnDestroy() {
        this.destroy$.next(true);
        // Unsubscribe from the subject
        this.destroy$.unsubscribe();
    }
}
