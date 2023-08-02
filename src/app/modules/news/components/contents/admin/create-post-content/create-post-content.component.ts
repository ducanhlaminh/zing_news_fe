import {
      Component,
      ElementRef,
      OnInit,
      ViewChild,
      Input,
      AfterViewInit,
} from '@angular/core';
import myCustomPlugin from './tinymce-plugin/test';
import {
      FormGroup,
      FormControl,
      FormBuilder,
      Validators,
} from '@angular/forms';
import { faL, faUpload } from '@fortawesome/free-solid-svg-icons';
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
export class CreatePostContentComponent implements OnInit, AfterViewInit {
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
                  console.log(123);
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
                  if (result) {
                        this.stepperAvatar.get('avatar').patchValue(result);
                        this.imgPreview = URL.createObjectURL(result);
                  }
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
            if (this.data) {
                  this.stepperTitle.setValue({ title: this.data.title });
                  this.stepperSlug.setValue({ slug: this.data.slug });
                  this.stepperSapo.setValue({ sapo: this.data.sapo });
                  this.stepperAvatar.setValue({ avatar: this.data.avatar });
                  this.stepperCategoryId.setValue({
                        categoryId:
                              this.data.new_articles_categories[0].category.id,
                  });
            }
            this.getOptionCategories();
      }
      ngAfterViewInit(): void {}
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
            tinymce.execCommand('mceInsertContent', false, this.data.content);
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
            formats: this.formats,
            font_css: '/styles.css',
            content_css: '/styles.css',
            font_size_formats:
                  '8pt 10pt 12pt 14pt 16pt 18pt 20pt 24pt 36pt 48pt 50pt 52pt',
            init_instance_callback: this.init_instance_callback,
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
      submitForm(id: any, slug_crc: any) {
            const file = new File(
                  [this.stepperAvatar.value.avatar],
                  `${this.data.slug_crc}.png`,
                  {
                        type: 'image/png',
                  }
            );
            const combinedValues = {
                  ...this.stepperTitle.value,
                  ...this.stepperSapo.value,
                  ...this.stepperSlug.value,
                  ...this.stepperCategoryId.value,
                  avatar: file,
                  ...this.stepperContent.value,
            };

            let formData = new FormData();
            for (const key in combinedValues) {
                  // if (combinedValues.hasOwnProperty(key)) {
                  //       let value = combinedValues[key];
                  //
                  // }
                  formData.append(key, combinedValues[key]);
            }
            formData.append('slug_crc', slug_crc);
            if (this.data) {
                  console.log(formData);

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
            this.stepperCategoryId.setValue({ categoryId: e.value });
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
                        console.log(arrayB);
                  }
            );
      }
}
