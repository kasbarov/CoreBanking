import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items,field0: string, field1: string,field2: string, field3: string) {
    if (!items) return [];
    
    return items.filter(i => i.ssn.includes(field0)).filter(i => i.firstName.includes(field1))
                .filter(i => i.email.includes(field2)).filter(i => i.address.includes(field3));


    
    // switch (field0){
    //   case "1": 
          
          

    //   default: 
    //       return items;
    //   }


  }

}
