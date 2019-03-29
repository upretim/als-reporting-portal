import { FormControl } from '@angular/forms';

export function minValueValidator(minValue:number) {
    return { 
        function (control:FormControl){
            let val = control.value;
            if(val<minValue){
              return Promise.resolve({
                  minvalError:{
                      lessThenMin: "test"
                  }
              })
             }
             return Promise.resolve(null);
            } 
        }
}    


export  function greateThanZero (control:FormControl){
    let val = control.value;
    if(val<0){
      return Promise.resolve({
          minvalError:{
              lessThenMin: "test"
          }})
       }
     return Promise.resolve(null);
    }