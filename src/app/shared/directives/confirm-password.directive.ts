import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validators } from "@angular/forms";

@Directive( {
  selector: '[directiveConfirmPassword]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ConfirmPasswordDirective, multi: true }]
} )
export class ConfirmPasswordDirective implements Validators {
  validate(control: AbstractControl): ValidationErrors | null {
    const password = control.get( 'password' );
    const confirmPassword = control.get( 'confirmPassword' );

    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors( { repeatPassword: true } );
      return { repeatPassword: true };
    }

    return null;
  }
}
