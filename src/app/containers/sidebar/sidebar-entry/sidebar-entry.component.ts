import {Component, OnInit, Input, trigger, state, transition, animate, style} from '@angular/core';

@Component({
  selector: 'app-sidebar-entry',
  templateUrl: './sidebar-entry.component.html',
  styleUrls: ['./sidebar-entry.component.css'],
  animations:[
    trigger('visibleTrigger', [
      state('visible', style({ opacity: '1' })),
      transition('void => *', [style({ opacity: '0' }), animate('100ms 100ms')]),
      transition('* => void', [animate('100ms', style({ opacity: '0' }))])
    ])]
})
export class SidebarEntryComponent implements OnInit {

  @Input() name:string;
  @Input() link:string;
  @Input() icon:string;
  @Input() short:boolean=false;
  hover:boolean = false;
  constructor() { }

  ngOnInit() {
  }

  onMouseOver(){

  }

}
