import { Component } from '@angular/core';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { ValuesService } from './values.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title: string = 'Client App as Example';
  results: string[] = [];

  public constructor(private oauthService: OAuthService,
    private valuesService: ValuesService) {

    this.initializeOAuthService();
    this.loadData();
  }

  initializeOAuthService() {

    this.oauthService.configure({
      redirectUri: window.location.origin,
      clientId: 'c5f8ff2a-582b-4615-a504-2bfa722498af',
      requireHttps: false,
      loginUrl: environment.adfsUrl + '/oauth2/authorize',
      issuer: environment.adfsUrl,
      scope: "openid profile email",
      responseType: 'id_token token',
      oidc: true,
      logoutUrl: environment.adfsUrl +
        '/ls/?wa=wsignoutcleanup1.0&wreply=' + location.protocol +
        '//' + location.hostname + (location.port ? ':' + location.port : ''),
      postLogoutRedirectUri: location.protocol + '//' +
        location.hostname + (location.port ? ':' + location.port : '')
    });

    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.setStorage(localStorage);

    if (!this.oauthService.hasValidAccessToken()) {
      this.oauthService.loadDiscoveryDocumentAndTryLogin()
        .then(() => {
          if (!this.oauthService.hasValidAccessToken()) {
            this.oauthService.initImplicitFlow();
          }
        });
    }
  }

  public loadData() {
    this.valuesService.getValues()
      .subscribe((data: string[]) => this.results = data);
  }

  public get name() {
    let claims: any = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    return claims.unique_name;
  }
}
