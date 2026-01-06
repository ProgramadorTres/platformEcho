import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.html',
})
export class LoginPageComponent {
  fb = inject(FormBuilder);
  hasError = signal(false);
  isPosting = signal(false);

  router = inject(Router);        //para routear

  AuthService = inject(AuthService);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]] //validaciones del front deberian ser semejantes
  });

  onSubmit() {

    //console.log("Le entra");

    if (this.loginForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 3500);
      return;
    }

    const { email, password } = this.loginForm.value;

    //console.log({ email, password });

    this.AuthService.login(email!, password!).subscribe((isAuthenticated) => {
      if (isAuthenticated){
        this.router.navigateByUrl('/');
        return ;
      }

      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2500);
    });
  }

}
