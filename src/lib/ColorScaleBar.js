import * as d3 from "d3";

export default class ColorScaleBar {
  #colorScaleBarRoot;
  colorScaleBar;

  #colorBarHeight;
  #colorBarWidth;
  #margin

  constructor(parent, width, height, margin = [10, 10, 10, 10]) {
    this.#colorScaleBarRoot = d3
      .select(parent)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    this.#margin = margin;
    this.#colorBarHeight = height - margin[1] - margin[3];
    this.#colorBarWidth = width - margin[0] - margin[2];

    this.colorScaleBar = this.#colorScaleBarRoot
      .append("g")
      .attr("transform", "translate(" + margin[0] + "," + margin[1] + ")")
      .attr("width", this.#colorBarWidth)
      .attr("height", this.#colorBarHeight)
      .on("contextmenu", () => {
        d3.event.preventDefault();
      });

    let colorScale = d3
      .scaleSequential(d3.interpolateInferno)
      .domain([0, this.#colorBarHeight]);

    this.colorScaleBar
      .selectAll(".bars")
      .data(d3.range(this.#colorBarHeight), d => {
        return d;
      })
      .enter()
      .append("rect")
      .attr("class", "bars")
      .attr("y", (d, i) => {
        return this.#colorBarHeight - i;
      })
      .attr("x", 0)
      .attr("height", 2)
      .attr("width", this.#colorBarWidth)
      .style("fill", function(d) {
        return colorScale(d);
      });
  }

  resize(width, height) {
    this.#colorBarHeight = height - this.#margin[1] - this.#margin[3];
    this.#colorBarWidth = width - this.#margin[0] - this.#margin[2];

    this.#colorScaleBarRoot
        .attr("width", width)
        .attr("height", height);
    this.colorScaleBar
        .attr("width", this.#colorBarWidth)
        .attr("height", this.#colorBarHeight);

    let colorScaleBars = this.colorScaleBar
        .selectAll(".bars")
        .data(d3.range(this.#colorBarHeight), d => {
          return d;
        });

    let colorScale = d3
        .scaleSequential(d3.interpolateInferno)
        .domain([0, this.#colorBarHeight]);

    colorScaleBars
        .transition()
        .duration(0)
        .attr("class", "bars")
        .attr("y", (d, i) => {
          return this.#colorBarHeight - i;
        })
        .attr("x", 0)
        .attr("height", 2)
        .attr("width", this.#colorBarWidth)
        .style("fill", function(d) {
          return colorScale(d);
        });

    colorScaleBars
        .enter()
        .append("rect")
        .attr("class", "bars")
        .attr("y", (d, i) => {
          return this.#colorBarHeight - i;
        })
        .attr("x", 0)
        .attr("height", 2)
        .attr("width", this.#colorBarWidth)
        .style("fill", function(d) {
          return colorScale(d);
        });

    colorScaleBars.exit().remove();

  }
}
