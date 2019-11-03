import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService 
{
  versions: Observable<any[]>;
  versionsLength : number;
  // versions = [];

  constructor(public db: AngularFireDatabase) 
  {
    this.versions = db.list('versions').valueChanges();
    this.versions.subscribe((res) => 
    {
      this.versionsLength = res.length;
      console.log(res);
    });

    console.log(this.versions);
  }

  AddVersion(versionName)
  {
    const itemsRef = this.db.list('versions')
    itemsRef.set(String(this.versionsLength++),
    {
      isCurrent: false,
      name: versionName
    });
  }

  EditChange(versionKey, result, theData)
  {
    let obj:any = {};
    this.db.database.ref('versions/' + String(versionKey))
      .on('value', snap => {
        obj = snap.val();
      })

    // console.log(itemsRef, "EditChange", obj);
    console.log(theData);

    let changes = [];
    if(obj.changes === undefined) {
      obj = {
        ...obj,
        changes: changes
      }
    }

    obj.changes.push({
      classes: theData.classes,
      inner: result,
      src: theData.src !== undefined ? theData.src : "",
      styles: theData.styles,
      autoGeneratedID: theData.id
    });

    const itemsRef = this.db.list('versions/');

    itemsRef.set(String(versionKey), obj);
  }
              // {
              //   classes: "class1 class2 classn",
              //   inner: "innerText goes here",
              //   src: "",
              //   styles: 
              //   {
              //     style1: "stuff1",
              //     style2: "stuff2",
              //   },
              //   autoGeneratedID: "idhaccx"
              // },
}
