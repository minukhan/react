class OpeningTimes {
    days: string='';
    opening: string='';
    closing: string='';
    closed: boolean=false;
}

export class Review{
    author: string='';
    rating: number=5;
    reviewText: string='';
}

export class Location {
    _id: string = '';
    name: string = '';
    distance: number = 0;
    address: string = '';
    rating: number = 0;
    facilities: string[] = [''];
    reviews: any[] = [];
    coords: number[] = [0,0];
    openingTimes: OpeningTimes[] = [];
}