import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTagsComponent } from './list-tags/list-tags.component';
import {StoreModule} from "@ngrx/store";
import {tagsReducer} from "./state/tags.reducer";
import {EffectsModule} from "@ngrx/effects";
import {TagsEffects} from "./state/tags.effects";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    ListTagsComponent
  ],
    imports: [
        CommonModule,
        StoreModule.forFeature("myTags", tagsReducer),
        EffectsModule.forFeature([TagsEffects]),
        MatButtonModule,
        RouterModule
    ]
})
export class TagsModule { }
