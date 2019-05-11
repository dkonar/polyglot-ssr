import { Component, OnInit, Input } from '@angular/core';
import { Thing } from './thing';

@Component({
  selector: 'app-thing',
  templateUrl: './thing.component.html',
  styleUrls: ['./thing.component.scss']
})
export class ThingComponent implements OnInit {
  @Input() thing: Thing;

  constructor() { }

  ngOnInit() {
  }

}
