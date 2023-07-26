import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Dimensions } from 'ngx-image-cropper';

@Component({
      selector: 'app-dialog-crop',
      templateUrl: './dialog-crop.component.html',
      styleUrls: ['./dialog-crop.component.scss'],
})
export class DialogCropComponent {
      imageChangedEvent: any = '';
      croppedImage: any = '';
      showCropper = false;
      constructor(
            private sanitizer: DomSanitizer,
            public dialogRef: MatDialogRef<DialogCropComponent>,
            @Inject(MAT_DIALOG_DATA) public data: any
      ) {}
      fileChangeEvent(event: any): void {
            this.imageChangedEvent = event;
      }
      imageCropped(event: any) {
            this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(
                  event.objectUrl
            );
            this.data.srcImg = event.objectUrl;
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
