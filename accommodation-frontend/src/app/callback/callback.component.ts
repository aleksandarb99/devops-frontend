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

  constructor(private route: ActivatedRoute, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let code = params['code'];      
      if (code === "" || code === undefined) {        
        this.router.navigate(['']);
      } else {
        this.sendPostToTokenEndpoint(code);
      }      
    });
  }

  sendPostToTokenEndpoint(code: string) {
    let codeVerifier = localStorage.getItem("code_verifier")
    if(codeVerifier === null || codeVerifier === "") {
      throw Error("Code verifier does not exist.")
    }
    localStorage.removeItem("code_verifier")

    this.auth.sendPostToTokenEndpoint(code, codeVerifier).subscribe(res => {
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

