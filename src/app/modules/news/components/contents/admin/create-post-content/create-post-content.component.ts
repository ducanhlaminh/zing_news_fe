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
      constructor(
            private formBuilder: FormBuilder,
            public CategoryService: CategoryService,
            private NewService: NewsService,
            public dialog: MatDialog,
            private sanitizer: DomSanitizer
      ) {
            this.formGroup = this.formBuilder.group({
                  title: ['', Validators.required],
                  slug: ['', Validators.required],
                  avatar: [null, Validators.required],
                  sapo: ['', Validators.required],
                  content: ['', Validators.required],
                  categoryId: ['', Validators.required],
            });
      }
      openDialog(): void {
            const dialogRef = this.dialog.open(DialogCropComponent, {
                  data: { srcImg: '' },
            });
            dialogRef.afterClosed().subscribe((result) => {
                  // console.log('The dialog was closed');
                  // this.srcImg = result;
                  console.log(result);
                  tinymce.execCommand(
                        'mceInsertContent',
                        false,
                        `<img src="${result}"/>`
                  );
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
                        icon: 'crop',
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

            height: 800,
            width: 1250,
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
            this.uploadFile.nativeElement.click();
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
            this.formGroup.get('avatar').patchValue(event.target.files[0]);
            this.imgPreview = URL.createObjectURL(event.target.files[0]);
      }
      onClick() {
            console.log(tinymce.activeEditor.getContent());
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
      imageChangedEvent: any = '';
      croppedImage: any = '';
      showCropper = false;
      fileChangeEvent(event: any): void {
            this.imageChangedEvent = event;
      }
      imageCropped(event: any) {
            this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(
                  event.objectUrl
            );
            // this.data.srcImg = event.objectUrl;
            // event.blob can be used to upload the cropped image
      }
      cropperReady(sourceImageDimensions: Dimensions) {
            console.log('Cropper ready', sourceImageDimensions);
      }
      imageLoaded() {
            this.showCropper = true;
            console.log('Image loaded');
      }
}
