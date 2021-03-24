import { Component, DoCheck, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { first } from "rxjs/operators";
import { AuthenticationService } from "../authentication.service";
import { Path } from "../models/path";
import { Language } from "../models/language";
import { Languages } from "../models/languages";
import { UtilsService } from "../utils.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit, DoCheck {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = "";
  languages;
  selectedLanguage: Language;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private translate: TranslateService,
    private utils: UtilsService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.userValue) {
      this.router.navigate([Path.Home]);
    }
  }

  getLanguageList(){
    this.languages = this.utils.languages;
  }
  

  ngOnInit(): void {
    this.getLanguageList();
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService
      .login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
          this.router.navigateByUrl(returnUrl);
        },
        error: (error) => {
          this.error = error;
          this.loading = false;
        },
      });
  }

  setLanguage(selectedLanguage: Language){

    if(selectedLanguage !== undefined){
      this.translate.use(selectedLanguage.value);
      localStorage.setItem("language", selectedLanguage.value);
    }

  }

  ngDoCheck(): void {
    this.setLanguage(this.selectedLanguage);
  }
}
