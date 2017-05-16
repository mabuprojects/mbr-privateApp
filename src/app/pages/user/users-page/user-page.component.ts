import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-users-page',
  templateUrl: 'user-page.component.html',
  styles:[`.small-button-list{top: -7px;margin-right: 4px;}
           .small-button-top{top:16px;margin-right: 4px;}`]
})
export class UserPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
