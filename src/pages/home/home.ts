import { Component } from '@angular/core';
import { NavController, Img } from 'ionic-angular';
import { Global } from '../../providers/global';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public win:any;
  public socketId = null;
  public commend;
  public myimg;
  public img_width;
  public img_height;
  icons: string[];
  items: Array<{title1: string, title2: string, title3: string, title4: string, title5: string}>;

  constructor(public navCtrl: NavController,public global:Global) {
    this.win=window;
    
    this.items = [];
    for (let i = 1; i < 3; i++) {
      this.items.push({
        title1:  ' example 1 ',
        title2:  ' example 2 ',
        title3:  ' example 3 ',
        title4 : ' example 4 ',
        title5 : ' example 5 '
      });
    }
  }


  ConnectPrinter(){
    console.log('test')
    this.win.chrome.sockets.tcp.create(createInfo=>{
        this.win.chrome.sockets.tcp.connect(createInfo.socketId,"10.0.0.100","9100",(result)=>{
          console.log(result);
          if (!result) {
                console.log("connect success!");
                this.socketId = createInfo.socketId;
              } else {
                this.socketId = null;
            }
        });
    });
  }



  

  


  getImageData(image, opts) {
    if(image.width == 0 && image.height == 0)
    {
      this.PrintInvoice();
    }
    else
    {
    opts = opts || {};
    opts.x = opts.x || 0;
    opts.y = opts.y || 0;
    opts.width = typeof opts.width === "number" ? opts.width : image.width;
    opts.height = typeof opts.height === "number" ? opts.height : image.height;
    console.log("new opts", opts);
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    canvas.width = opts.width;
    canvas.height = opts.height;
    context.drawImage(
      image,
      opts.x,
      opts.y,
      opts.width,
      opts.height,
      0,
      0,
      opts.width,
      opts.height
    );
    var imgData;
    try {
      imgData = context.getImageData(0, 0, opts.width, opts.height);
    } catch (e) {
      throw e;
    }
  
    return imgData;
    }
  }

  rawPrint(socketId, uint8array) {
    this.win.chrome.sockets.tcp.send(socketId, uint8array.buffer, function (result) {
      console.log(result);
      this.global.Esc.InitializePrinter+this.global.Esc.cutpaper;
    });
  }
  useEscPrintImage(img) {
    var imageData = this.getImageData(img, 0);
    this.threshold(imageData,'');
    var piexlsData = this.rgbToPixel(imageData.data);
    var width = img.width;
    var height = img.height;
    var printData = this.toEscPrintData(piexlsData, width, height);
    return this.global.Esc.printImage(0, width, height, printData);
  }

  rgbToPixel(rgbs) {
    var piexlsData = [];
    for (var index = 0; index < rgbs.length; index += 4) {
      var R = rgbs[index];
      var G = rgbs[index + 1];
      var B = rgbs[index + 2];
      var A = rgbs[index + 3];
      var dot = (A << 24) + (R << 16) + (G << 8) + B;
      piexlsData.push(dot);
    }
    return piexlsData;
  }

  threshold(image, threshold) {
   
    if (threshold == void 0) {
      threshold = 128;
    }
    threshold = 128;
    for (var index = 0; index < image.data.length; index += 4) {
      var luminance = (image.data[index] * 0.299) + (image.data[index + 1] * 0.587) + (image.data[index + 2] * 0.114);
      var value = luminance < threshold ? 0 : 255;
      image.data.fill(value, index, index + 3);
    }
  }

  

  toEscPrintData(b, width, height) {
    var n = Math.floor((width + 7) / 8);
    var data = new Array(n * height);
    var mask = 0x01;
    for (var y = 0; y < height; y++) {
      for (var x = 0; x < n * 8; x++) {
        if (x < width) {
          if ((b[y * width + x] & 0x00ff0000) >> 16 != 0) {
            data[Math.floor(y * n + x / 8)] |= mask << (7 - x % 8);
          } else {
            data[Math.floor(y * n + x / 8)] &= ~mask << (7 - x % 8);
          }
        } else if (x >= width) {
          data[Math.floor(y * n + x / 8)] |= mask << (7 - x % 8);
        }
      }
    }
    for (var i = 0; i < data.length; i++) {
      data[i] = ~data[i];
    }
    return data;
  }



  PrintInvoice(){
    this.ConnectPrinter();
    const div = document.getElementById("thehtml");
    const div2 = document.getElementById("viewcanvas");
    const divHeight = div.clientHeight; // calculate div height
    const divWidth = div.clientWidth; // calculate div width
    // allowTaint this to allow outsource image url 
    const options = {allowTaint : true,height :divHeight , width : divWidth  };
    html2canvas(div,options).then((canvas)=>{
      let imgData = canvas.toDataURL("image/PNG");
      var img = new Image();
      img.src = imgData;
      setTimeout(() => {
        var escCommand = this.useEscPrintImage(img);
        this.rawPrint(this.socketId, escCommand);
      }, 200);
    });  
  }

  AddRow(){
    this.items.push(
    { 
        title1:  ' example 1 ',
        title2:  ' example 2 ',
        title3:  ' example 3 ',
        title4 : ' example 4 ',
        title5 : ' example 5 ' 
    });
  }


}  // end of class

