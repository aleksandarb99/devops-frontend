import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
  code: string = "";
  state: string = "";

  constructor(private route: ActivatedRoute, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.code = params['code'];
      this.state = params['state'];
      
      if (this.code === "" || this.code === undefined || this.state === "" || this.state === undefined) {        
        this.router.navigate(['']);
      } else {
        this.sendPostToTokenEndpoint();
      }      
    });
  }

  sendPostToTokenEndpoint() {
    let oldState = localStorage.getItem("old-state")
    if(this.state !== oldState) {
      throw Error("Invalid state! It appears that someone has intercepted the requests.")
    }
    localStorage.removeItem("old-state")

    this.auth.sendPostToTokenEndpoint(this.code).subscribe(res => {
        this.setToLocalStorage(res)

        this.router.navigate(['']);
    });
  }

  setToLocalStorage(res: any) {
    localStorage.setItem("access_token", res.access_token)
    localStorage.setItem("id_token", res.id_token)
    localStorage.setItem("refresh_token", res.refresh_token)
  }
}

