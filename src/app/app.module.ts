import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

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
    BrowserModule, 
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
