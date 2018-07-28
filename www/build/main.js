webpackJsonp([0],{

/***/ 125:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 125;

/***/ }),

/***/ 166:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 166;

/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_global__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_html2canvas__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_html2canvas___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_html2canvas__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { TextEncoder } from 'text-encoding';

//import { ESCPOSImage } from '../../providers/ESCPOSImage';
//import { ESCPOSPrinter } from '../../providers/ESCPOSPrinter';

var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, global) {
        this.navCtrl = navCtrl;
        this.global = global;
        this.socketId = null;
        this.win = window;
        this.items = [];
        for (var i = 1; i < 3; i++) {
            this.items.push({
                title1: ' طبق 1 ',
                title2: ' طبق 2 ',
                title3: ' طبق 3 ',
                title4: ' طبق 4 ',
                title5: ' بسم الله الرحمن الرحيم '
            });
        }
    }
    HomePage.prototype.ConnectPrinter = function () {
        var _this = this;
        console.log('test');
        this.win.chrome.sockets.tcp.create(function (createInfo) {
            _this.win.chrome.sockets.tcp.connect(createInfo.socketId, "10.0.0.100", "9100", function (result) {
                console.log(result);
                if (!result) {
                    console.log("connect success!");
                    _this.socketId = createInfo.socketId;
                }
                else {
                    _this.socketId = null;
                }
            });
        });
    };
    HomePage.prototype.getImageData = function (image, opts) {
        if (image.width == 0 && image.height == 0) {
            this.PrintInvoice();
        }
        else {
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
            context.drawImage(image, opts.x, opts.y, opts.width, opts.height, 0, 0, opts.width, opts.height);
            var imgData;
            try {
                imgData = context.getImageData(0, 0, opts.width, opts.height);
            }
            catch (e) {
                throw e;
            }
            return imgData;
        }
    };
    HomePage.prototype.rawPrint = function (socketId, uint8array) {
        this.win.chrome.sockets.tcp.send(socketId, uint8array.buffer, function (result) {
            console.log(result);
            this.global.Esc.InitializePrinter + this.global.Esc.cutpaper;
        });
    };
    HomePage.prototype.useEscPrintImage = function (img) {
        var imageData = this.getImageData(img, 0);
        this.threshold(imageData, '');
        var piexlsData = this.rgbToPixel(imageData.data);
        var width = img.width;
        var height = img.height;
        var printData = this.toEscPrintData(piexlsData, width, height);
        return this.global.Esc.printImage(0, width, height, printData);
    };
    HomePage.prototype.rgbToPixel = function (rgbs) {
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
    };
    HomePage.prototype.threshold = function (image, threshold) {
        if (threshold == void 0) {
            threshold = 128;
        }
        threshold = 128;
        for (var index = 0; index < image.data.length; index += 4) {
            var luminance = (image.data[index] * 0.299) + (image.data[index + 1] * 0.587) + (image.data[index + 2] * 0.114);
            var value = luminance < threshold ? 0 : 255;
            image.data.fill(value, index, index + 3);
        }
    };
    HomePage.prototype.toEscPrintData = function (b, width, height) {
        var n = Math.floor((width + 7) / 8);
        var data = new Array(n * height);
        var mask = 0x01;
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < n * 8; x++) {
                if (x < width) {
                    if ((b[y * width + x] & 0x00ff0000) >> 16 != 0) {
                        data[Math.floor(y * n + x / 8)] |= mask << (7 - x % 8);
                    }
                    else {
                        data[Math.floor(y * n + x / 8)] &= ~mask << (7 - x % 8);
                    }
                }
                else if (x >= width) {
                    data[Math.floor(y * n + x / 8)] |= mask << (7 - x % 8);
                }
            }
        }
        for (var i = 0; i < data.length; i++) {
            data[i] = ~data[i];
        }
        return data;
    };
    HomePage.prototype.PrintInvoice = function () {
        var _this = this;
        this.ConnectPrinter();
        var div = document.getElementById("thehtml");
        var div2 = document.getElementById("viewcanvas");
        var divHeight = div.clientHeight + 10;
        var divWidth = div.clientWidth + 10;
        var options = { allowTaint: true, height: divHeight, width: divWidth };
        __WEBPACK_IMPORTED_MODULE_3_html2canvas__(div, options).then(function (canvas) {
            var imgData = canvas.toDataURL("image/PNG");
            var img = new Image();
            img.src = imgData;
            setTimeout(function () {
                var escCommand = _this.useEscPrintImage(img);
                _this.rawPrint(_this.socketId, escCommand);
            }, 200);
        });
    };
    HomePage.prototype.AddRow = function () {
        this.items.push({ title1: ' طبق 1 ',
            title2: ' طبق 2 ',
            title3: ' طبق 3 ',
            title4: ' طبق 4 ',
            title5: ' بسم الله الرحمن الرحيم ' });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/info/Desktop/test-print-ionic3/src/pages/home/home.html"*/'<ion-header>\n    <ion-navbar>\n      <button ion-button menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n      <ion-title>Home</ion-title>\n    </ion-navbar>\n  </ion-header>\n  \n  <ion-content padding>\n    <h3>Ionic Menu Starter</h3>\n  \n    <p>\n      If you get lost, the <a href="http://ionicframework.com/docs/v2">docs</a> will show you the way.\n    </p>\n    \n    \n    <div id="thehtml" style="width:380px;position: absolute;right: 100%;">\n        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQspbYDtYuNCPTjjaBzoEmUmlHGPqN7VVzyTFKSGXoKc-AG75fc"/>\n      <ion-grid>\n        <ion-row>\n          <ion-col>\n            1 of 3\n          </ion-col>\n          <ion-col>\n            2 of 3\n          </ion-col>\n          <ion-col>\n            3 of 3\n          </ion-col>\n          <ion-col>\n              4 of 4\n          </ion-col>\n          <ion-col>\n                5 of 5\n          </ion-col>\n        </ion-row>\n\n\n        <ion-row *ngFor="let item of items">\n          <ion-col>\n            {{item.title1}}\n          </ion-col>\n          <ion-col>\n            {{item.title2}}\n          </ion-col>\n          <ion-col>\n            {{item.title3}}\n          </ion-col>\n          <ion-col>\n             {{item.title4}}\n            </ion-col>\n            <ion-col>\n              {{item.title5}}\n            </ion-col>\n        </ion-row>\n      </ion-grid>\n    </div>\n    <button ion-button secondary (click)="ConnectPrinter()">Connect</button>\n    <button ion-button secondary (click)="AddRow()">Add Row</button>\n    <button ion-button secondary (click)="PrintInvoice()">Print Invoice</button>\n  \n  </ion-content>\n  '/*ion-inline-end:"/Users/info/Desktop/test-print-ionic3/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_global__["a" /* Global */]])
    ], HomePage);
    return HomePage;
}()); // end of class

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Global; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var Global = /** @class */ (function () {
    function Global() {
        // public InitializePrinter
        //EscCommand
        this._EscCommand = (function () {
            function _EscCommand() {
                this.ESC = "\u001B";
                this.GS = "\u001D";
                this.InitializePrinter = this.ESC + "@";
                this.BoldOn = this.ESC + "E" + "\u0001";
                this.BoldOff = this.ESC + "E" + "\0";
                this.DoubleHeight = this.GS + "!" + "\u0001";
                this.DoubleWidth = this.GS + "!" + "\u0010";
                this.DoubleOn = this.GS + "!" + "\u0011"; // 2x sized text (double-high + double-wide)
                this.DoubleOff = this.GS + "!" + "\0";
                this.PrintAndFeedMaxLine = this.ESC + "J" + "\u00FF"; // 打印并走纸 最大255
                this.TextAlignLeft = this.ESC + "a" + "0";
                this.TextAlignCenter = this.ESC + "a" + "1";
                this.TextAlignRight = this.ESC + "a" + "2";
                this.commend = this.ESC + this.commend; // "t"+"19"; 
                this.cutpaper = this.GS + "V" + "\u0001";
                this.whiteblackmode = this.GS + "B" + "\u0001";
                this.leftmargin = this.GS + "L" + "\u0101" + "\u0101";
                this.bitmap = this.ESC + "*" + "\0" + "\u01100100" + "\0";
                console.log(this.bitmap);
                this.font = this.ESC + 'M0';
                this.linefeed = this.ESC + 'LF';
                this.dots = this.ESC + '4A 20';
                // this.drowbox= this.ESC + 'BD p1,p2,p3,p4';
                console.log(this.commend);
                // 1B 40       // Initialize Printer
                // 1B 74 28    // Select Arabic code page 40 (1256 Arabic)
                // E4 D5       // The arabic Text
                // 0A          // Print and line feed
                // 1D 56 42 00 // Select cut mode and cut paper
            }
            // _EscCommand.prototype.PrintAndFeedLine = function (verticalUnit) {
            //     this.ESC = "\u001B";
            //     if (verticalUnit > 255)
            //         verticalUnit = 255;
            //     if (verticalUnit < 0)
            //         verticalUnit = 0;
            //     return this.ESC + "J" + String.fromCharCode(verticalUnit);
            // };
            // _EscCommand.prototype.CutAndFeedLine = function (verticalUnit) {
            //     console.log('CutAndFeedLine')
            //     this.ESC = "\u001B";
            //     if (verticalUnit === void 0) {
            //         return this.ESC + "V" + 1;
            //     }
            //     if (verticalUnit > 255)
            //         verticalUnit = 255;
            //     if (verticalUnit < 0)
            //         verticalUnit = 0;
            //     return this.ESC + "V" + String.fromCharCode(verticalUnit);
            // };
            _EscCommand.prototype.printAndFeedLine = function (verticalUnit) {
                if (verticalUnit > 255)
                    verticalUnit = 255;
                if (verticalUnit < 0)
                    verticalUnit = 0;
                return this.ESC + "J" + String.fromCharCode(verticalUnit);
            };
            _EscCommand.prototype.cutAndFeedLine = function (verticalUnit) {
                if (verticalUnit === void 0) {
                    return this.ESC + "V" + 1;
                }
                if (verticalUnit > 255)
                    verticalUnit = 255;
                if (verticalUnit < 0)
                    verticalUnit = 0;
                return this.ESC + "V" + 66 + String.fromCharCode(verticalUnit);
            };
            _EscCommand.prototype.printImage = function (mode, width, height, bitmapArray) {
                var xL = Math.floor(((width + 7) / 8) % 256);
                var xH = Math.floor((width + 7) / 8 / 256);
                var yL = Math.floor(height % 256);
                var yH = Math.floor(height / 256);
                var command = new Uint8Array(bitmapArray.length + 8);
                //GS V 0
                command.set([0x1d, 0x76, 0x30, mode & 0x1, xL, xH, yL, yH], 0);
                command.set(bitmapArray, 8);
                return command;
            };
            return _EscCommand;
        }());
        // public _TscCommand = (function() {
        //     function _TscCommand(parameters) {
        //       this.HOME = "HOME\n";
        //       this.CUT = "CUT\n";
        //       this.INITIALPRINTER = "INITIALPRINTER\n";
        //     }
        //     _TscCommand.prototype.sound = function(level, interval) {
        //       return "SOUND " + level + "," + interval + "\n";
        //     };
        //     // X      The x-coordinate of the text
        //     // Y      The y-coordinate of the text
        //     // font      Font name
        //     // 1 English 8 x 12
        //     // 2 English 12 x 20
        //     // 3 English 16 x 24
        //     // 4 English 24 x 32
        //     // 5 English 32 x 48
        //     // 6 English 14 x 19
        //     // 7 English 21 x 27
        //     // 8 English 14 x 25
        //     // TST24.BF2     Traditional Chinese  24 x 24     font
        //     // TSS24.BF2     Simplified Chinese  24 x 24 font (GB)
        //     // K Korean 24 x 24 font
        //     // Rotation 0 90 180 270
        //     // x_multiplication    Horizontal multiplication, up to 10x.Available factors: 1~10 width (point) of true type font. 1 point=1/72 inch.
        //     // y_multiplication    Vertical multiplication, up to 10x. Available factors: 1~10 For true type font, this parameter is used to specify the height (point) of true type font. 1 point=1/72 inch.
        //     _TscCommand.prototype.text = function(
        //       x,
        //       y,
        //       font,
        //       rotation,
        //       x_multiplication,
        //       y_multiplication,
        //       content
        //     ) {
        //       var str =
        //         "TEXT " +
        //         x +
        //         "," +
        //         y +
        //         ',"' +
        //         font +
        //         '",' +
        //         rotation +
        //         "," +
        //         x_multiplication +
        //         "," +
        //         y_multiplication +
        //         ',"' +
        //         content +
        //         '"\n';
        //       return str;
        //     };
        //     //200DPI 1mm=8dots
        //     _TscCommand.prototype.feed = function(dots) {
        //       return "FEED " + dots + "\n";
        //     };
        //     _TscCommand.prototype.print = function(count) {
        //       if (count === void 0) {
        //         count = 1;
        //       }
        //       return "PRINT " + count + "\n";
        //     };
        //     // @param mode  Graphic modes listed below:
        //     // 0: OVERWRITE
        //     // 1: OR
        //     // 2: XOR
        //     _TscCommand.prototype.printImage = function(
        //       x,
        //       y,
        //       width,
        //       heigth,
        //       mode,
        //       bitmapBuffer
        //     ) {
        //       var start =
        //         "BITMAP " +
        //         x +
        //         "," +
        //         y +
        //         "," +
        //         Math.floor((width + 7) / 8) +
        //         "," +
        //         heigth +
        //         "," +
        //         mode +
        //         ",";
        //       start = new TextEncoder("gb18030", {
        //         NONSTANDARD_allowLegacyEncoding: true
        //       }).encode(start);
        //       var end = "\n";
        //       end = new TextEncoder("gb18030", {
        //         NONSTANDARD_allowLegacyEncoding: true
        //       }).encode(end);
        //       var image = new Uint8Array(bitmapBuffer);
        //       var ret = new Uint8Array(start.length + image.length + end.length);
        //       ret.set(start, 0);
        //       ret.set(image, start.length);
        //       ret.set(end, start.length + image.length);
        //       return ret;
        //     };
        //     return _TscCommand;
        //   })();
        this.Esc = new this._EscCommand();
        //public Tsc = new this._TscCommand();
    }
    Global = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], Global);
    return Global;
}());

