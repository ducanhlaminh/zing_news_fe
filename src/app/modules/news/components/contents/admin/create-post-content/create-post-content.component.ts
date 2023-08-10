import { Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faL, faUpload } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from 'src/app/modules/news/services/category.service';
import { NewsService } from 'src/app/modules/news/services/news.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DialogCropComponent } from '../dialog-crop/dialog-crop.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewComponent } from '../dialog-overview/dialog-overview.component';
import { PreviewContentComponent } from '../preview-content/preview-content.component';
declare const tinymce: any;
@Component({
      selector: 'app-create-post-content',
      templateUrl: './create-post-content.component.html',
      styleUrls: ['./create-post-content.component.scss'],
})
export class CreatePostContentComponent implements OnInit {
      @ViewChild('uploadFile') uploadFile!: ElementRef;
      @Input('data') data: any;

      dataModel: any;
      faUpload = faUpload;
      imgPreview: any;
      formGroup: any;
      options: any[] = [];
      imageCropper: any;
      editable = false;
      previewImg: any;
      srcImg: any;
      optionCategories: any;
      imageUpload: any = [];
      nameImgSelected: any;
      imgSelected: any;

      formDetail: any;
      constructor(
            private formBuilder: FormBuilder,
            public CategoryService: CategoryService,
            private NewService: NewsService,
            public dialog: MatDialog
      ) {
            this.formDetail = this.formBuilder.group({
                  title: ['', Validators.required],
                  slug: ['', Validators.required],
                  sapo: ['', Validators.required],
                  content: ['', Validators.required],
                  categoryId: ['', Validators.required],
                  avatar: ['', Validators.required],
            });
      }
      openDialog(): void {
            const inputElement = document.createElement('input');
            // Thêm thuộc tính type và multiple vào đối tượng thuộc tính của input element
            inputElement.setAttribute('type', 'file');
            inputElement.setAttribute('multiple', 'multiple');
            inputElement.click();
            inputElement.addEventListener('change', (event: any) => {
                  const fileList = event.target.files;
                  this.imageUpload = [...fileList];
                  for (const file of fileList) {
                        const reader = new FileReader();

                        reader.onloadend = () => {
                              const base64String = reader.result;

                              tinymce.execCommand(
                                    'mceInsertContent',
                                    false,
                                    `<img src="${base64String}" name="${file.name}"/>`
                              );
                        };

                        reader.readAsDataURL(file);
                  }
            });
      }
      openDialogSetAvatar(): void {
            const dialogRef = this.dialog.open(DialogCropComponent, {
                  width: '1000px',
                  data: { srcImg: '' },
            });
            dialogRef.afterClosed().subscribe((result) => {
                  if (result) {
                        this.formDetail.get('avatar').patchValue(result);
                        this.imgPreview = URL.createObjectURL(result);
                  }
            });
      }
      openDialogCrop = () => {
            const imageCrop = this.imageUpload.find(
                  (image: any) =>
                        image.name === this.tinyMCEInit.nameImgSelected
            );
            console.log(imageCrop);

            const dialogRef = this.dialog.open(DialogCropComponent, {
                  width: '1000px',
                  height: '500px',
                  data: {
                        imageCrop,
                  },
            });
            dialogRef.afterClosed().subscribe((result: any) => {
                  const reader = new FileReader();

                  reader.onloadend = () => {
                        const base64String = reader.result;
                        this.tinyMCEInit.imgSelected.setAttribute(
                              'src',
                              base64String
                        );
                        this.tinyMCEInit.imgSelected.setAttribute(
                              'width',
                              result.width
                        );
                        this.tinyMCEInit.imgSelected.setAttribute(
                              'height',
                              result.height
                        );
                  };

                  reader.readAsDataURL(result.blob);
            });
      };
      openDialogOverview = () => {
            this.dialog.open(DialogOverviewComponent, {
                  maxWidth: '80vw',
                  maxHeight: '100vh',
                  height: '100%',
                  width: 'fit-content',
            });
      };
      openDialogPreview = () => {
            this.dialog.open(PreviewContentComponent, {
                  maxWidth: '100vw',
                  maxHeight: '100vh',
                  height: '100%',
                  width: '100%',
                  data: {
                        dataHTML: this.formDetail.value.content,
                  },
            });
      };
      ngOnInit(): void {
            tinymce.PluginManager.add('example', (editor: any, url: any) => {
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
                                          text: 'Tiêu chuẩn',
                                          onAction: () => {
                                                tinymce.activeEditor.formatter.toggle(
                                                      'custom_format2'
                                                );
                                          },
                                    },
                              ];
                              callback(items);
                        },
                  });
                  editor.ui.registry.addButton('mycustombutton', {
                        icon: 'image',
                        onAction: () => {
                              // Mở dialog
                              this.openDialog();
                        },
                  });
                  editor.ui.registry.addButton('cropimage', {
                        icon: 'crop',
                        onAction: (e: any) => {
                              console.log(e);

                              // Mở dialog
                              this.openDialogCrop();
                        },
                  });
                  editor.ui.registry.addButton('overview', {
                        icon: 'preview',
                        onAction: (e: any) => {
                              this.openDialogOverview();
                              // Mở dialog
                        },
                  });
                  editor.ui.registry.addButton('preivew', {
                        icon: 'browse',
                        onAction: (e: any) => {
                              this.openDialogPreview();
                        },
                  });
            });
            if (this.data) {
                  this.formDetail.setValue({ ...this.data });
            }
            this.getOptionCategories();
      }
      formats = {
            custom_format1: {
                  block: 'div',
                  styles: { padding: '0 ' },
            },
            custom_format2: {
                  block: 'div',
                  styles: { width: '700px', margin: '0 auto' },
            },
      };
      init_instance_callback = () => {
            tinymce.execCommand('mceInsertContent', false, this?.data?.content);
      };
      tinyMCEInit: any = {
            setup: this.setup,
            height: 700,
            formats: this.formats,
            font_css: '/styles.css',
            content_css: '/styles.css',
            quickbars_image_toolbar: 'cropimage delete',
            font_size_formats:
                  '8pt 10pt 12pt 14pt 16pt 18pt 20pt 24pt 36pt 48pt 50pt 52pt',
            init_instance_callback: this.init_instance_callback,
            font_family_formats:
                  'Arial=arial,helvetica,sans-serif; Courier New=courier new,courier,monospace; AkrutiKndPadmini=Akpdmi-n;Noto Serif=Noto Serif;Raleway=Raleway;Berfilem=Berfilem;TikTok=TikTok;',
            content_style:
                  "@import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');@import url('https://fonts.googleapis.com/css2?family=Noto+Serif&display=swap');body {font-family: 'TikTok';overflow-x: hidden;font-size:18px}",
      };
      setup(editor: any) {
            editor.on('click', (e: any) => {
                  const targetElement = e.target;
                  if (targetElement.tagName === 'IMG') {
                        (this.imgSelected = targetElement),
                              (this.nameImgSelected =
                                    targetElement.getAttribute('name'));
                  }
            });
      }
      uploadAvatar() {
            // this.uploadFile.nativeElement.click();
            this.openDialogSetAvatar();
      }
      blobToFile(blob: any, fileName: any) {
            // Tạo đối tượng File từ Blob
            const file = new File([blob], fileName, { type: blob.type });

            return file;
      }
      onChangeFile(event: any): void {
            this.formDetail.get('avatar').patchValue(event.target.files[0]);
            this.imgPreview = URL.createObjectURL(event.target.files[0]);
      }
      submitForm(id: any, slug_crc: any) {
            const file = new File(
                  [this.formDetail.value.avatar],
                  `${this.data.slug_crc}.png`,
                  {
                        type: 'image/png',
                  }
            );
            const combinedValues = {
                  ...this.formDetail.value,

                  avatar: file,
            };

            let formData = new FormData();
            for (const key in combinedValues) {
                  formData.append(key, combinedValues[key]);
            }
            formData.append('slug_crc', slug_crc);
            if (this.data) {
                  this.NewService.updateArticle(formData, id).subscribe();
            } else {
                  this.NewService.createArticle(formData).subscribe();
            }
      }
      convertObjectToFormData(obj: any): any {
            let formData = new FormData();
            for (const key in obj) {
                  if (obj.hasOwnProperty(key)) {
                        let value = obj[key];
                        if (key === 'avatar') {
                              console.log(obj[key]);
                        }
                        formData.append(key, value);
                  }
            }
            this.NewService.createArticle(formData).subscribe();
      }
      onChangeCate(e: any) {
            this.formDetail.patchValue({ categoryId: e.value });
      }
      getOptionCategories() {
            this.CategoryService.getAllCategoriesByAd().subscribe(
                  (data: any) => {
                        this.CategoryService.categories = data.rows;
                        this.CategoryService.categories.map((item: any) => {
                              item.opened = false;
                        });
                        this.optionCategories = this.CategoryService.categories;
                        const tempArray = this.optionCategories.map(
                              (item: any) => [item, ...item.childCategories]
                        );
                        const arrayB = tempArray.flat();
                        this.optionCategories = arrayB;
                  }
            );
      }
}
