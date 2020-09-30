import { MarkerLocation } from "./marker-location";

enum shapeType{rectangle, ellipse}

export abstract class Shape {
  
    abstract draw(ctx:any)
    abstract Location():MarkerLocation
    abstract toString()
    abstract bold()
    
}