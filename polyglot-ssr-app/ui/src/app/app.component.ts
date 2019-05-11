import { Component } from '@angular/core';
import { Thing } from './thing';
import { ThingService } from './thing.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Hello World, Hello World';
  things: Thing[];

  constructor(private thingService: ThingService) { }

  ngOnInit() {
    this.getThings();
  }

  getThings(): void {
    this.thingService.getThings()
      .subscribe(things => this.things = things);
  }
}
