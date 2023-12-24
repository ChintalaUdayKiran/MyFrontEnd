import {Component} from '@angular/core';
import {JwtClientService} from "../jwt-client.service";

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css'] // Use styleUrls instead of styleUrl
})
export class SecurityComponent {

  authRequest: any = {
    "username": "newUser",
    "password": "newUserPassword"
  }
  response: any = {}

  constructor(private service: JwtClientService) {
  }

  ngOnInit() {
    this.getAccessToken(this.authRequest)
  }

  public getAccessToken(authRequest: any) {
    let res = this.service.login(authRequest);
    res.subscribe(data => this.accessApi(data));
  }

  public accessApi(token: any) {
    let res = this.service.welcome(token)
    res.subscribe(data => this.response = data);
  }
}
