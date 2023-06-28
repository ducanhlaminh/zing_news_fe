import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-create-post-content',
  templateUrl: './create-post-content.component.html',
  styleUrls: ['./create-post-content.component.scss'],
})
export class CreatePostContentComponent {
  plugin = 'fullscreen';
  dataModel: any;
  tinyMCEInit = {
    height: 800,
    font_css:
      '/src/app/modules/news/components/contents/create-post-content/create-post-content.component.scss',
    font_size_formats:
      '8pt 10pt 12pt 14pt 16pt 18pt 20pt 24pt 36pt 48pt 50pt 52pt',
    font_family_formats:
      'Arial=arial,helvetica,sans-serif; Courier New=courier new,courier,monospace; AkrutiKndPadmini=Akpdmi-n;Noto Serif=Noto Serif;Raleway=Raleway;Poppins=Poppins;',
    content_style:
      "@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');@import url('/src/assets/fonts/DesignerVN-Poppins-ExtraBold.ttf');@import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');@import url('https://fonts.googleapis.com/css2?family=Noto+Serif&display=swap');body {font-family: 'Poppins'; margin: 0px 110px;overflow-x: hidden;}",
  };
  onClick() {
    console.log(this.dataModel);
  }
  setup(editor: any) {
    editor.ui.registry.addButton('myCustomToolbarButton', {
      text: 'My Custom Button',
      onAction: function () {
        alert('Button clicked!');
      },
    });
  }
}
