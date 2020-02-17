import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
  }


  hasRequiredError(controlName: string) {
    return this.loginForm.get(controlName)?.getError('required');
  }

  hasEmailError() {
    return this.loginForm.get('email')?.getError('email');
  }

  onSubmit() {
    console.log(this.loginForm);
  }
}
