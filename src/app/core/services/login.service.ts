import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  checkUser(username,password){
    return this.http.get(env.apiUrl+`/users?username=${username}&password=${password}`,{
    }).pipe(map(data => {
            return data;
        }));
  }
}
