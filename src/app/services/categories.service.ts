import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private afs: AngularFirestore, private toastr: ToastrService) { }

  saveData(data: any) {
    this.afs.collection('categories').add(data).then(docRef => {
      console.log(docRef);
      this.toastr.success('Data Inserted Sucessfully!!');

    })
      .catch(err => { console.log(err) })
  }
  
  loadData() {
   return this.afs.collection('categories').snapshotChanges().pipe(
      map(actions => {
       return  actions.map(a => {

          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return{id,data} 

        })
      })
    )
  }

  updateData( id:any, EditData:any){
this.afs.doc(`categories/${id}`).update(EditData).then(DocRef => {
  this.toastr.success('Data Updated Sucessfully...');
   })
  }

  deleteData (id:any) {
    this.afs.doc(`categories/${id}`).delete().then(DocRef => {
      this.toastr.success('Data Deleted Sucessfully...');

    })
  }

}










//!! Demo Samples  to check that query is inserted in firebase database!!

// //Level 2
//       //this.afs.doc(`categories/${docRef.id}`).collection('subcategories').add(subCategoryData)

//       this.afs.collection('categories').doc(docRef.id).collection('subcategories').add(subCategoryData).then(docRef1 => {
//         console.log(docRef1);
//       })

//       //Level 3
//       //this.afs.doc(`categories/${docRef.id}/subcategories/${docRef.id}`).collection('subsubcategories').add(subCategoryData)


//       this.afs.collection('categories').doc(docRef.id).collection('subcategories').doc(docRef.id).collection('subsubcategories').add(subCategoryData).then(docRef2 => {
//         console.log('Second Level Sub Category Saved Sucessfully!!');
//       })