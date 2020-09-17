import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengeComponent, StepperComponent } from './challenge.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
// import { TimerComponent } from './timer.component';
import { CountdownModule } from 'ngx-countdown';

@NgModule({
    declarations: [ChallengeComponent, StepperComponent,
        // TimerComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatRadioModule,
        CdkStepperModule,
        MatIconModule,
        MatListModule,
        MatProgressSpinnerModule,
        NgxSkeletonLoaderModule,
        CountdownModule,
        RouterModule.forChild([{ path: '', component: ChallengeComponent }]),
    ],
})
export class ChallengeModule { }
