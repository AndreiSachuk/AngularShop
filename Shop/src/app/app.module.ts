import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CardPageComponent } from './card-page/card-page.component';
import {HTTP_INTERCEPTORS,  HttpClientModule} from "@angular/common/http";
import {QuillModule} from "ngx-quill";
import {AuthInterseptor} from "./shared/auth.interseptor";

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    MainPageComponent,
    ProductPageComponent,
    CardPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    QuillModule.forRoot(),

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthInterseptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
