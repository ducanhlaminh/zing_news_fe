import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
      name: 'datePipe',
})
export class DatePipe implements PipeTransform {
      transform(value: string): any {
            let date = new Date(value);
            return (
                  date.toLocaleDateString('vi-VN') +
                  ' ' +
                  date.toLocaleTimeString('vi-VN')
            );
      }
}
