import { Injectable } from '@angular/core';
import { TextEncoder } from 'text-encoding';
@Injectable() 
export class Global {
public commend;
// public InitializePrinter
//EscCommand
public _EscCommand = (function () {
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
        this.commend =this.ESC + this.commend;// "t"+"19"; 
        this.cutpaper = this.GS + "V" + "\u0001";
        this.whiteblackmode =this.GS + "B" + "\u0001";
        this.leftmargin =this.GS + "L" + "\u0101"  + "\u0101";
        this.bitmap =this.ESC + "*" + "\0"  + "\u01100100"+"\0";
        console.log(this.bitmap)


        
        this.font =this.ESC + 'M0';
        this.linefeed =this.ESC + 'LF';
        this.dots =this.ESC + '4A 20';
        // this.drowbox= this.ESC + 'BD p1,p2,p3,p4';
        console.log(this.commend);
       
        // 1B 40       // Initialize Printer
        // 1B 74 28    // Select Arabic code page 40 (1256 Arabic)
        // E4 D5       // The arabic Text
        // 0A          // Print and line feed
        // 1D 56 42 00 // Select cut mode and cut paper

    }
     _EscCommand.prototype.PrintAndFeedLine = function (verticalUnit) {
         this.ESC = "\u001B";
         if (verticalUnit > 255)
             verticalUnit = 255;
         if (verticalUnit < 0)
             verticalUnit = 0;
         return this.ESC + "J" + String.fromCharCode(verticalUnit);
     };
     _EscCommand.prototype.CutAndFeedLine = function (verticalUnit) {
         console.log('CutAndFeedLine')
         this.ESC = "\u001B";
         if (verticalUnit === void 0) {
             return this.ESC + "V" + 1;
         }
         if (verticalUnit > 255)
             verticalUnit = 255;
         if (verticalUnit < 0)
             verticalUnit = 0;
         return this.ESC + "V" + String.fromCharCode(verticalUnit);
     };
    _EscCommand.prototype.printAndFeedLine = function(verticalUnit) {
        if (verticalUnit > 255) verticalUnit = 255;
        if (verticalUnit < 0) verticalUnit = 0;
        return this.ESC + "J" + String.fromCharCode(verticalUnit);
    };
    _EscCommand.prototype.cutAndFeedLine = function(verticalUnit) {
        if (verticalUnit === void 0) {
          return this.ESC + "V" + 1;
        }
        if (verticalUnit > 255) verticalUnit = 255;
        if (verticalUnit < 0) verticalUnit = 0;
        return this.ESC + "V" + 66 + String.fromCharCode(verticalUnit);
    };
    _EscCommand.prototype.printImage = function(mode, width, height, bitmapArray) {
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
} ());

public Esc = new this._EscCommand();


}