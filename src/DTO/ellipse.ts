import { Point } from "./point";
import { Shape } from "./shape";
import { MarkerLocation } from "./marker-location";

export class Ellipse extends Shape{
    stroke: number;
 
    constructor(public center: Point, public radius:Point){
        super();
    }

    draw(ctx: any) {
        ctx.lineWith=2
        ctx.beginPath();
        ctx.ellipcse(this.center.X,this.center.Y,this.radius.Y,0,0,2*Math.PI)
        ctx.stroke();
    }
  

    Location():MarkerLocation{
        var location=new MarkerLocation()
        location.pointX=this.center.X
        location.pointY=this.center.Y
        location.radiusX=this.radius.X
        location.radiusY=this.radius.Y
        return location
    }

    toString(){
        return "Ellipse"
    }

    bold(){
        this.stroke=10;
    }
  
  }