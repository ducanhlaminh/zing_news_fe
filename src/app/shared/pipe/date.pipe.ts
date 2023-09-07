import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
      name: 'datePipe',
})
export class DatePipe implements PipeTransform {
      transform(item: any): any {
            let date = new Date(item.createdAt);
            if (item.status === 1) {
                  return `Đã xuất bản \n
                  ${
                        date.toLocaleDateString('vi-VN') +
                        ' lúc ' +
                        date.toLocaleTimeString('vi-VN')
                  }`;
            } else {
                  return `Lần sửa gần nhất \n
                  ${
                        date.toLocaleDateString('vi-VN') +
                        ' lúc ' +
                        date.toLocaleTimeString('vi-VN')
                  }`;
            }
      }
}
