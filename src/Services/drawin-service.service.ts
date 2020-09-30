import { Injectable } from '@angular/core';
import { Ellipse } from '../DTO/ellipse';
import { Rectangle } from '../DTO/rectangle';
import { Shape } from '../DTO/shape';
import { Point } from '../point';
import {Line} from '../DTO/Line'


@Injectable({

  providedIn: 'root'

})

export class DrawinServiceService {

  mDown:Boolean
  mousDown$:any
  poly:Subject<Point>
  shapePoly:Subject<Point>
  drawingCanvas
  
  shapeToDraw:Shape
  center:Point
  radius:Point

  constructor(private commService:CommServiceService) {
    this.poly=new Subject<Point>()
    this.shapePoly= new Subject<Point>()
    this.mDown=false
  }

  MousEventManagment(drawingCanvas){

    var mouseDown$ = fromEvent(drawingCanvas, "mousedown");
    var mouseMove$=fromEvent(drawingCanvas, "mousmove");
    var mouseUp$ = fromEvent(drawingCanvas, "mouseup");

    var draw$=mouseDown$.pipe(
      switchMap(_event=>
        fromEvent(this.drawingCanvas.nativeElement,'mousemove').pipe(
          takeUntil(mouseUp$)
        ))
    )
    draw$.subscribe(evt=>this.onDrawFree(evt))
   
    this.poly.pipe(
     buffer(mouseUp$),
   ).subscribe(shapePoly=>{this.createRadiusAndCenter(shapePoly)})
  
  }

  0nDrawFree(evt){
    console.log(evt.movementX+":"+evt.movementY)
    var canvas= this.drawingCanvas.nativeElement
    var rect= canvas.getBoundingClientRect();
    //the place on the canvas
    var xcanvas=evt.clientX-rect.left
    var ycanvas=evt.clientY-rect.top

   //draw the line on the canvas
    var from:Point = new point(Math.floor(xcanvas-evt.movementX),Math.floor(ycanvas-evt.movementY))
    var to:Point = new point(Math.floor(xcanvas),Math.floor(ycanvas))
    var line = new Line(from,to)

    this.poly.next(new Point(xcanvas-evt.movementX, ycanvas-evt.movementy))

  }
    
  onDrawEllipse(ctx1):Shape{

   return this.shapeToDraw.draw(ctx1)

  }

  onDrawRectangle(ctx1):Shape{

   return this.shapeToDraw.draw(ctx1)
  } 
 
  createRadiusAndCenter(shapePoly:Array<Point>):void{
      // calculate the center
     this.center = new Point(0,0)
     center = shapePoly.reduce((acc,pt)=>acc.add(pt))
     center = center.div(shapePoly.length)

     //calculate the radius
     this.radius  = new Point(0,0)
     radius = shapePoly.reduce((acc,pt)=>acc.add(new point(Math.abs(pt.X-center.X),Math.abs(pt.Y-center.Y))))
     radius = radius.div(shapePoly.length) 

  }
   
  setDrawMode(mode:string):Shape
  {
    return this.shapeToDraw=this.createShapeFactory(mode)
  }  

  createShapeFactory(mode:string):Shape{
    if(mode=="Ellipse")
     return this.shapeToDraw=new Ellipse(this.radius,this.Center)
    else if (mode=="Rectangle"){
      return this.shapeToMarker=new Rectangle(this.radius,this.Center)
    }
  }

  /*
    var mouseDown$ = fromEvent(drawingCanvas, "mousedown");
    var mouseMove$=fromEvent(drawingCanvas, "mousmove");
    var mouseUp$ = fromEvent(drawingCanvas, "mouseup");

    // restart counter on every click
    var draw$= mouseDown$.pipe(switchMap(
            evt=>mouseMove.pipe(takeUntil(mouseUp))
            )).subscribe((evt.MousEvent)=>polySubject$.next(evt))

      mouseUp$.subscribe(evt=>consol.log("mouseup"))
      draw$.subscribe(evt=>OnDrawFree(evt))
      draw$.subscribe(mode=>setDrawMode(mode))

      polySubject$.pipe(buffer(mouseUp$)).subscribe(poly=> consol.log("Convert To Shape"))
               
    );*/
}