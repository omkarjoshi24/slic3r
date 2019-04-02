/**
 * File: /Users/omkarjoshi/Development/slic3r/src/app/app.module.ts
 * Project: slic3r
 * Created Date: Thursday, March 21st 2019, 8:16:57 pm
 * Author: Omkar Joshi
 * -----
 * Last Modified: Mon Apr 01 2019
 * Modified By: Omkar Joshi
 * -----
 * Copyright (c) 2019 Omkar Joshi
 * 
 * <<licensetext>>
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	----------------------------------------------------------
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus,
         faPencilAlt,
         faHandPointLeft,
         faTrashAlt,
         faExpand,
         faArrowLeft,
         faCube,
         faCircle,
         faCompactDisc,
         faExpandArrowsAlt,
         faArrowsAltH,
         faSyncAlt } from '@fortawesome/free-solid-svg-icons';
// import * as RegularSvg from '@fortawesome/free-regular-svg-icons';
import { MenubarComponent } from './menubar/menubar.component';
import { CenterPaneComponent } from './centerpane/centerpane.component';
import { BottombarComponent } from './bottombar/bottombar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolButtonComponent } from './toolbutton/toolbutton.component';

@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    CenterPaneComponent,
    BottombarComponent,
    ToolbarComponent,
    ToolButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(faPlus,
                faPencilAlt,
                faHandPointLeft,
                faTrashAlt,
                faExpand,
                faArrowLeft,
                faCube,
                faCircle,
                faCompactDisc,
                faExpandArrowsAlt,
                faArrowsAltH,
                faSyncAlt);
  }
}
