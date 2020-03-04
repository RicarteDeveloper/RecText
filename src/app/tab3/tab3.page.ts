import { Component } from '@angular/core';
import { NavController, ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import * as Tesseract from 'tesseract.js'

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {

  selectedImage: string;
  imageText: string;

  constructor(
    private camera: Camera,
    private actionSheetCtrl: ActionSheetController) {

  }

  async selectSource() {
    let actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Galería',
          handler: () => {
            this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        }, {
          text: 'Cámara',
          handler: () => {
            this.getPicture(this.camera.PictureSourceType.CAMERA);
          }
        }, {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  getPicture(sourceType: PictureSourceType) {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: sourceType,
      allowEdit: true,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then((imageData) => {
      this.selectedImage = `data:image/jpeg;base64,${imageData}`;
    });
  }

  recognizeImage() {
    Tesseract.recognize(this.selectedImage).then(res => {
      this.imageText = res.data.text;
    }, reject => {
      console.log('Error -->' + JSON.stringify(reject));
    });

  }
}
