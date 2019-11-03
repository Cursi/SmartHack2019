import {
  Component,
  Directive,
  ElementRef,
  HostListener,
  ViewChild
} from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { EditTextDialogComponent } from "./edit-text-dialog/edit-text-dialog.component";
import { AngularFireDatabase } from "@angular/fire/database";
import { Observable } from "rxjs";
import { AddVersionDialogComponent } from "./add-version-dialog/add-version-dialog.component";
import { FirebaseService } from "./firebase.service";
import { EditClassDialogComponent } from "./edit-class-dialog/edit-class-dialog.component";
import { EditStylesDialogComponent } from "./edit-styles-dialog/edit-styles-dialog.component";
import { EditImageDialogComponent } from "./edit-image-dialog/edit-image-dialog.component";
import { AddResourceDialogComponent } from "./add-resource-dialog/add-resource-dialog.component";
import { RemoveResourceDialogComponent } from "./remove-resource-dialog/remove-resource-dialog.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
@Directive({ selector: "[trackScroll]" })
export class AppComponent {
  selectedElement = null;
  flagConsole = false;

  @ViewChild("customIframe", { static: false }) customIframe;

  theData: any = {};
  atribut = "";
  currentVersionIndex: number;

  constructor(
    public dialog: MatDialog,
    public db: AngularFireDatabase,
    private firebaseService: FirebaseService
  ) {}

  Publish() {
    let usersRef = this.db.database.ref("versions");
    var self = this;
    this.firebaseService.PublishVersion(this.atribut);

    usersRef
      .orderByChild("isCurrent")
      .equalTo(true)
      .on("value", function(snapshot) {
        snapshot.forEach(data => {
          if (data.key !== String(self.atribut)) {
            self.firebaseService.UnpublishVersion(data.key);
          }
        });
      });
  }

  VersionSelected(i) {
    document.getElementById("fancyContextMenu").style.display = "none";
    this.currentVersionIndex = i;
    this.testVar = false;
    setTimeout(() => {
      this.testVar = true;
    }, 50);
  }

  testVar = true;

  PostEditorSignal() {
    this.customIframe.nativeElement.focus();

    if (
      this.currentVersionIndex != null &&
      this.currentVersionIndex != undefined
    ) {
      this.customIframe.nativeElement.contentWindow.postMessage(
        {
          type: "editorMode",
          versionKey: this.currentVersionIndex
        },
        "*"
      );
    }
  }

  ngAfterViewInit() {
    var eventMethod = window.addEventListener
      ? "addEventListener"
      : "attachEvent";
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

    eventer(
      messageEvent,
      e => {
        if (
          this.currentVersionIndex != null &&
          this.currentVersionIndex != undefined
        ) {
          var contextMenu = document.getElementById("fancyContextMenu");
          var customIframe = document.getElementById("customIframe");

          let contextMenuLeft =
            String(e.data.clientClickX - contextMenu.offsetWidth / 2) + "px";
          let contextMenuTop =
            String(
              e.data.clientClickY +
                customIframe.offsetTop -
                contextMenu.offsetHeight / 2
            ) + "px";

          if (contextMenuLeft != "NaNpx") {
            contextMenu.style.left = contextMenuLeft;
            contextMenu.style.top = contextMenuTop;
            contextMenu.style.display = "block";
          }

          this.theData = e.data;
        }
      },
      false
    );
  }

  GetOffset(el) {
    var _x = 0;
    var _y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      _x += el.offsetLeft - el.scrollLeft;
      _y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return { top: _y, left: _x };
  }

  OpenEditTextDialog(): void {
    var self = this;

    const dialogRef = this.dialog.open(EditTextDialogComponent, {
      width: "80%",
      data: { inner: self.theData.inner }
    });

    dialogRef.afterClosed().subscribe(result => {
      try {
        this.firebaseService.EditChange(
          this.currentVersionIndex,
          result,
          this.theData,
          "inner"
        );
      } catch {}

      document.getElementById("fancyContextMenu").style.display = "none";
      this.customIframe.nativeElement.focus();
    });
  }

  OpenEditClassDialog(): void {
    var self = this;

    const dialogRef = this.dialog.open(EditClassDialogComponent, {
      width: "80%",
      data: { classes: self.theData.classes }
    });

    dialogRef.afterClosed().subscribe(result => {
      try {
        this.firebaseService.EditChange(
          this.currentVersionIndex,
          result,
          this.theData,
          "classes"
        );
      } catch {}

      document.getElementById("fancyContextMenu").style.display = "none";
      this.customIframe.nativeElement.focus();
    });
  }

  OpenEditStylesDialog(): void {
    var self = this;

    const dialogRef = this.dialog.open(EditStylesDialogComponent, {
      width: "80%",
      data: { styles: self.theData.styles }
    });

    dialogRef.afterClosed().subscribe(result => {
      try {
        this.firebaseService.EditChange(
          this.currentVersionIndex,
          result,
          this.theData,
          "styles"
        );
      } catch {}

      document.getElementById("fancyContextMenu").style.display = "none";
      this.customIframe.nativeElement.focus();
    });
  }

  OpenEditImageDialog(): void {
    var self = this;

    const dialogRef = this.dialog.open(EditImageDialogComponent, {
      width: "80%",
      data: { src: self.theData.src }
    });

    dialogRef.afterClosed().subscribe(result => {
      try {
        this.firebaseService.EditChange(
          this.currentVersionIndex,
          result,
          this.theData,
          "src"
        );
      } catch {}

      document.getElementById("fancyContextMenu").style.display = "none";
      this.customIframe.nativeElement.focus();
    });
  }

  OpenAddVersionDialog(): void {
    const dialogRef = this.dialog.open(AddVersionDialogComponent, {});

    dialogRef.afterClosed().subscribe(result => {});
  }

  RemoveKebab(): void {
    try {
      this.firebaseService.EditChange(
        this.currentVersionIndex,
        null,
        this.theData,
        "remove kebab"
      );
    } catch {}

    document.getElementById("fancyContextMenu").style.display = "none";
    this.customIframe.nativeElement.focus();
  }

  OpenAddResourceDialog(): void {
    var self = this;

    const dialogRef = this.dialog.open(AddResourceDialogComponent, {
      width: "80%"
    });

    dialogRef.afterClosed().subscribe(result => {
      try {
        this.firebaseService.EditChange(
          this.currentVersionIndex,
          result,
          this.theData,
          "add"
        );
      } catch {}

      document.getElementById("fancyContextMenu").style.display = "none";
      this.customIframe.nativeElement.focus();
    });
  }

  OpenRemoveResourceDialog(): void {
    const dialogRef = this.dialog.open(RemoveResourceDialogComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.RemoveKebab();
    });
  }

  RefreshPage() {
    window.location.reload();
  }
}
