import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn:BehaviorSubject<boolean>= new BehaviorSubject<boolean>(false);
  isLoggedInGuard: boolean=false;

  constructor(private ofAuth: AngularFireAuth, private toastr: ToastrService , private router : Router) { }

  login(email: any, password: any) {
    this.ofAuth.signInWithEmailAndPassword(email, password).then(loRef => {
      this.toastr.success('Logged In Sucessfully...!!');
      this.loadUser();

      this.loggedIn.next(true);
      this.isLoggedInGuard = true;

      this.router.navigate(['/'])
    }).catch(e => {
      this.toastr.warning(e);
    });
  }

  loadUser(){
    this.ofAuth.authState.subscribe(user =>{
      localStorage.setItem('user', JSON.stringify(user));

    });
  }

  logOut(){
    this.ofAuth.signOut().then(()=>{
      this.toastr.success('User Logged Out SucessFully..!!!');
      localStorage.removeItem('user');

      this.loggedIn.next(false);
      this.isLoggedInGuard = false;


      this.router.navigate(['/login']);
    });
  }

isLoggedIn(){
  return this.loggedIn.asObservable();
}
}
