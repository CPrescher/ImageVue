import * as d3 from "d3";
import { Subject } from "rxjs";

export default class BrushY {
  brush;
  brushElement;
  brushEnded = new Subject();

  constructor(parent, extentX, extentY, position) {
    this.brush = d3.brushY().extent([extentX, extentY]);

    this.brushElement = parent
      .append("g")
      .attr("class", "brush")
      .attr("clip-path", "url(#clip)")
      .call(this.brush)
      .call(this.brush.move, position);
    this._activateEvents();
  }

  resize(extentX, extentY) {
    this.brush.extent([extentX, extentY]);
  }

  select(range, silent = true) {
    if (silent) this._deactivateEvents();
    this.brushElement.call(this.brush).call(this.brush.move, range);
    if (silent) this._activateEvents();
  }

  _activateEvents() {
    this.brush.on("brush end", () => {
      this.brushEnded.next([d3.event.selection[1], d3.event.selection[0]]);
    });
  }

  _deactivateEvents() {
    this.brush.on("brush end", null); //remove listener
  }
}
