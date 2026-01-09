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
  
  if (isAuthenticated) {
    // 1. Si los datos son correctos, decidimos a dónde va según el rol
    if (this.AuthService.isAdmin()) {
      // Caso Camila (admin)
      this.router.navigateByUrl('/admin/contratistas');
    } else {
      // Caso Javier (user corriente)
      this.router.navigateByUrl('/');
    }
  } else {
    // 2. Si el login falla (isAuthenticated es false)
    this.hasError.set(true);
    setTimeout(() => {
      this.hasError.set(false);
    }, 2500);
  }

});
    
  }

}
