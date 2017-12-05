import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  constructor(translate: TranslateService) {
    translate.setDefaultLang('es');
  }

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
}
