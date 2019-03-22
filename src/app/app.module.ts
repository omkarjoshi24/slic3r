import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import * as SolidSvg from '@fortawesome/free-solid-svg-icons';
import * as RegularSvg from '@fortawesome/free-regular-svg-icons';
import { MenubarComponent } from './menubar/menubar.component';
import { CenterPaneComponent } from './center-pane/center-pane.component';
import { BottombarComponent } from './bottombar/bottombar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolButtonComponent } from './toolbar/tool-button/tool-button.component';
import { MenuButtonComponent } from './menubar/menu-button/menu-button.component';
import { BottombarButtonComponent } from './bottombar/bottombar-button/bottombar-button.component';

@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    CenterPaneComponent,
    BottombarComponent,
    ToolbarComponent,
    ToolButtonComponent,
    MenuButtonComponent,
    BottombarButtonComponent
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
    // library.add(SolidSvg, farSquare, farCheckSquare, faStackOverflow, faGithub, faMedium);
  }
}
