import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/User";

import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL: string = "http://localhost:8080";

  constructor(private httpClient: HttpClient) {
  }

  login(username: any, password: any): Observable<string> {
    const body = JSON.stringify({
        username: username,
        password: password
      }
    )
    const headers = {'Content-Type': 'application/json'};
    return this.httpClient.post<string>(this.baseURL + "/login", body, {headers});
  }
  register(user: User): Observable<User> {
    const headers = {'Content-Type': 'application/json'};
    return this.httpClient.post<User>(this.baseURL + "/register", user, {headers});
  }

  logOut(userId: number) {
    const headers = {'Content-Type': 'application/json'};
    return this.httpClient.put<number>(this.baseURL + "/logout/" + userId, {headers});
  }
}
