var firebaseConfig = {
    apiKey: "AIzaSyDhSzI0u5lsAW_FB2rE-Ya2aktpaiOVtcE",
    authDomain: "smarthacc2019.firebaseapp.com",
    databaseURL: "https://smarthacc2019.firebaseio.com",
    projectId: "smarthacc2019",
    storageBucket: "smarthacc2019.appspot.com",
    messagingSenderId: "333781085726",
    appId: "1:333781085726:web:8aa162a4ae89001962c80f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function MyFunc() {
    walkTheDOM(document.body, function (node) {
        try{ 
            if (node.nodeType === 3) { // Is it a Text node?
                var text = node.data.trim();
                if (text.length > 0) { // Does it have non white-space text content?
                    // process text
                }
            } else {
                node.id = "idhacc" + currid;
                currid++;
            }
        }

        catch {

        }
    });

    setTimeout(() => {
        if(editorMode == 0) {
            // window.removeEventListener("message", receiveMessage);
            // document.removeEventListener('mousemove', onMouseUpdate, false);
            // document.removeEventListener('click', onMouseClick, false);
            // document.removeEventListener('keydown', event => {
            //     keypressed = event.code;
            //     // console.log(keypressed);
            // });
            // document.removeEventListener('keyup', event => {
            //     keypressed = null;
            //     // console.log(keypressed);
            // })
            loadPublished();
        } else {
            //event listeners
            document.addEventListener('mousemove', onMouseUpdate, false);
            document.addEventListener('click', onMouseClick, false);
            document.addEventListener('keydown', event => {
                keypressed = event.code;
                // console.log(keypressed);
            });
            document.addEventListener('keyup', event => {
                keypressed = null;
                // console.log(keypressed);
            });
        }
    }, 500);
}

window.addEventListener("message", receiveMessage, false);

//constants
const dbRef = firebase.database().ref();
let changesRef = null;
// const col1 = document.getElementById('#col1');

//variables
var currid = 0;
var selectedElement = null;
var messageContent = null;
var content = null;
var keypressed = null;
var clickedElement = null;
var editorMode = 0;
var publishedVersion = null;

//parse dom element
function getFakeDomElement(node) {
    const fakeNode = {
        nodeName: node.nodeName,
        nodeType: node.nodeType,
        tagName: node.tagName,
        childNodes: [...node.childNodes].map(child => getFakeDomElement(child)),
        textContent: node.textContent
    }
    if(node.attributes) {
        fakeNode.attributes = [...node.attributes].map(attribute => ({name:attribute.name, value:attribute.value}))
    }
    return fakeNode;
}

//mouse click action
function onMouseClick(event) {
    if(keypressed === 'ControlLeft' || keypressed === 'ControlRight') {
        if (clickedElement != null) {
            if(clickedElement.classList != null && clickedElement.classList.contains("highlight-blue")) {
                clickedElement.classList.remove("highlight-blue");
            }
        }
        clickedElement = selectedElement;
        clickedElement.classList.remove("highlight");
        $(clickedElement).css('outline', 'none');
        var o = getComputedStyle(clickedElement);
        var s = {};
        
        // console.log(o.cssText)

        for(var i = 0; i < o.length; i++){
            s[o[i]]=o.getPropertyValue(o[i]);
        }

        // console.log(s);
        // console.log(clickedElement.childNodes);
        // console.log(clickedElement.innerText, 'inner pt cursi');
        
        let message = {
            inner: clickedElement.childNodes.length > 1 ? clickedElement.innerHTML : clickedElement.innerText,
            outer: clickedElement.outerHTML,
            id: clickedElement.id,
            src: clickedElement.src ? clickedElement.src : "",
            classes: clickedElement.classList.toString(),
            styles: s,
            clientClickX: event.clientX,
            clientClickY: event.clientY,
            pageClickX: event.pageX,
            pageClickY: event.pageY,
            xpath: createXPathFromElement(clickedElement)
        };
        // console.log(message); 
        parent.postMessage(message, "*");

        clickedElement.classList.add("highlight-blue");

        // console.log(createXPathFromElement(clickedElement));
        event.preventDefault();
        event.stopPropagation();
    }
}

//mouse move update
function onMouseUpdate(event) {
    if (selectedElement != null && selectedElement.classList != null && selectedElement.classList.contains("highlight")) {
        selectedElement.classList.remove("highlight");
    }

    selectedElement = document.elementFromPoint(event.clientX, event.clientY); 
    if(selectedElement != null && selectedElement.classList != null) {
        selectedElement.classList.add("highlight");
    }

    // parent.postMessage({
    //     inner: selectedElement.innerHTML,
    //     outer: selectedElement.outerHTML
    // }, "*");
}

//postmessage receive
function receiveMessage(event) {
    var versionKey;

    if(event.data.type === 'editorMode') {
        versionKey = event.data.versionKey;
        editorMode = true;
        firebase.database().ref('/versions/' + versionKey + "/changes")
            .on('value', snap => {
                // console.log(snap);
                // console.log(snap.val(), 'ma-ta');
                const item = snap.val();
            });

        changesRef = dbRef.child('versions/' + versionKey + "/changes");

        changesRef.on("child_added", snap => {
            // console.log(snap.key, 'test');
            let user = snap.val();
            let key = snap.key;
            // console.log(user, 'first check');
            let parsedEl = document.getElementById(user.autoGeneratedID);
            jsonChangesParse(user, parsedEl, versionKey);
        });
    }
}

