import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { HomeComponent } from './home.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { LeaderBoardComponent } from './leader-board/leader-board.component';

@NgModule({
    declarations: [HomeComponent, QuizListComponent, LeaderBoardComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatSidenavModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatListModule,
        MatToolbarModule,
        MatSlideToggleModule,
        NgxSkeletonLoaderModule,
        RouterModule.forChild([{ path: '', component: HomeComponent }]),
    ],
})
export class HomeModule {}
