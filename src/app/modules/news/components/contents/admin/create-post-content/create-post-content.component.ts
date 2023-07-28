import {
      Component,
      ElementRef,
      OnInit,
      ViewChild,
      AfterViewInit,
} from '@angular/core';
import myCustomPlugin from './tinymce-plugin/test';
import {
      FormGroup,
      FormControl,
      FormBuilder,
      Validators,
} from '@angular/forms';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { async, debounceTime, switchMap } from 'rxjs';
import { CategoryService } from 'src/app/modules/news/services/category.service';
import { NewsService } from 'src/app/modules/news/services/news.service';
import { CarouselComponent } from '../../../common/carousel/carousel.component';
import { DomSanitizer } from '@angular/platform-browser';
import { Dimensions, ImageCroppedEvent } from 'ngx-image-cropper';
import { LoadedImage } from 'ngx-image-cropper';
import { DialogCropComponent } from '../dialog-crop/dialog-crop.component';
import { MatDialog } from '@angular/material/dialog';
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
      imageCropper: any;
      editable = false;
      previewImg: any;
      srcImg: any;

      stepperTitle: any;
      stepperSlug: any;
      stepperAvatar: any;
      stepperSapo: any;
      stepperContent: any;
      stepperCategoryId: any;
      constructor(
            private formBuilder: FormBuilder,
            public CategoryService: CategoryService,
            private NewService: NewsService,
            public dialog: MatDialog,
            private sanitizer: DomSanitizer
      ) {
            this.stepperTitle = this.formBuilder.group({
                  title: ['', Validators.required],
            });
            this.stepperSlug = this.formBuilder.group({
                  slug: ['', Validators.required],
            });
            this.stepperSapo = this.formBuilder.group({
                  sapo: ['', Validators.required],
            });
            this.stepperAvatar = this.formBuilder.group({
                  avatar: ['', Validators.required],
            });
            this.stepperContent = this.formBuilder.group({
                  content: ['', Validators.required],
            });
            this.stepperCategoryId = this.formBuilder.group({
                  categoryId: ['', Validators.required],
            });
      }
      openDialog(): void {
            const dialogRef = this.dialog.open(DialogCropComponent, {
                  width: '1000px',
                  data: { srcImg: '' },
            });
            dialogRef.afterClosed().subscribe((result) => {
                  console.log(result);
                  tinymce.execCommand(
                        'mceInsertContent',
                        false,
                        `<img src="${result}"/>`
                  );
            });
      }
      openDialogSetAvatar(): void {
            const dialogRef = this.dialog.open(DialogCropComponent, {
                  width: '1000px',
                  data: { srcImg: '' },
            });
            dialogRef.afterClosed().subscribe((result) => {
                  console.log(result);
                  this.stepperAvatar.get('avatar').patchValue(result);
                  this.imgPreview = result;
            });
      }
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
                  return {
                        getMetadata: () => ({
                              name: 'Example plugin',
                              url: 'http://exampleplugindocsurl.com',
                        }),
                  };
            });
            this.stepperCategoryId
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
                  styles: { width: '700px', margin: '0 auto' },
            },
      };
      tinyMCEInit = {
            file_picker_callback: function (
                  callback: any,
                  value: any,
                  meta: any
            ) {
                  var input: any = document.createElement('input');
                  input.setAttribute('type', 'file');
                  input.setAttribute('accept', 'image/*');

                  // Xử lý sự kiện khi người dùng chọn tệp tin
                  input.onchange = function () {
                        var file = input.files[0];
                        var reader = new FileReader();
                        reader.onload = function (e) {
                              var result = e?.target?.result;
                              // Gọi callback với đường dẫn tệp tin đã chọn
                              callback(result);
                        };
                        // Đọc tệp tin dưới dạng dữ liệu URL
                        reader.readAsDataURL(file);
                  };
                  // Kích hoạt sự kiện click trên input để chọn tệp tin
                  input.click();
            },

            height: 700,
            width: 1200,
            formats: this.formats,
            font_css: '/styles.css',
            content_css: '/styles.css',
            font_size_formats:
                  '8pt 10pt 12pt 14pt 16pt 18pt 20pt 24pt 36pt 48pt 50pt 52pt',
            font_family_formats:
                  'Arial=arial,helvetica,sans-serif; Courier New=courier new,courier,monospace; AkrutiKndPadmini=Akpdmi-n;Noto Serif=Noto Serif;Raleway=Raleway;Berfilem=Berfilem;TikTok=TikTok;',
            content_style:
                  "@import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');@import url('https://fonts.googleapis.com/css2?family=Noto+Serif&display=swap');body {font-family: 'TikTok';overflow-x: hidden;font-size:18px}",
      };
      uploadAvatar() {
            // this.uploadFile.nativeElement.click();
            this.openDialogSetAvatar();
      }
      blobToFile(blob: any, fileName: any) {
            // Tạo đối tượng File từ Blob
            const file = new File([blob], fileName, { type: blob.type });

            return file;
      }
      openImageCropper(imageUrl: string, callback: Function) {
            // Mở cửa sổ image cropper với ảnh đầu vào và callback
            const image = new Image();
            image.src = imageUrl;
            image.onload = () => {
                  this.imageCropper = {
                        imageUrl: imageUrl,
                        aspectRatio: 16 / 9, // Tỷ lệ khung cắt
                        resizeToWidth: 600, // Độ rộng ảnh sau khi crop
                        format: 'jpeg',
                        outputType: 'blob',
                        imageCropped: (croppedImage: Blob) => {
                              callback(croppedImage);
                        },
                  };
            };
      }
      onChangeFile(event: any): void {
            this.stepperAvatar.get('avatar').patchValue(event.target.files[0]);
            this.imgPreview = URL.createObjectURL(event.target.files[0]);
      }
      onClick() {
            const combinedValues = {
                  ...this.stepperTitle.value,
                  ...this.stepperSapo.value,
                  ...this.stepperSlug.value,
                  ...this.stepperCategoryId.value,
                  ...this.stepperAvatar.value,
                  ...this.stepperContent.value,
                  // Add more form groups if needed
            };

            console.log(combinedValues);
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
}
