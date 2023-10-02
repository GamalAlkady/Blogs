import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {MatDialog} from "@angular/material/dialog";
import {TagsService} from "../../tags/tags.service";
import {selectTags} from "../../tags/state/tags.selector";
import {invokedTagsAction} from "../../tags/state/tags.actions";

@Component({
  selector: 'app-list-tags',
  templateUrl: './list-tags.component.html',
  styleUrls: ['./list-tags.component.css']
})
export class ListTagsComponent {

  constructor(
    private store: Store,
    private appStore: Store<AppState>,
    public dialog: MatDialog,
    private tagservices: TagsService) { }

  tags$ = this.store.select(selectTags);

  ngOnInit(): void { this.store.dispatch(invokedTagsAction()); }


  openDialog(){
    this.tags$.forEach(t=>{
      console.log(t)
    })
    // console.log()
  }
}
