import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Dimensions, ImageTransform, base64ToFile } from 'ngx-image-cropper';
import { faImage } from '@fortawesome/free-solid-svg-icons';
@Component({
      selector: 'app-dialog-crop',
      templateUrl: './dialog-crop.component.html',
      styleUrls: ['./dialog-crop.component.scss'],
})
export class DialogCropComponent {
      @ViewChild('uploadFile') uploadFile!: ElementRef;
      imageChangedEvent: any = '';
      croppedImage: any = '';
      showCropper = false;
      faImage = faImage;
      scale: number = 1;
      transform: ImageTransform = {};
      constructor(
            private sanitizer: DomSanitizer,
            public dialogRef: MatDialogRef<DialogCropComponent>,
            @Inject(MAT_DIALOG_DATA) public data: any
      ) {}
      fileChangeEvent(event: any): void {
            this.imageChangedEvent = event;
      }
      imageCropped(event: any) {
            console.log(event);

            this.data.srcImg = event.blob;
      }

      uploadImage() {
            this.uploadFile.nativeElement.click();
      }
      zoomOut(value: any) {
            this.scale = value;
            console.log(typeof this.scale.toFixed(1));

            this.transform = {
                  ...this.transform,
                  scale: this.scale,
            };
      }
      changeValue(e: any) {
            if (e > this.scale) {
                  this.zoomIn(e);
            } else {
                  this.zoomOut(e);
            }
      }
      zoomIn(value: number) {
            this.scale = value;
            this.transform = {
                  ...this.transform,
                  scale: parseFloat(this.scale.toFixed(1)),
            };
      }
}
