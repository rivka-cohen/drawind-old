import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DrawFreeComponent } from './draw-free/draw-free.component';
import { DrawRectComponent } from './draw-rect/draw-rect.component';
import { DrawEllipseComponent } from './draw-ellipse/draw-ellipse.component';
import { ClearFreeDrawComponent } from './clear-free-draw/clear-free-draw.component';
import { UserFormComponent } from './user-form/user-form.component';
import { MouseEventManamentService } from './mouse-event-manament.service';
import { MessangerServiceService } from './messanger-service.service';
import { OnDrawRectService } from './on-draw-rect.service';
import { OnDrawEllipseService } from './on-draw-ellipse.service';
import { OnDrawFreeService } from './on-draw-free.service';
import { DrawingServiceService } from './drawing-service.service';
import { DrawingComponentComponent } from './drawing-component/drawing-component.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule ],
  declarations: [ AppComponent,  DrawFreeComponent, DrawRectComponent, DrawEllipseComponent, ClearFreeDrawComponent, UserFormComponent, DrawingComponentComponent ],
  bootstrap:    [ AppComponent ],
  providers: [MouseEventManamentService, MessangerServiceService, OnDrawRectService, OnDrawEllipseService, OnDrawFreeService, DrawingServiceService]
})
export class AppModule { }
