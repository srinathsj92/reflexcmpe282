import { Pipe } from '@angular/core';

@Pipe({
    name: 'dotSlice'
})
export class DotSlice  {
    transform(value: string, args: any[]) {

        var start = parseInt(args[0]);
        var end = parseInt(args[1]);

        //TODO: Improve by adding args check
        //if(value && args[0] && args[1]) {
        if(value.length>end){
            return [value.substring(start,end),"..."].join('');
        }
        //}
        return value;
    }
}