import { Component, OnInit, HostListener, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-iframe-test',
    templateUrl: './iframe-test.component.html',
    styleUrls: ['./iframe-test.component.css']
})
export class IframeTestComponent implements OnInit, AfterViewInit {

    selectedItem: ElementRef = new ElementRef<any>(null);
    @ViewChild('frame', {static: false}) frame: ElementRef;
    constructor() { }

    ngAfterViewInit() {
    }
    
    ngOnInit() {
        var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
        var eventer = window[eventMethod];
        var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

        // Listen to message from child window
        eventer(messageEvent, function(e) {
            console.log(e.data);
            if(e.type === 'selectedElement') {
            }
        }, false);
    }
    
    @HostListener('window:mousemove', ["$event"])
    onMouseMove(event): void {
        // this.selectedItem.nativeElement = document.elementFromPoint(event.clientX, event.clientY);
        // if(this.selectedItem.nativeElement instanceof HTMLFrameElement) {
        //     this.selectedItem.nativeElement = this.selectedItem.nativeElement.contentWindow.document.elementFromPoint(event.clientX, event.clientY);
        // }

        // console.log(this.selectedItem.nativeElement);
        this.frame.nativeElement.contentWindow.postMessage({
            // coordX: event.clientX,
            // coordY: event.clientY
            action: "select"
        }, "*");
        
    }

    sendPostMessage() {
    }

}
