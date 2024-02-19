import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubcribersService {
  constructor(private afs: AngularFirestore, private toastr: ToastrService) {}

  loadData() {
    return this.afs
      .collection('subcribers')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  deleteData(id: any) {
    this.afs
      .doc(`subcribers/${id}`)
      .delete()
      .then((DocRef) => {
        this.toastr.success('Data Deleted Sucessfully...');
      });
  }
}
