import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {registersReducer} from "./register/state/registers.reducer";
import {RegistersEffects} from "./register/state/registers.effects";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature("register", registersReducer),
    EffectsModule.forFeature([RegistersEffects]),
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    RouterModule,
  ]
})
export class AuthModule { }
