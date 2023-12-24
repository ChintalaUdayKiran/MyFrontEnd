import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtClientService {


  constructor(private http: HttpClient) { }

  // Method for user authentication (login)
  public login(request: any): Observable<any> {
    return this.http.post("http://localhost:8080/api/auth/signin", request, {
      responseType: 'text'
    });
  }

  // Method to access a protected endpoint after authentication
  public welcome(token: any): Observable<any> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    return this.http.get("http://localhost:8080/api/auth/helloworld", { headers });
  }

  // Method to sign up a new user
  public signUp(request: any): Observable<any> {
    return this.http.post("http://localhost:8080/api/auth/signup", request);
  }
}
