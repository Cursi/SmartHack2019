import { Component } from '@angular/core';
import { Directive, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Directive({ selector: '[trackScroll]' })
export class AppComponent {
    
  title = "Something;"
  constructor(private el: ElementRef) {}

  @HostListener('document:mousemove', ["$event"])
  onMouseMove(event): void 
  { 
    console.log(document.elementFromPoint(event.screenX, event.screenY));
  }
}
