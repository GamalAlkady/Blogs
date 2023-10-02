import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { LayoutModule } from "./layout/layout.module";
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from "@ngrx/effects";
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { appReducer } from './store/app.reducer';
import { MatDialogModule } from '@angular/material/dialog';
import {PostsModule} from "./posts/posts.module";
import {ReactiveFormsModule} from "@angular/forms";
import {TagsModule} from "./tags/tags.module";
import {MatButtonModule} from "@angular/material/button";
import {ShowPostComponent} from "./posts/show-post/show-post.component";
import {CommonModule} from "@angular/common";
import {AuthModule} from "./auth/auth.module";

@NgModule({
  declarations: [
    AppComponent,
    ConfirmDeleteComponent,
    ShowPostComponent,
  ],
    imports: [
        BrowserModule,
      CommonModule,
        AppRoutingModule,
        StoreModule.forRoot({myappstate: appReducer}),
        EffectsModule.forRoot({}),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: !isDevMode(), // Restrict extension to log-only mode
            autoPause: true, // Pauses recording actions and state changes when the extension window is not open
            trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
            traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
            connectOutsideZone: true // If set to true, the connection is established outside the Angular zone for better performanc
        }),
        FlexLayoutModule,
        LayoutModule,
        MatDialogModule,
        PostsModule,
      AuthModule,
        TagsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatSlideToggleModule,
        MatIconModule,
        MatSidenavModule,
        HttpClientModule,
        MatButtonModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
