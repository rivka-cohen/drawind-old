import { Injectable } from '@angular/core';

@Injectable()
export class CommServiceService {

  constructor() { }

  Abstract MousEventManagment(drawingCanvas)
  Abstract 0nDrawFree(evt)
  Abstract onDrawEllipse()
  Abstract onDrawRectangle()
  Abstract createRadiusAndCenter(shapePoly:Array<Point>):void
  Abstract setDrawMode(mode:string):Shape
  Abstract createShapeFactory(mode:string):Shape

}