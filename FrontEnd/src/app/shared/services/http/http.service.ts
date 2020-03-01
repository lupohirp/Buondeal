import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/app.models';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../security/authorization.service';
import { EncoderService } from '../encoding/encoder.service';
import { DecoderService } from '../decoding/decoder.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private auth_http_headers = new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('bdealB@sic@uth:bde@l@uth109543'),
      'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  );

  private http_headers = new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  );

  private x_auth_headers = new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  );


  constructor(private _http: HttpClient, private _authorizationService: AuthorizationService, private _encoderService: EncoderService, private _decoderService: DecoderService) { }

  public sendGetReqeust(url: string, params?: Object, isWithToken?: boolean): Observable<any> {

    let request_headers = this.http_headers;

    let queryString = '';
    if (params) {
      queryString = '?';
      Object.keys(params).forEach(function (key, index) {
        queryString += key + '=' + params[key];
        if (index != Object.keys(params).length - 1) {
          queryString += '&';
        }
      });

    }

    if (isWithToken) {
      request_headers = this.x_auth_headers.append('Authorization', 'Bearer ' + this._authorizationService.getToken());
    }

    return this._http.get(url + queryString, { headers: request_headers }).pipe(map(result => JSON.parse(this._decoderService.decodeString(result['message']))));
  }

  public sendPostReqeust(url: string, params?: Object, isWithToken?: boolean): Observable<any> {

    let request_headers = this.http_headers;

    if (isWithToken) {
      request_headers = this.x_auth_headers.append('Authorization', 'Bearer ' + this._authorizationService.getToken());
    }



    return this._http.post(url, this._encoderService.encodeString(JSON.stringify(params)), { headers: request_headers }).pipe(map(result => JSON.parse(this._decoderService.decodeString(result['message']))));
  }

  public sendPutReqeust(url: string, params?: Object, isWithToken?: boolean): Observable<any> {
    let request_headers = this.http_headers;

    if (isWithToken) {
      request_headers = this.x_auth_headers.append('Authorization', 'Bearer ' + this._authorizationService.getToken());
    }

    return this._http.put(url, this._encoderService.encodeString(JSON.stringify(params)), { headers: request_headers }).pipe(map(result => JSON.parse(this._decoderService.decodeString(result['message']))));
  }

  public sendDeleteReqeust(url: string, params?: Object, isWithToken?: boolean): Observable<any> {

    let request_headers = this.http_headers;

    if (isWithToken) {
      request_headers = this.x_auth_headers.append('Authorization', 'Bearer ' + this._authorizationService.getToken());
    }

    let queryString = '';
    if (params) {
      queryString = '?';
      Object.keys(params).forEach(function (key, index) {
        queryString += key + '=' + params[key];
        if (index != Object.keys(params).length) {
          queryString += '&';
        }
      });

    }


    return this._http.delete(url + queryString, { headers: request_headers }).pipe(map(result => JSON.parse(this._decoderService.decodeString(result['message']))));
  }

  // special case for auth
  public sendOAuth2Request(url: string, username: string, password: string): Observable<any> {
    return this._http.post(url, { 'grant_type': 'client_credentials', 'username': username, 'password': password }, { headers: this.auth_http_headers });
  }
}
