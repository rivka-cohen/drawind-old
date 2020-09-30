import { Point } from "./point";
import { Shape } from "./shape";
import { MarkerLocation } from "./marker-location";

export class Rectangle extends Shape{

    private stroke=2
    constructor(public center:Point, public radius:Point){
        super();
    }

    draw(ctx: any) {
        ctx.lineWidth=this.stroke
        ctx.beginPath()
        ctx.rect()
        ctx.stroke();

    }

    Location(): MarkerLocation {
        var location=new MarkerLocation()
        location.pointX=this.center.X
        location.pointY=this.center.Y
        location.radiusX=this.radius.X
        location.radiusY=this.radius.Y
        return location
    }
    toString() {
       return "Rectangle"
    }
    bold() {
        this.stroke=12
    }
    
    
  }