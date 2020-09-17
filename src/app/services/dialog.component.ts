import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-dialog',
    template: `
    <mat-dialog-content class="text">
        <p> {{ data }} </p>
    </mat-dialog-content>
  `,
    styles: [`.mat-dialog-actions{  justify-content: flex-end; }
  `]
})
export class DialogComponent implements OnInit {
    textData: string;

    constructor(
        public dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
        if (data) {
            this.textData = data || this.textData;
        }
    }

    ngOnInit() { }

}
