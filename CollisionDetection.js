import * as Gs from './Globals.js';
export default class CollisionDetection {
	static PointInRectangle(point, rect) {
		// return 
	}
	static PointInCircle(point, circle) {
		return Math.hypot(point.x - circle.x, point.y - circle.y) < circle.radius;
	}
  /*static CircleRectangle (circle, rect) {
  	// Needs fixing
    let deltaX = circle.x - Math.max((rect.x - rect.width / 2), Math.min(circle.x, (rect.x + rect.width / 2)));
    let deltaY = circle.y - Math.max((rect.y - rect.width / 2), Math.min(circle.y, (rect.y + rect.height / 2)));
    return (Math.hypot(deltaX, deltaY)) < (circle.radius * circle.radius);
  }*/
  static OffCanvas(position, width = 0, height = 0) {
  	return (position.y - height > Gs.CANVAS_SIZEY ||
    position.x - width > Gs.CANVAS_SIZEX ||
    position.y + height < 0 ||
    position.x + width < 0) 
  }

  static LineInCircle(lineX, circle) {
    // console.log(lineX, circle)
    // console.log((circle.radius + circle.x < lineX && circle.radius - circle.x > lineX))
    // console.log("left", circle.x - circle.radius)
    // console.log("right", circle.x + circle.radius)
    // console.log("linex", lineX)
    return (circle.x + circle.radius > lineX && circle.x - circle.radius < lineX);
  }
}