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
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { LoadedImage } from 'ngx-image-cropper';
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
      constructor(
            private formBuilder: FormBuilder,
            public CategoryService: CategoryService,
            private NewService: NewsService,
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
                                          text: '120px',
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
                        onAction: function () {
                              // Mở dialog
                              console.log(1);

                              var dialog = editor.windowManager.open({
                                    title: 'My Dialog',
                                    body: {
                                          type: 'panel',
                                          items: [
                                                {
                                                      type: 'dropzone', // component type
                                                      name: 'dropzone', // identifier
                                                      label: 'Dropzone', // text for the label
                                                },
                                                {
                                                      type: 'htmlpanel', // component type
                                                      html: '<img src="blob:http://localhost:4200/5aa109cf-c170-43a9-b9e7-2e19eec9aa82" alt="" />',
                                                },
                                          ],
                                    },
                                    buttons: [
                                          {
                                                type: 'custom',
                                                text: 'cancel',
                                                name: 'cancel',
                                          },
                                          {
                                                type: 'submit',
                                                text: 'OK',
                                                onSubmit: function () {
                                                      console.log(123);
                                                },
                                          },
                                    ],
                                    onSubmit: function () {
                                          console.log(1234);
                                    },
                                    onChange: (e: any) => {
                                          this.previewImg = URL.createObjectURL(
                                                e.getData().dropzone[0]
                                          );
                                    },
                              });
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
            width: 1400,
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
            console.log(event.target.files[0]);

            this.formGroup.get('avatar').patchValue(event.target.files[0]);
            this.imgPreview = URL.createObjectURL(event.target.files[0]);
      }
      onClick() {
            // console.log(this.formGroup.value.content);
            console.log(tinymce.activeEditor.getContent());
            // this.convertObjectToFormData(this.formGroup.value);
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
      fileChangeEvent(event: any): void {
            console.log(1);

            this.imageChangedEvent = event;
      }
      imageCropped(event: any) {
            this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(
                  event.objectUrl
            );
            // event.blob can be used to upload the cropped image
      }
      imageLoaded(image: LoadedImage) {
            // show cropper
      }
      cropperReady() {
            // cropper ready
      }
      loadImageFailed() {
            // show message
      }
}
