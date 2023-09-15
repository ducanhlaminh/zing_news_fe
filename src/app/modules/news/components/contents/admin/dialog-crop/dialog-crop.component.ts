import {
      Component,
      Inject,
      ViewChild,
      ElementRef,
      OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImageTransform } from 'ngx-image-cropper';
import { faImage } from '@fortawesome/free-solid-svg-icons';
@Component({
      selector: 'app-dialog-crop',
      templateUrl: './dialog-crop.component.html',
      styleUrls: ['./dialog-crop.component.scss'],
})
export class DialogCropComponent implements OnInit {
      @ViewChild('uploadFile') uploadFile!: ElementRef;
      imageChangedEvent: any = '';
      croppedImage: any = '';
      showCropper = false;
      faImage = faImage;
      scale: number = 1;
      transform: ImageTransform = {};
      imageChanged: any;
      constructor(
            public dialogRef: MatDialogRef<DialogCropComponent>,
            @Inject(MAT_DIALOG_DATA) public data: any
      ) {}
      ngOnInit(): void {
            this.imageChangedEvent = this.data.imageCrop;
      }
      imageCropped(event: any) {
            this.imageChanged = event;
            console.log(this.imageChanged);
      }

      uploadImage() {
            this.uploadFile.nativeElement.click();
      }
      zoomOut(value: any) {
            this.scale = value;
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
