import {
      Component,
      ElementRef,
      OnInit,
      ViewChild,
      AfterViewInit,
} from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { debounceTime, switchMap } from 'rxjs';
import { CategoryService } from 'src/app/modules/news/services/category.service';
declare const tinymce: any;
@Component({
      selector: 'app-create-post-content',
      templateUrl: './create-post-content.component.html',
      styleUrls: ['./create-post-content.component.scss'],
})
export class CreatePostContentComponent implements OnInit {
      @ViewChild('uploadFile') uploadFile!: ElementRef;
      dataModel: any;
      faUpload = faUpload;
      imgPreview: any;
      formGroup: any;
      options: any[] = [];
      constructor(
            private formBuilder: FormBuilder,
            public CategoryService: CategoryService
      ) {
            this.formGroup = this.formBuilder.group({
                  title: '',
                  slug: '',
                  avatar: '',
                  sapo: '',
                  content: '',
                  categoryId: '',
            });
      }

      ngOnInit(): void {
            this.formGroup
                  .get('categoryId')
                  .valueChanges.pipe(
                        debounceTime(500),
                        switchMap((value) =>
                              this.CategoryService.getSubCategoryByName(
                                    value || ''
                              )
                        )
                  )
                  .subscribe((data: any) => {
                        this.options = data;
                  });
      }

      formats = {
            custom_format1: {
                  block: 'div',
                  styles: { padding: '0 ' },
            },
            custom_format2: {
                  block: 'div',
                  styles: { padding: '0 120px' },
            },
            custom_format3: {
                  block: 'div',
                  styles: { padding: '0 240px' },
            },
      };
      tinyMCEInit = {
            setup: this.setup,
            height: 800,
            formats: this.formats,
            font_css: '/styles.css',
            extended_valid_elements: 'i[class],span[class]',
            font_size_formats:
                  '8pt 10pt 12pt 14pt 16pt 18pt 20pt 24pt 36pt 48pt 50pt 52pt',
            font_family_formats:
                  'Arial=arial,helvetica,sans-serif; Courier New=courier new,courier,monospace; AkrutiKndPadmini=Akpdmi-n;Noto Serif=Noto Serif;Raleway=Raleway;Berfilem=Berfilem;TikTok=TikTok;',
            content_style:
                  "@import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');@import url('https://fonts.googleapis.com/css2?family=Noto+Serif&display=swap');body {font-family: 'Berfilem';overflow-x: hidden;}",
      };
      uploadAvatar() {
            this.uploadFile.nativeElement.click();
      }
      setup(editor: any) {
            editor.ui.registry.addMenuButton('myCustomToolbarButton', {
                  text: 'Cách lề',
                  fetch: (callback: any) => {
                        const items = [
                              {
                                    type: 'menuitem',
                                    text: '0px',
                                    onAction: () => {
                                          tinymce.activeEditor.formatter.toggle(
                                                'custom_format1'
                                          );
                                    },
                              },
                              {
                                    type: 'menuitem',
                                    text: '120px',
                                    onAction: () => {
                                          tinymce.activeEditor.formatter.toggle(
                                                'custom_format2'
                                          );
                                    },
                              },
                              {
                                    type: 'menuitem',
                                    text: '240px',
                                    onAction: () => {
                                          tinymce.activeEditor.formatter.toggle(
                                                'custom_format3'
                                          );
                                    },
                              },
                        ];
                        callback(items);
                  },
            });
      }
      onChangeFile(event: any): void {
            this.imgPreview = URL.createObjectURL(event.target.files[0]);
      }
      onClick() {
            console.log(this.formGroup.value);
      }
}
