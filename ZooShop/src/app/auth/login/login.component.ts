import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading = false;
  private loadingSubs: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private uiService: UIService
  ) {
  }

  populateForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  hasRequiredError(controlName: string) {
    return this.loginForm.get(controlName)?.getError('required');
  }

  hasEmailError() {
    return this.loginForm.get('email')?.getError('email');
  }

  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }


  ngOnInit(): void {
    this.loadingSubs = this.uiService.loadingStateChanged$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
    this.populateForm();
  }

  ngOnDestroy(): void {
    if (this.loadingSubs) {
      this.loadingSubs.unsubscribe();
    }
  }
}
