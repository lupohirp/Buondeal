
import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { MailChimpService } from '../../../../shared/services/mail-chimp.service';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { Counter } from '../counter.service';


@Component({
  selector: 'app-version1',
  templateUrl: './version1.component.html',
  styleUrls: ['./version1.component.scss'],
  animations: [SharedAnimations]
})
export class Version1Component implements OnInit {

  eventDate = "oct 30 ,2019 23:59:59"
  message: string;
  result: string;
  constructor(
    public timerCounter: Counter, private mailChimp: MailChimpService
  ) { }

  ngOnInit() {
    this.timerCounter.countdown(this.eventDate);
  }

  submitEmailForm(form: NgForm) {

    this.mailChimp.postEmail(form.value.email)
      .subscribe(res => {

        this.message = res.msg;
        this.result = res.result;

      }, err => {

        this.message = err.msg;
        this.result = err.result;

      })
    form.reset();
  }


}
