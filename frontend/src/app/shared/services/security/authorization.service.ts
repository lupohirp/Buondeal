import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/app.models';
import { EncoderService } from '../encoding/encoder.service';
import { DecoderService } from '../decoding/decoder.service';

/**
 *
 * Core Authentication Service that handle
 * all business logic about authorization
 *
 */


@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private user: string;
  private token: string;

  constructor(private cookieService: CookieService, private encoderService: EncoderService, private decoderService: DecoderService) { }

  public getUser(): User {
    if (this.getUserCookie()) {
      return JSON.parse(this.decoderService.decodeString(this.getUserCookie()));
    }
  }

  public setUser(user: User): void {
    this.user = this.encoderService.encodeString(JSON.stringify(user));
  }

  public setToken(token: string): void {
    this.token = this.encoderService.encodeString(token);
  }

  public getToken(): string {
    if (this.getTokenCookie()) {
      return this.decoderService.decodeString(this.getTokenCookie());
    }
  }

  private getUserCookie(): string {
    return this.cookieService.get('buondeal');
  }

  public setUserCookie(): void {
    if (this.user && !this.cookieService.check('buondeal')) {
      this.cookieService.set('buondeal', this.user, 365, '/');
    }
  }

  public deleteCookies(): void {
    this.cookieService.delete('buondeal', '/');
    this.cookieService.delete('bdealak', '/');
  }

  public isAuthenticated(): boolean {
    return (this.cookieService.check('buondeal') && this.cookieService.check('bdealak'));
  }

  public setTokenCookie(): void {
    if (this.token) {
      this.cookieService.set('bdealak', this.token, 365, '/');
    }
  }

  private getTokenCookie(): string {
    return this.cookieService.get('bdealak');
  }
}
