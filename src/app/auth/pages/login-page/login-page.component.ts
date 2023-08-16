import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [],
})
export class LoginPageComponent {
  public authForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  isValidField(field: string): boolean | null {
    return (
      this.authForm.controls[field].errors &&
      this.authForm.controls[field].touched
    );
  }

  getFieldError(field: string): string | null {
    if (!this.authForm.controls[field]) return null;
    return 'Este campo es requerido';
  }

  onLogin(): void {
    if (this.authForm.invalid) {
      this.authForm.markAllAsTouched();
      return;
    }

    this.authService.login({ ...this.authForm.value }).subscribe((user) => {
      this.router.navigate(['/']);
    });
  }
}
