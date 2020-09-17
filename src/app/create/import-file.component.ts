import { Component } from '@angular/core';

@Component({
    selector: 'dialog-content-example-dialog',
    template: `
    <h2 mat-dialog-title>Import File</h2>
<mat-dialog-content class="mat-typography">
<div class="text-danger" *ngIf="fileError"> {{fileError}} </div>
<div class="custom-file">
    <input type="file" accept=".csv, text/csv" class="custom-file-input" id="customFile" (change)="onFileChange($event)">
    <label class="custom-file-label" for="customFile"> {{ imageName }}</label>
</div>
<div class="small d-flex justify-content-end"> ** accept csv files only</div>
</mat-dialog-content>
<mat-dialog-actions align="end">
  <button mat-button mat-dialog-close>Cancel</button>
  <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Submit</button>
</mat-dialog-actions>
    `,
})
export class ImportFileComponent {
    fileError = '';
    imageName = '';
    onFileChange(evt) {

    }
}
