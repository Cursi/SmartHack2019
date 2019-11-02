import { Component, Directive, ElementRef, HostListener, ViewChild} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

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

  @ViewChild("customIframe", {static: false}) customIframe  
  yourIFrameUrl = "https://www.online-image-editor.com/"
  testURL = "http://172.16.77.100:3000/";

  constructor(private el: ElementRef, public sanitizer: DomSanitizer) {}

  ngAfterViewInit()
  {
    // Create IE + others compatible event handler
    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

    // Listen to message from child window
    eventer(messageEvent,function(e) 
    {
      let contextMenu = document.getElementById("fancyContextMenu"); 

      let contextMenuLeft = String(e.data.clientClickX - contextMenu.offsetWidth / 2) + "px";
      let contextMenuTop = String(e.data.clientClickY + this.customIframe.offsetTop) + "px";

      contextMenu.style.left = contextMenuLeft;
      contextMenu.style.top = contextMenuTop;

      console.log(e.data);
    },false);

    // // using reference to iframe (ifrm) obtained above
    // var win = iframe.contentWindow; // reference to iframe's window
    // // reference to document in iframe
    // var doc = iframe.contentDocument? iframe.contentDocument: iframe.contentWindow.document;
    // // reference to form named 'demoForm' in iframe
    // // var form = doc.getElementById('demoForm');
    // console.log(doc.getElementById("header"));
    // iframe.contentWindow.document.addEventListener("click", () => alert("ha"));
    // iframe.contentWindow.document.addEventListener("click", function(event)
    // {
    //   console.log("ha");
      // document.getElementById("customIframe").contentWindow.document.elementFromPoint(event.clientX,event.clientY).innerHTML+="!";
    // });

    // console.log(document.getElementById("customIframe").contentWindow);
    // document.getElementById("customIframe").contentWindow.document.addEventListener("mousemove", (event) =>
    // {
    //   console.log(event);
    // });
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

  Test()
  {
    // this.customIframe.nativeElement.contentWindow.postMessage
    // (
    //   {
    //     "lala" : "1",
    //     "meh" : 2
    //   }, 
    //   "*"
    // );
    // var y = (x.contentWindow || x.contentDocument);
    // if (y.document)y = y.document;
    // console.log(x.contentWindow);

    // y.body.style.backgroundColor = "red";

    // var iframe = document.getElementById("customIframe");

    // // using reference to iframe (ifrm) obtained above
    // var win = iframe.contentWindow; // reference to iframe's window
    // // reference to document in iframe
    // var doc = iframe.contentDocument ? iframe.contentDocument: iframe.contentWindow.document;
    // // reference to form named 'demoForm' in iframe
    // // var form = doc.getElementById('demoForm');
    // console.log(iframe);
  }

  createXPathFromElement(elm) { 
    var allNodes = document.getElementsByTagName('*'); 
    for (var segs = []; elm && elm.nodeType == 1; elm = elm.parentNode) 
    { 
        if (elm.hasAttribute('id')) { 
                var uniqueIdCount = 0; 
                for (var n=0;n < allNodes.length;n++) { 
                    if (allNodes[n].hasAttribute('id') && allNodes[n].id == elm.id) uniqueIdCount++; 
                    if (uniqueIdCount > 1) break; 
                }; 
                if ( uniqueIdCount == 1) { 
                    segs.unshift('id("' + elm.getAttribute('id') + '")'); 
                    return segs.join('/'); 
                } else { 
                    segs.unshift(elm.localName.toLowerCase() + '[@id="' + elm.getAttribute('id') + '"]'); 
                } 
        } else if (elm.hasAttribute('class')) { 
            segs.unshift(elm.localName.toLowerCase() + '[@class="' + elm.getAttribute('class') + '"]'); 
        } else { 
            for (var i = 1, sib = elm.previousSibling; sib; sib = sib.previousSibling) { 
                if (sib.localName == elm.localName)  i++; }; 
                segs.unshift(elm.localName.toLowerCase() + '[' + i + ']'); 
        }; 
    }; 
    return segs.length ? '/' + segs.join('/') : null; 
}; 

lookupElementByXPath(path) { 
    var evaluator = new XPathEvaluator(); 
    var result = evaluator.evaluate(path, document.documentElement, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null); 
    return  result.singleNodeValue;
} 

  // @HostListener('window:mousemove', ["$event"])
  // onMouseMove(event): void
  // { 
  //   console.log(event.clientX, event.clientY);
  // }    
  //   if (this.selectedElement != null && this.selectedElement.classList != null && this.selectedElement.classList.contains("highlight"))
  //   {
  //     this.selectedElement.classList.remove("highlight");
  //   }

  //   this.selectedElement = document.elementFromPoint(event.clientX, event.clientY); 
  //   if(this.selectedElement != null && this.selectedElement.classList != null) this.selectedElement.classList.add("highlight");
    // var test = this.createXPathFromElement(this.selectedElement);
 
    
    // console.log(this.lookupElementByXPath(test));

    // console.log(this.selectedElement.innerHTML);

    // console

    // if (this.selectedElement != null && this.selectedElement.classList != null)
    // {
    //   if(this.selectedElement.parentElement != null && this.selectedElement.parentElement.classList.contains("highlight"))
    //     this.selectedElement.parentElement.classList.remove("highlight");

    //   this.selectedElement.classList.add("highlight");
      
    //   this.selectedElement.addEventListener("mouseleave", () =>
    //   {
    //     this.selectedElement.classList.remove("highlight");
    //   })
    //   // console.log("OK!");
    // }
    // else console.log("ERROR!");
    // console.log(selectedElement.classList);
    
    // selectedElement.textContent = "HAHA";
    // console.log()
  // }
}