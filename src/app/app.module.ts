import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EqiupmentEditorComponent } from './eqiupment-editor/eqiupment-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    EqiupmentEditorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
