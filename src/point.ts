export class Point {
    constructor(public X:number, public Y:number){}
 
    add(pt:any):any{
       return new Point(this.X+pt.X,this.Y+pt.Y)
     }
    div(demon:number){
        return new Point(this.X/demon,this.Y/demon)
     }
    distanceFrom(pt:any){
      return Math.sqrt(Math.pow(pt.X-this.X,2)+Math.pow(pt.Y-this.Y,2))
     }
}
