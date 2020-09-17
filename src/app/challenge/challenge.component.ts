import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '@app/services/http.service';
import { QuizDetails, Quiz } from '@app/services/quiz.model';
import { CdkStepper } from '@angular/cdk/stepper';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
// import { ToastrService } from 'ngx-toastr';
import { SERVER_MESSAGES } from '@app/constants';
import { CountdownComponent } from 'ngx-countdown';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@app/services/dialog.component';

@Component({
    selector: 'app-challenge',
    templateUrl: './challenge.component.html',
    styleUrls: ['./challenge.component.scss'],
})
export class ChallengeComponent implements OnInit {
    @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
    quizInfo: QuizDetails;
    isLoading: boolean;
    showTimer: boolean;
    showStartButton: boolean;
    quizId: string;
    step: number;
    isPublishButtonClicked: boolean;
    stepsCount: number;
    formGroup: FormGroup;
    spinner: boolean;
    leaderboardData: any;
    reviewData: any;
    // tslint:disable-next-line: max-line-length
    QuizData: Quiz;
    countDownLeftTime;
    countDownconfig;
    CountdownTimeUnits: Array<[string, number]> = [
        ['Y', 1000 * 60 * 60 * 24 * 365], // years
        ['M', 1000 * 60 * 60 * 24 * 30], // months
        ['D', 1000 * 60 * 60 * 24], // days
        ['H', 1000 * 60 * 60], // hours
        ['m', 1000 * 60], // minutes
        ['s', 1000], // seconds
    ];

    constructor(
        private route: ActivatedRoute,
        private httpService: HttpService,
        private router: Router,
        private dialog: MatDialog,
        // private toastrService: ToastrService,
    ) { }

    ngOnInit(): void {
        this.isPublishButtonClicked = false;
        this.isLoading = true;
        this.step = 1;
        this.quizId = this.route.snapshot.paramMap.get('id');
        // this.pubishForm('abc');
        this.httpService.get(`api/${this.quizId}`).subscribe(
            (data) => {
                this.isLoading = false;
                if (data) {
                    this.quizInfo = data;
                    this.compareTime(data);
                } else {
                    this.router.navigate(['/home']);
                }
            },
            (err) => {
                this.isLoading = false;
                this.router.navigate(['/home']);
                console.error('something went wrong');
            }
        );

        this.formGroup = new FormGroup({
            answer: new FormControl(['', Validators.required])
        });
    }

    compareTime(data) {
        const d1 = new Date();
        const d2 = new Date(data.startTime);
        const d3 = new Date(data.endTime);
        this.showTimer = d2.getTime() >= d1.getTime();
        this.showStartButton = d3.getTime() >= d1.getTime();
        if (this.showTimer) {
            this.countDownLeftTime = (d2.getTime() - d1.getTime()) / 1000;
            // Lessthan 24 hours
            if (this.countDownLeftTime < 86400) {
                this.countDownconfig = { leftTime: this.countDownLeftTime, format: 'HH:mm:ss' };
            } else if (this.countDownLeftTime > 86399 && this.countDownLeftTime < 2592000) {
                // morethan 24 hours
                this.countDownconfig = {
                    leftTime: this.countDownLeftTime,
                    formatDate: ({ date, formatStr }) => {
                        let duration = Number(date || 0);

                        return this.CountdownTimeUnits.reduce((current, [name, unit]) => {
                            if (current.indexOf(name) !== -1) {
                                const v = Math.floor(duration / unit);
                                duration -= v * unit;
                                return current.replace(new RegExp(`${name}+`, 'g'), (match: string) => {
                                    return v.toString().padStart(match.length, '0');
                                });
                            }
                            return current;
                        }, 'D:H:m:s');
                    },
                };
            }
            else {
                // this.countDownconfig = { leftTime: this.countDownLeftTime, format: 'MM:dd:HH:mm:ss' };
                this.countDownconfig = {
                    leftTime: this.countDownLeftTime,
                    formatDate: ({ date, formatStr }) => {
                        let duration = Number(date || 0);
                        return this.CountdownTimeUnits.reduce((current, [name, unit]) => {
                            if (current.indexOf(name) !== -1) {
                                const v = Math.floor(duration / unit);
                                duration -= v * unit;
                                return current.replace(new RegExp(`${name}+`, 'g'), (match: string) => {
                                    return v.toString().padStart(match.length, '0');
                                });
                            }
                            return current;
                            // 'D:H:m:s'
                        }, 'D day: H: mm : s');
                    },
                };
            }
        } else {
            console.log('show button');
        }
    }

