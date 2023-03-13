import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component( {
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
} )
export class SignupComponent {
  authForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.authForm = this.fb.group( {
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required]],
      checkbox: [false, [Validators.requiredTrue]]
    } );
  }

  signup(): void {
    if (this.authForm.valid && this.authForm.value.name && this.authForm.value.email && this.authForm.value.password &&
      this.authForm.value.repeatPassword && this.authForm.value.checkbox) {
      alert( 'signup work' );
    }
  }
}
