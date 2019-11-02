import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-access',
    templateUrl: './access.component.html',
    styleUrls: ['./access.component.css']
})
export class AccessComponent implements OnInit {

    items: Observable<any[]>;

    get property1() {
        return this.itemGroup.get('property1');
    }

    get property2() {
        return this.itemGroup.get('property2');
    }

    itemGroup = new FormGroup({
        property1: new FormControl(''),
        property2: new FormControl('')
    })

    constructor(public db: AngularFireDatabase) {
        this.items = db.list('items').valueChanges();
        this.items.subscribe((res) => {
            console.log(res);
        });
    }  

    ngOnInit() {
    }

    addItem() {
        const itemsRef = this.db.list('items')
        itemsRef.push({
            property1: this.property1.value,
            property2: this.property2.value
        });
    }

}
