import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";

import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

import { CategoriesType, CategoryName } from "../../../../types/categories.type";
import { RequestService } from "../../services/request.service";
import { RequestRequestType, RequestType } from "../../../../types/request-request.type";
import { DefaultResponseType } from "../../../../types/default-response.type";
import { SnackbarErrorUtil } from "../../utils/snackbar-error.util";
import { CategoryService } from "../../services/category.service";
import { ModalService } from "../../services/modal.service";

@Component( {
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
} )
export class ModalComponent implements OnInit, OnDestroy {
  @ViewChild( 'thankYou' ) popupThankYou!: TemplateRef<ElementRef>;
  isLight: boolean;
  isRequestSubmitted: boolean;
  requestError: boolean;
  requestForm: FormGroup;
  thankYouDialogRef: MatDialogRef<any> | null;
  requestServiceSubscription: Subscription | null;
  categoryServiceSubscription: Subscription | null;
  categories: CategoriesType[] | null;
  timeout: number | null;

  constructor(public dialogRef: MatDialogRef<ModalComponent>,
              private fb: FormBuilder,
              private requestService: RequestService,
              private dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private categoryService: CategoryService,
              private modalService: ModalService) {
    this.requestServiceSubscription = null;
    this.categoryServiceSubscription = null;
    this.thankYouDialogRef = null;
    this.categories = null;
    this.isLight = this.modalService.getIsLight();
    this.isRequestSubmitted = false;
    this.requestError = false;
    this.timeout = null;
    this.requestForm = this.fb.group( {
      service: [CategoryName.freelance, [Validators.required]],
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    } );
  }

  ngOnInit(): void {
    if (!this.isLight) {
      this.requestForm.patchValue( { service: this.modalService.getCategory() } );
    }

    if (!this.modalService.getCategoriesList().length) {
      this.categoryServiceSubscription = this.categoryService.getCategories()
        .subscribe( (data: DefaultResponseType | CategoriesType[]) => {
          SnackbarErrorUtil.showErrorMessageIfErrorAndThrowError( data as DefaultResponseType, this._snackBar );

          this.categories = data as CategoriesType[];
          this.modalService.setCategoriesList( this.categories );
        } );
    }

    if (this.modalService.getCategoriesList().length) {
      this.categories = this.modalService.getCategoriesList();
    }
  }

  ngOnDestroy(): void {
    this.requestServiceSubscription?.unsubscribe();
    this.categoryServiceSubscription?.unsubscribe();
    if (this.timeout) {
      window.clearTimeout( this.timeout );
    }
  }

  requestCallback(): void {
    if (this.requestForm.valid && this.requestForm.value.service &&
      this.requestForm.value.name && this.requestForm.value.phone) {
      const requestData: RequestRequestType = {
        name: this.requestForm.value.name,
        phone: this.requestForm.value.phone,
        type: RequestType.consultation
      };

      if (!this.isLight) {
        requestData.service = this.requestForm.value.service;
        requestData.type = RequestType.order;
      }

      this.requestServiceSubscription = this.requestService.sendRequest( requestData )
        .subscribe( (response: DefaultResponseType) => {
          if (response.error) {
            this.requestError = true;
            this.timeout = window.setTimeout( () => {
              this.requestError = false;
            }, 3500 );
            throw new Error( response.message );
          }

          this.requestError = false;
          this.isRequestSubmitted = true;
        } );
    }

    if (this.requestForm.invalid) {
      this.requestForm.markAllAsTouched();
      this._snackBar.open( 'Заполните необходимые поля' );
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
