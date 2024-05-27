import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mostRecentFirst'
})
export class MostRecentFirstPipe implements PipeTransform {

  private compare(a:any,b:any){
    const createdA = a.createdOn;
    const createdB = b.createdOn;

    let comparison = 1;
    if(createdA>createdB){
      comparison = -1;
    }
    return comparison;
  }
  transform(reviews: any[]): any[] {
    if (reviews && reviews.length){
      return reviews.sort(this.compare);
    }
    return [];
  }

}
