import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { ILogin } from '../../Interfaces/ILogin';

@Component({
  selector: 'app-login',
  imports: [RouterLink, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email!: FormControl;
  password!: FormControl;
  loginForm!: FormGroup;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initFormControls();
    this.initFormGroup();

    this.route.queryParams.subscribe((params) => {
      console.log('Query Params:', params);
      const token = params['token'];
      const userId = params['userId'];

      if (token && userId) {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        this._authService.updateAuthState();
        const returnUrl = localStorage.getItem('returnUrl');
        this._router.navigateByUrl(returnUrl || '/Home');
        localStorage.removeItem('returnUrl');
      }
    });
  }

  initFormControls(): void {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/),
    ]);
  }

  initFormGroup(): void {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }

  submit() {
    if (this.loginForm.valid) {
      this.signIn(this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();
      Object.keys(this.loginForm.controls).forEach((control) =>
        this.loginForm.controls[control].markAsDirty()
      );
    }
  }

  signIn(data: ILogin): void {
    this._authService.login(data).subscribe({
      next: (response: any) => {
        if (response.success) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.id);
          this._authService.updateAuthState();
          const returnUrl = localStorage.getItem('returnUrl');
          this._router.navigateByUrl(returnUrl || '/templates');
          localStorage.removeItem('returnUrl');
        } else {
          console.error('Login failed:', response.message);
        }
      },
      error: (error) => {
        console.error('Login error:', error);
      },
    });
  }
}