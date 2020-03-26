import { Component, OnInit, ViewChild, HostListener, ViewContainerRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatTabChangeEvent, MatTab } from '@angular/material/tabs';
import { AuthorizationService } from 'src/app/shared/services/security/authorization.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  public sidenavOpen = true;
  public links = [
    { name: 'Account Dashboard', href: 'dashboard', icon: 'dashboard' },
    { name: 'Informazioni Account', href: 'information', icon: 'info' },
    { name: 'Indirizzi', href: 'addresses', icon: 'location_on' },
    { name: 'Cronologia Ordini', href: 'orders', icon: 'add_shopping_cart' },
    { name: 'Diventa partner', href: 'become-partner', icon: 'person_add' }
  ];
  constructor(public router: Router, public _viewContainerRef: ViewContainerRef, private _authorizationService: AuthorizationService) { }

  ngOnInit() {
    if (window.innerWidth < 960) {
      this.sidenavOpen = false;
    }

    if (this._authorizationService.getUser() && this._authorizationService.getUser().partner && this._authorizationService.getUser().partner.partner_type) {
      this.links.forEach((value, index) => {
        if (value.name == 'Diventa partner') {
          this.links.splice(index, 1);
          return;
        }
      });
    } else {
      this.links.forEach((value, index) => {
        if (value.name == 'Gestisci il Tuo BuonDeal') {
          this.links.splice(index, 1);
          return;
        }
      });
    }

    const event: MatTabChangeEvent = new MatTabChangeEvent();
    event.tab = new MatTab(this._viewContainerRef);
    event.tab.textLabel = 'Account Dashboard';

    this.onLinkClick(event);
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
  }

  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (window.innerWidth < 960) {
          this.sidenav.close();
        }
      }
    });
  }


  onLinkClick(event: MatTabChangeEvent) {
    const tabTitle = event.tab.textLabel;
    const routerLink = this.links.find(n => n.name == tabTitle).href;

    this.router.navigate(['/account/' + routerLink]);
  }

}
