import { Injectable } from '@angular/core';
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';
import { Router } from  "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  loginFlag: boolean= false;
 
  constructor(public  afAuth:  AngularFireAuth, public  router:  Router, private toastr: ToastrService, private ngxService: NgxUiLoaderService) { 
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  //   window.onbeforeunload = function (e) {
  //     window.onunload = function () {
  //             window.localStorage.removeItem('user');
  //     }
  //     return undefined;
  // };   
  }

  async  validateUser(email:  string, password:  string) {
    try {
        await  this.afAuth.auth.signInWithEmailAndPassword(email, password)
        this.toastr.success('Logged in successfully', 'Welcome');
        this.router.navigate(['/home']);

    } catch (error) {
        console.log('Error in login ', error);
        this.toastr.warning('Email id/password do not match, please try again', 'Error');
        this.router.navigate(['/login']);
      }
    }

    async logout(){
      await this.afAuth.auth.signOut();
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
      this.toastr.success('Logged out in successfully', 'Thanks');
  }

  get isLoggedIn(): boolean {
    const  user  =  JSON.parse(localStorage.getItem('user'));
    return  user  !==  null;
}
}
