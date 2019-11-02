import { Component, Directive, ElementRef, HostListener, ViewChild} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EditTextDialogComponent } from './edit-text-dialog/edit-text-dialog.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

@Directive({ selector: '[trackScroll]' })
export class AppComponent 
{
  title = "Something"
  selectedElement = null;
  flagConsole = false;

  @ViewChild("customIframe", {static: false}) customIframe;  
  yourIFrameUrl = "https://www.online-image-editor.com/";
  testURL = "http://172.16.77.100:3000/";

  theData = {};

  constructor(public dialog: MatDialog) {}

  Muhaha()
  {
    
  }

  ngAfterViewInit()
  {
    // Create IE + others compatible event handler
    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

    // Listen to message from child window
    eventer(messageEvent, (e) =>
    {
      var contextMenu = document.getElementById("fancyContextMenu"); 
      var customIframe = document.getElementById("customIframe");

      let contextMenuLeft = String(e.data.clientClickX - contextMenu.offsetWidth / 2) + "px";
      let contextMenuTop = String(e.data.clientClickY + customIframe.offsetTop - contextMenu.offsetHeight / 2) + "px";

      if(contextMenuLeft != "NaNpx")
      {
        contextMenu.style.left = contextMenuLeft;
        contextMenu.style.top = contextMenuTop;
        contextMenu.style.display = "block";
      }

      console.log(this.theData);
      this.theData = e.data;
    }, false);
  }

   GetOffset(el)
   {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) 
    {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
  }

  OpenEditTextDialog(): void 
  {
    var self = this;

    const dialogRef = this.dialog.open(EditTextDialogComponent, 
    {
        width: "80%",
        data: { inner : self.theData.inner }
    });

    dialogRef.afterClosed().subscribe(result => 
    {
      console.log('The dialog was closed');
      document.getElementById("fancyContextMenu").style.display = "none";
      console.log(result);
    });
  }
}
