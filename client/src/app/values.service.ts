import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValuesService {

  serviceUrl: string = environment.serviceUrl + '/api/values';

  constructor(private http: Http,
    private oauthService: OAuthService) {

  }

  getAuthHeader() {
    return new Headers({
      "Authorization": "Bearer " + this.oauthService.getAccessToken()
    });
  }


  getValues() {
    if (this.oauthService.hasValidAccessToken()) {
      return this.http.get(this.serviceUrl, { headers: this.getAuthHeader() })
        .pipe(
          map(res => res.json() as string[])
        );
    } else {
      return of(null);
    }
  }
}
