import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router:Router){ }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    console.log("inisde===="+state)
    if(state.url.includes("login")) {
      console.log("inisde====")
      if((localStorage.getItem("isLoggedIn") == 'true' && localStorage.getItem("username"))){
        this.router.navigateByUrl('/dashboard');
        return  false;
      }
      }else{
        if(!(localStorage.getItem("isLoggedIn") =='true' && localStorage.getItem("username"))){
          this.router.navigateByUrl('/login');
          return  false;
      }
    }
   
    return true;
  }
}