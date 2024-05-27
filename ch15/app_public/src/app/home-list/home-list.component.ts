import { Component, OnInit } from '@angular/core';

export class Location {
  _id: string ='';
  name: string ='';
  distance: number=0;
  address: string='';
  rating: number=0;
  facilities: string[]=[];
}

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent implements OnInit{

  constructor() { }

  name = '항아리보쌈'

  location: Location[] = [{
    _id: '651daabd396d78e30aa6b360',
    name: '항아리보쌈',
    distance: 277.0,
    address: '경기도 안성시 중앙로 318',
    rating: 5,
    facilities: ['Hot drinks', 'Food', 'Premium wifi']
  }, {
    _id: '651cf21d94ee3b3504168214',
    name: '안성초밥집',
    distance: 452.0,
    address: '경기도 안성시 석정동 232-1',
    rating: 4,
    facilities: ['Hot drinks', 'Food', 'Premium wifi']
  }];

  ngOnInit(): void { }
}