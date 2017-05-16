import {Component, OnInit, trigger, state, style, transition, animate, AnimationTransitionEvent} from "@angular/core";

@Component({
  selector: 'app-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.css'],
  animations: [
    trigger('panelWidthTrigger', [
      state('expanded', style({width: '240px'})),
      state('collapsed', style({width: '60px'})),
      transition('collapsed => expanded', animate('100ms ease-in')),
      transition('expanded => collapsed', animate('100ms 200ms ease-out'))
    ]),
    trigger('panelPaddingTrigger', [
      state('expanded', style({padding: '0px 0px 0px 240px'})),
      state('collapsed', style({padding: '0px 0px 0px 60px'})),
      transition('collapsed => expanded', animate('100ms ease-in')),
      transition('expanded => collapsed', animate('100ms 200ms ease-out'))
    ])
  ]
})
export class SidebarComponent implements OnInit {

  private smallBar: boolean = true;
  private showText: boolean = false;
  private state: string = 'collapsed';
  constructor() {
  }

  ngOnInit() {

  }

  changeSideBar() {
    this.smallBar = !this.smallBar;
    this.state = this.smallBar ? 'collapsed' : 'expanded';

  }

  smallBarStart(event: AnimationTransitionEvent) {
    if (event.fromState == 'void') {
      return;
    }
    if (event.fromState == 'collapsed') {
      this.showText = false;
    }
    if (event.fromState == 'expanded') {
      this.showText = false;
    }
  }

  smallBarDone(event) {
    if (event.fromState == 'void') {
      return;
    }
    if (event.fromState == 'collapsed') {
      this.showText = true;
    }
    if (event.fromState == 'expanded') {
      this.showText = false;
    }
  }


}
