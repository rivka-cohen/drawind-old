import {Point} from './Point'

export class Line{
  constructor(public from:Point, public to:Point){}

  draw(ctx:any){
      
      ctx.beginPath();
      ctx.moveTo(this.from.X,this.from.Y)
      ctx.lineTo(this.to.X,this.to.Y)
      ctx.stroke();
  }
}