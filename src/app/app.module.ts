import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EqiupmentEditorComponent } from './eqiupment-editor/eqiupment-editor.component';
import { SimulationOptionsComponent } from './simulation-options/simulation-options.component';

@NgModule({
  declarations: [
    AppComponent,
    EqiupmentEditorComponent,
    SimulationOptionsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
