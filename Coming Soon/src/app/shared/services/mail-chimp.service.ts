import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
interface MailChimpResponse {
  result: string;
  msg: string;
}
@Injectable({
  providedIn: 'root'
})
export class MailChimpService {
  mailChimpUrl:string='https://naimehossain.us19.list-manage.com/subscribe/post-json?u=a0f540633a3a98d24f68f6208&amp;id=027d4411d4&';


  constructor( private http: HttpClient) { }

  postEmail(email){
    const params = new HttpParams()
				.set('EMAIL', email)
				

			const mailChimpUrl = this.mailChimpUrl + params.toString();

      // 'c' refers to the jsonp callback param key. This is specific to Mailchimp
			return this.http.jsonp<MailChimpResponse>(mailChimpUrl, 'c');
		}

 
}
