import { Component, OnInit, Input} from '@angular/core';
import { Location } from '../home-list/home-list.component';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent implements OnInit {

  @Input() location: Location;

  public googleAPIKey: string = 'AIzaSyAQ95PCUu81dc79ioeVXPIjLGvax0rW06Y';

  constructor() { }

  ngOnInit() {
  }

}