function loadPublished() {
    let usersRef = firebase.database().ref('versions');
    usersRef.orderByChild('isCurrent').equalTo(true).on("value", function (snapshot) {
        // console.log(snapshot.val());
        snapshot.forEach(data => {
            publishedVersion = data.key;
            subscribeToPublished(data.key);
        });
    });

    // console.log(publishedVersion, "outside test");
}

function subscribeToPublished(versionKey) {
    // console.log(versionKey);
    changesRef = dbRef.child('versions/' + versionKey + "/changes");

    changesRef.on("child_added", snap => {
        // console.log(snap.key, 'test');
        let user = snap.val();
        let key = snap.key;
        // console.log(user, 'first check');
        let parsedEl = document.getElementById(user.autoGeneratedID);
        jsonChangesParse(user, parsedEl, versionKey);
    });
}

function walkTheDOM(node, func) {
    func(node);
    try { node = node.firstChild; } catch {}
    while (node) {
        walkTheDOM(node, func);
        node = node.nextSibling;
    }
}

//parse json
function jsonChangesParse(json, parsedEl, key) {
    if(!json.remove) {
        if(!json.add) {
            if(json.classes.length) {
                let classes = json.classes.split(" ");
            
                let classList = [];
                
                for(let i = 0; i < parsedEl.classList.length; i++) {
                    if(!classes.includes(parsedEl.classList[i])) {
                        parsedEl.classList.remove(parsedEl.classList[i]);
                    }
                }

                for(let i = 0; i < parsedEl.classList.length; i++) {
                    classList.push(parsedEl.classList[i]);
                }

                for(let i = 0; i < classes.length; i++) {
                    if(!classList.includes(classes[i])) {
                        parsedEl.classList.add(classes[i]);
                    }
                }
            }
            // console.log(classes);
            // console.log(parsedEl.classList.length);

            if(parsedEl.localName !== 'img') {
                parsedEl.innerHTML = json.inner;
            } else {
                parsedEl.src = json.src;
            }
            
            if(typeof json.styles === 'string') {
                json.styles = JSON.parse(json.styles);
            }
            Object.keys(json.styles).forEach((key) => {
                // console.log(key, json.styles[key]);
                $(parsedEl).css(key, json.styles[key]);
            });
        } else {
            let newDOMObj;
            // console.log(json.actionData);
            if(json.actionData.type === "1" || json.actionData.type === "2" || json.actionData.type === "3") {
                newDOMObj = htmlToElement(json.actionData.text);
                walkTheDOM(newDOMObj, function (node) {
                    try {
                        if (node.nodeType === 3) { // Is it a Text node?
                            var text = node.data.trim();
                            if (text.length > 0) { // Does it have non white-space text content?
                                // process text
                            }
                        } else {
                            node.id = "idhacc" + currid;
                            currid++;
                        }
                    }
                    catch {

                    }
                });
                // newDOMObj.id = 'idhacc' + currid;
                // currid++;
                // console.log(newDOMObj);
            }

            switch(json.actionData.type) {
                case "1":
                    // console.log('case 1')
                    insertBeforeRef(newDOMObj, parsedEl);
                break;

                case "2":
                    // console.log('case 2')
                    insertAfterRef(newDOMObj, parsedEl);
                break;

                case "3":
                    // console.log('case 3')
                    insertInsideRef(newDOMObj, parsedEl);
                break;

                case "4":
                    // console.log('case 4')
                    addJS(json.actionData.text);
                break;
            }
        }
    } else {
        parsedEl.outerHTML = "";
    }


    // console.log(parsedEl.nodeType);
}

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

function insertAfterRef(newNode, referenceNode) {
    // console.log('crapa');
    try {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
    catch { newNode = null;}
}

function insertBeforeRef(newNode, referenceNode) {
    try{ 
        referenceNode.parentNode.insertBefore(newNode, referenceNode);
    }
    catch{ newNode = null;}
}

function insertInsideRef(newNode, referenceNode) {
    try{
        referenceNode.appendChild(newNode);
    }
    catch {

    }
}

function addJS(jsCode) {
    var s = document.createElement('script');

    s.type = 'text/javascript';
    s.innerText = jsCode;
    document.getElementsByTagName('head')[0].appendChild(s);
}

//create xpath based on nativeElement
function createXPathFromElement(elm) { 
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
        } else if (elm.hasAttribute('class') && elm.localName.toLowerCase() != 'body') { 
            segs.unshift(elm.localName.toLowerCase() + '[@class="' + elm.getAttribute('class') + '"]'); 
        } else { 
            for (var i = 1, sib = elm.previousSibling; sib; sib = sib.previousSibling) { 
                if (sib.localName == elm.localName)  i++; }; 
                segs.unshift(elm.localName.toLowerCase() + '[' + i + ']'); 
        }; 
    }; 
    return segs.length ? '/' + segs.join('/') : null; 
} 

//return nativeElement based on xpath
function lookupElementByXPath(path) {
    // console.log(path, 'check 2');
    var result = document.evaluate(path, document.documentElement, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null); 
    // console.log(result.singleNodeValue, 'check value');
    return  result.singleNodeValue;
} 