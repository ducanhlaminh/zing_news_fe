import { Component } from '@angular/core';
import {
      faPenToSquare,
      faListCheck,
      faNewspaper,
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
      selector: 'app-layout-admin',
      templateUrl: './layout-admin.component.html',
      styleUrls: ['./layout-admin.component.scss'],
})
export class LayoutAdminComponent {
      showFiller = true;
      faPenSquare = faPenToSquare;
      faListCheck = faListCheck;
      faNewspaper = faNewspaper;
      constructor(private toastr: ToastrService) {
            this.showSuccess();
      }
      showSuccess() {
            this.toastr.success('Hello world!', 'Toastr fun!');
      }
}
