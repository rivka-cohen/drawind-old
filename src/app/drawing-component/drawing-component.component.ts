import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, interval, Subject } from 'rxjs';
import { Shape } from '../../DTO/shape';
import { DrawinServiceService } from '../../Services/drawin-service.service';
import { Point } from '../point';
import {HttpModule} from '@angular/http';

@NgModule({
  imports:[HttpModule]
})

@Component({
  selector: 'app-drawing-component',
  templateUrl: './drawing-component.component.html',
  styleUrls: ['./drawing-component.component.css'],
  providers:[DrawinServiceService]
})
export class DrawingComponentComponent implements OnInit {
  apiRoot:string="http://httpbin.org"

  @ViewChild('shapeCanvas',{static:false})shapeCanvas:ElementRef;
  @ViewChild('drawingCanvas',{static:false})drawinCanvas:ElementRef;
  @ViewChild('btn',{static:false})btn:ElementRef

  title='DrawingApp'

  mDown:Boolean
  mouseDown$:any
  poly:Subject<Point>
  swichSubject:Subject<Point>
  ping$:any=interval(20000)
 
  mode:string
  shapToDraw:Shape
  subscriber:Array<subscriber>=new Array<subscriber>()

  constructor(private drawingService:DrawinServiceService,private http:HttpClient) { 
    this.poly=new Subject<Point>()
    this.swichSubject=new Subject<Point>()
    this.mDown=false
  
  }

  ngOnInit():void {

    this.subscriber.push(this.drawingService.MousEventManagment.subscribe(
      evt=>this.freeDraw(evt)
    ))
    this.subscriber.push(this.drawingService.onFreeDraw.subscribe(
      evt=>this.freeDraw(evt)
    ))

    this.subscriber.push(this.drawingService.setDrawMode.subscribe(
      mode=>this.selectShape(mode)
    ))
    this.subscriber.push(this.drawingService.onRectDraw.suscribe(
    shape=>this.drawRect(shape)
     ))

    this.subscriber.push(this.drawingService.onEllipseDraw.subscribe(
       shape=>this.drawEllipse(shape)
     ))
  }

  //drawing 
  clearCanvas(){
    var canvas=this.drawingCanvas.nativeElement
    var ctx2=canvas.getContext('2d')
    ctx2.clearRect(0,0,this.drawingCanvas.nativeElement.whidth,this.drawingCanvas.nativeElement.height);
  }


  clearShapeCanvas(){
    var ctx1 = this.shapeCanvas.nativeElement.getContext('2d')
    ctx1.clearRect(0, 0, this.shapeCanvas.nativeElement.width, this.shapeCanvas.nativeElement.height);
  }

  freeDraw(line:Line){
    var ctx2=this.drawinCanvas.nativeElement.getContext('2d')
    line.draw(ctx2)
  }
 
  drawRect(shapToDraw:Shape){
    var ctx1 = this.shapeCanvas.nativeElement.getContext('2d')
    this.drawingService.onDrawRectangle(ctx1)

  }

  drawEllipse(shapToDraw:Shape){
    var ctx1 = this.shapeCanvas.nativeElement.getContext('2d')
    this.drawingService.onDrawEllipse(ctx1)

  }

  ngAfterViewInit(){
    console.log("Hello,Enter your draw")

    //canvas to draw
    this.shapeCanvas.nativeElement.width=800
    this.shapeCanvas.nativeElement.height=1200
  
    this.drawingCanvas.nativeElement.width=800
    this.drawingCanvas.nativeElement.heigth=1200
  }

  selectShape(mode:string){
  
    this.shapToDraw=this.drawingService.setDrawMode(mode)
  }

  selectShape(){
    let url='${this.apiRoot}/getAll'
    this.http.get(url).subscribe(myShape=>setDrawMode(myShape.text()))
  }
}
