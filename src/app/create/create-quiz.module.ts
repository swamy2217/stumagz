import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { LayoutModule } from '@angular/cdk/layout';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';

import { CreateQuizComponent, StepperComponent } from './create-quiz.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
} from '@angular-material-components/datetime-picker';

@NgModule({
    declarations: [CreateQuizComponent, StepperComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatStepperModule,
        LayoutModule,
        MatFormFieldModule,
        MatInputModule,
        CdkStepperModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        MatRadioModule,
        MatSelectModule,
        NgxMatDatetimePickerModule,
        MatDatepickerModule,
        NgxMatTimepickerModule,
        NgxMatNativeDateModule,
        RouterModule.forChild([{ path: '', component: CreateQuizComponent }]),
    ],
})
export class CreateModule { }
