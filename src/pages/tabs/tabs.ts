import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { ShippingPage } from '../shipping/shipping';
import { HomePage } from '../home/home';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  constructor(translate: TranslateService) {
    // Do it only at root page - it should be OK for now.
    translate.setDefaultLang('zh');
  }

  tab1Root = HomePage;
  tab2Root = ContactPage;
  tab3Root = ShippingPage;
  tab4Root = AboutPage;
}
