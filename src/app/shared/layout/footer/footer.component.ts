import { Component, ElementRef, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subscription } from "rxjs";

import { RequestService } from "../../services/request.service";
import { DefaultResponseType } from "../../../../types/default-response.type";
import { RequestRequestType, RequestType } from "../../../../types/request-request.type";
import { SnackbarErrorUtil } from "../../utils/snackbar-error.util";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnDestroy {
  @ViewChild('popupRequest') popupRequest!: TemplateRef<ElementRef>;
  @ViewChild('popupThankYou') popupThankYou!: TemplateRef<ElementRef>;
  dialogRef: MatDialogRef<any> | null = null;
  requestForm = this.fb.group({
    name: ['', [Validators.required]],
    phone: ['', [Validators.required]]
  });
  requestServiceSubscription: Subscription | null = null;
  dialogRefSubscription: Subscription | null = null;

  constructor(private dialog: MatDialog,
              private requestService: RequestService,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar) {
  }

  ngOnDestroy(): void {
    this.requestServiceSubscription?.unsubscribe();
    this.dialogRefSubscription?.unsubscribe();
  }

  callMe(): void {
    this.dialogRef = this.dialog.open(this.popupRequest);
    this.dialogRefSubscription = this.dialogRef?.backdropClick().subscribe(() => {
      this.requestForm.markAsUntouched();
      this.requestForm.reset();
    });
  }

  requestCallback(): void {
    if (this.requestForm.valid && this.requestForm.value.name && this.requestForm.value.phone) {
      const requestData: RequestRequestType = {
        name: this.requestForm.value.name,
        phone: this.requestForm.value.phone,
        type: RequestType.consultation
      };

      this.requestServiceSubscription = this.requestService.sendRequest(requestData).subscribe((response: DefaultResponseType) => {
        SnackbarErrorUtil.showErrorMessageIfErrorAndThrowError(response, this._snackBar);

        this.popupClose();
        this.requestForm.reset();
        this.dialogRef = this.dialog.open(this.popupThankYou);
        this._snackBar.open(response.message);
      });
    }

    if (this.requestForm.invalid) {
      this.requestForm.markAllAsTouched();
      this._snackBar.open('Заполните необходимые поля');
    }
  }

  popupClose(): void {
    this.dialogRef?.close();
    this.requestForm.markAsUntouched();
    this.requestForm.reset();
  }
}