//# sourceMappingURL=global.js.map

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ListPage = /** @class */ (function () {
    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        for (var i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    ListPage_1 = ListPage;
    ListPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(ListPage_1, {
            item: item
        });
    };
    ListPage = ListPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list',template:/*ion-inline-start:"/Users/info/Desktop/test-print-ionic3/src/pages/list/list.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>List</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n      <ion-icon [name]="item.icon" item-start></ion-icon>\n      {{item.title}}\n      <div class="item-note" item-end>\n        {{item.note}}\n      </div>\n    </button>\n  </ion-list>\n  <div *ngIf="selectedItem" padding>\n    You navigated here from <b>{{selectedItem.title}}</b>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/info/Desktop/test-print-ionic3/src/pages/list/list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]])
    ], ListPage);
    return ListPage;
    var ListPage_1;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(247);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 247:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_list_list__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_web_intent__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_global__ = __webpack_require__(210);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_web_intent__["a" /* WebIntent */], __WEBPACK_IMPORTED_MODULE_9__providers_global__["a" /* Global */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 290:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_list_list__ = __webpack_require__(223);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'List', component: __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */] }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/info/Desktop/test-print-ionic3/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/Users/info/Desktop/test-print-ionic3/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[224]);
//# sourceMappingURL=main.js.map