    getTimerFormat(format: string) {

    }

    startQuiz() {
        this.spinner = true;
        this.httpService
            .post(`api/${this.quizId}/begin`, '')
            .subscribe((data) => {
                this.spinner = false;
                console.log(data);
                this.step = 2;
                this.QuizData = data;
                this.stepsCount = this.QuizData.attemptQuestions.length - 1;
            }, (err) => {
                this.spinner = false;
                /* if (err === SERVER_MESSAGES.ALREADY_SUBMITTED) {
                    this.step = 3;
                    this.openQuizleaderBoard();
                    this.quizReview();
                } */

                /* on submit call getting error as "No value present"
                else if (err === SERVER_MESSAGES.QUIZ_TIME_FINISHED) {
                    this.pubishForm('1');
                } */
            });
    }

    setSelected(questionIndex: number, optionIndex: number, sno, question): void {
        const currentQuextion = this.QuizData.attemptQuestions[questionIndex];
        currentQuextion.question.options.forEach(o => o.selected = false);
        currentQuextion.question.options[optionIndex].selected = true;
        currentQuextion.chosenOption = sno;
        this.saveRecord(currentQuextion);
    }

    saveRecord(question) {
        const answeredQuestion = [
            {
                chosenOption: question.chosenOption,
                questionSno: question.question.sno
            }
        ];
        this.httpService.post(`api/${this.QuizData.id}/save`, answeredQuestion).subscribe((data) => { });
    }

    handleEvent(evt) {
        this.showTimer = false;
    }

    // submit the test
    pubishForm(ids) {
        if (this.step === 4) { return false; }
        this.isPublishButtonClicked = true;
        this.httpService
            .post(`api/${this.QuizData.id}/submit`, '')
            .pipe(first())
            .subscribe(
                (data) => {
                    this.isPublishButtonClicked = false;
                    if (data) {
                        // this.toastrService.success('Your quiz submitted');
                        const dialogRef = this.dialog.open(DialogComponent, { data: 'Your quiz submitted' });
                        setTimeout(() => {
                            dialogRef.close();
                        }, 5000);
                        this.router.navigate(['/home']);
                        /* this.step = 3;
                        this.openQuizleaderBoard();
                        this.quizReview(); */
                    }
                },
                (err) => {

                    this.isPublishButtonClicked = false;
                    /* this.toastrService.error(
                        'Something went wrong, please try again later'
                    ); */
                }
            );
    }

    timeConvertedMS2Sec(msecs) {
        return (msecs) ? msecs / 1000 : msecs;
    }

    openQuizleaderBoard() {
        this.httpService.get(`api/${this.quizId}/leaderboard`).subscribe(
            (data) => {
                this.isLoading = false;
                if (data) {
                    this.leaderboardData = data;
                }
            },
            (err) => {
                this.isLoading = false;
            }
        );
    }

    showLeaderBoard() {
        this.step = 3;
        this.openQuizleaderBoard();
    }

    quizReview() {
        this.step = 3;
        this.isLoading = true;
        this.openQuizleaderBoard();
        this.httpService.get(`api/${this.quizId}/review`).subscribe(
            (data) => {
                this.isLoading = false;
                if (data) {
                    this.reviewData = data;
                    this.stepsCount = this.reviewData.attemptQuestions.length - 1;
                }
            },
            (err) => {
                if (err === 'Quiz attempt is still in progress. Please submit your attempt.') {
                    // TODO: DO SOME ACTION
                }
                this.isLoading = false;
            }
        );
    }

    reviewQuestions() {
        if (this.reviewData && this.reviewData.attemptQuestions.length) {
            this.step = 4;
        }
    }

    moveTo(stepNumber) {
        this.step = stepNumber;
    }
}


/** Custom CDK stepper component */
@Component({
    selector: 'app-quiz-stepper',
    templateUrl: '../create/stepper/custom-stepper.html',
    styleUrls: ['../create/stepper/custom-stepper.scss'],
    providers: [{ provide: CdkStepper, useExisting: StepperComponent }],
})
export class StepperComponent extends CdkStepper {
    @Output() isPublished = new EventEmitter();
    @Input() isSubmitted;
    @Input() stepsCount;
    @Input() type;

    onClick(index: number): void {
        this.selectedIndex = index;
    }

    Publish(idx: number): void {
        console.log(idx);
        this.isPublished.emit(idx);
    }
}
