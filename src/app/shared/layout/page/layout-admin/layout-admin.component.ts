import { Component } from '@angular/core';
import {
      faPenToSquare,
      faListCheck,
      faNewspaper,
} from '@fortawesome/free-solid-svg-icons';
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
}
