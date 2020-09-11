import * as d3 from "d3";
import { Subject } from "rxjs";

export default class ImageHistogram {
  margin = {
    top: 10,
    right: 30,
    bottom: 30,
    left: 20,
    between: 10
  };
  #width = 100;
  #height = 400;

  #histPlotRoot;
  histPlot;
  histPath;
  #colorScaleBarRoot;
  colorScaleBar;
  colorScale;
  x;
  xAxis;
  y;
  yAxis;

  hist;
  histLine;
  histXY;
  brush;
  brushElement;

  rangeChanged = new Subject();
  colorLut;
  #clip;
  #plotWidth;
  #plotHeight;
  #colorBarWidth;
  #colorBarHeight;

  set width(newWidth) {
    this.#width = newWidth;
    this.#plotWidth =
      ((newWidth - this.margin.left - this.margin.right) * 2) / 3;
    this.#colorBarWidth = (newWidth - this.margin.left - this.margin.right) / 3;
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  set height(newHeight) {
    this.#height = newHeight;
    this.#plotHeight = newHeight - this.margin.top - this.margin.bottom;
    this.#colorBarHeight = this.#plotHeight;
  }

  constructor(selector, width = 100, height = 300) {
    this.width = width;
    this.height = height;

    this.selector = selector;
    this.colorScale = d3
      .scaleSequential(d3.interpolateInferno)
      .domain([1, 65123]);

    this._initPlot();

    this._initClip();
    this._initAxes();
    this._initBrush();
    this.initColorBar();
  }

  _initPlot() {
    this.#histPlotRoot = d3
      .select(this.selector)
      .append("svg")
      .attr("width", this.#plotWidth + this.margin.left)
      .attr("height", this.height);

    this.histPlot = this.#histPlotRoot
      .append("g")
      .attr(
        "transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")"
      )
      .attr("width", this.#plotWidth)
      .on("contextmenu", () => {
        d3.event.preventDefault();
      });

    this.histPath = this.histPlot.append("g");
  }

  _initClip() {
    this.#clip = this.histPlot
      .append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", this.#plotWidth)
      .attr("height", this.height);
  }

  _initAxes() {
    this.x = d3
      .scaleLog()
      .domain([1e-10, 100])
      .range([0, this.#plotWidth]);

    this.xAxis = this.histPlot
      .append("g")
      .attr("transform", "translate(0, " + this.#plotHeight + ")")
      .call(d3.axisBottom(this.x));

    // add Y Axis
    this.y = d3
      .scaleLog()
      .domain([1e-10, 100])
      .range([this.#plotHeight, 0]);

    this.yAxis = this.histPlot.append("g").call(d3.axisLeft(this.y));
  }

  _initBrush() {
    this.brush = d3.brushY().extent([
      [0, -this.height / 2],
      [this.#plotWidth, this.height * 1.5]
    ]);

    this.brushElement = this.histPlot
      .append("g")
      .attr("class", "brush")
      .attr("clip-path", "url(#clip)")
      .call(this.brush)
      .call(this.brush.move, [0, this.height]);

    // let brushed = () => {
    // };

    this.brush.on("brush end", () => {
      this._brushed();
    });
  }

  _brushed() {
    let min = this.y.invert(d3.event.selection[1]);
    let max = this.y.invert(d3.event.selection[0]);
    this._updateColorScale(min, max);
  }

  _updateColorScale(min, max) {
    this.colorScale.domain([min, max]);
    this.rangeChanged.next([min, max]);
  }

  initColorBar() {
    this.#colorScaleBarRoot = d3
      .select(this.selector)
      .append("svg")
      .attr(
        "width",
        this.#colorBarWidth + this.margin.right - this.margin.between / 2
      )
      .attr("height", this.height);

    this.colorScaleBar = this.#colorScaleBarRoot
      .append("g")
      .attr(
        "transform",
        "translate(" + this.margin.between + "," + this.margin.top + ")"
      )
      .attr("width", this.#colorBarWidth)
      .attr("height", this.#colorBarHeight)
      .on("contextmenu", () => {
        d3.event.preventDefault();
      });

    let colorScale = d3
      .scaleSequential(d3.interpolateInferno)
      .domain([0, this.#plotHeight]);

    this.colorScaleBar
      .selectAll(".bars")
      .data(d3.range(this.#plotHeight), d => {
        return d;
      })
      .enter()
      .append("rect")
      .attr("class", "bars")
      .attr("y", (d, i) => {
        return this.#plotHeight - i;
      })
      .attr("x", 0)
      .attr("height", 1)
      .attr("width", this.#colorBarWidth)
      .style("fill", function(d) {
        return colorScale(d);
      });
  }

  calculateHistogram(imageData, bins = "sqrt") {
    // find minimum and maximum
    let min = Infinity;
    let max = -Infinity;
    const length = imageData.length;

    for (let i = 0; i < length; i++) {
      if (imageData[i] < min) min = imageData[i];
      else if (imageData[i] > max) max = imageData[i];
    }

    // get histogram
    if (bins === "sqrt") {
      bins = Math.floor(Math.sqrt(length));
    }
    const step = Math.ceil(d3.max([1, Math.sqrt(length) / 200]));
    const binSize = (max - min) / bins;
    const histogram = new Uint32Array(bins).fill(0);

    for (let i = 0; i < imageData.length; i = i + step) {
      histogram[Math.floor((imageData[i] - min) / binSize)]++;
    }

    // calculate bin center positions
    const binCenters = new Array(bins);
    const binOffset = binSize / 2 + min;
    for (let i = 0; i < bins; i++) {
      binCenters[i] = i * binSize + binOffset;
    }

    this.hist = {
      data: histogram,
      binCenters: binCenters,
      min: min,
      max: max,
      binSize: binSize
    };

    return this.hist;
  }

  updateImage(imageData) {
    let t1 = Date.now();
    this.calculateHistogram(imageData);
    console.log(Date.now() - t1);

    this.plotHistogram();
  }

  plotHistogram() {
    this.histXY = [];
    let dataMin = Infinity;
    for (let i = 0; i < this.hist.data.length; i++) {
      if (this.hist.data[i] !== 0 && this.hist.binCenters[i] !== 0) {
        if (this.hist.data[i] < dataMin) {
          dataMin = this.hist.data[i];
        }
        this.histXY.push({ x: this.hist.binCenters[i], y: this.hist.data[i] });
      }
    }

    this.x.domain([dataMin, d3.max(this.hist.data)]);
    this.y.domain([d3.min(this.hist.binCenters), this.hist.max]);
    this._updateAxes();
    this._updateHistogramLine();
  }

  _updateHistogramLine() {
    this.histLine = d3
      .line()
      .x(d => {
        return this.x(d.y);
      })
      .y(d => {
        return this.y(d.x);
      });

    //Create line
    let path = this.histPath.selectAll("path").data([this.histXY]);
    path
      .transition()
      .duration(200)
      .attr("d", this.histLine)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 0.5);
    path
      .enter()
      .append("path")
      .attr("d", this.histLine)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 0.5);
    path.exit().remove();
  }

  calcColorImage(imageArray) {
    let colorImageArray = new Uint8Array(imageArray.length * 3);
    let pos = 0;
    let c;
    this.calcColorLut();
    for (let i = 0; i < imageArray.length; i++) {
      c = this.colorLut[imageArray[i]];
      pos = i * 3;
      colorImageArray[pos] = c[0];
      colorImageArray[pos + 1] = c[1];
      colorImageArray[pos + 2] = c[2];
    }
    return colorImageArray;
  }

  calcColorLut() {
    let min = this.hist.min;
    let max = this.hist.max + 1;
    this.colorLut = new Array(max - min);
    const colorScaleMin = d3.max([
      Math.floor(this.colorScale.domain()[0]),
      min
    ]);
    const colorScaleMax = d3.min([
      Math.floor(this.colorScale.domain()[1]),
      max
    ]);

    const colorMin = this.hexToRgb(this.colorScale(colorScaleMin));
    const colorMax = this.hexToRgb(this.colorScale(colorScaleMax));

    for (let i = 0; i < colorScaleMin; i++) {
      this.colorLut[i] = colorMin;
    }
    for (let i = colorScaleMin; i < colorScaleMax; i++) {
      this.colorLut[i] = this.hexToRgb(this.colorScale(min + i));
    }
    for (let i = colorScaleMax; i < max; i++) {
      this.colorLut[i] = colorMax;
    }
  }

  hexToRgb(hex) {
    let bigint = parseInt(hex.substr(1), 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    return [r, g, b];
  }

  _updateAxes(duration = 500) {
    this.xAxis
      .transition()
      .duration(duration)
      .call(
        d3
          .axisBottom(this.x)
          .ticks(1000)
          .tickFormat(() => "")
      );
    this.yAxis
      .transition()
      .duration(duration)
      .call(
        d3
          .axisLeft(this.y)
          .ticks(20)
          .tickFormat(() => "")
      );
  }

  resize(width, height) {
    this.width = width;
    this.height = height;

    this.#histPlotRoot
      .attr("width", this.#plotWidth + this.margin.left)
      .attr("height", this.height);

    this.histPlot
      .attr("width", this.#plotWidth)
      .attr("height", this.#plotHeight);

    this.x.range([0, this.#plotWidth]);
    this.xAxis.attr("transform", "translate(0, " + this.#plotHeight + ")");
    this.y.range([this.#plotHeight, 0]);
    this.yAxis
      .transition()
      .duration(0)
      .call(
        d3
          .axisLeft(this.y)
          .ticks(20)
          .tickFormat(() => "")
      );

    this.#clip.attr("width", this.#plotWidth).attr("height", this.height);
    this._updateHistogramLine();

    this.brush.extent([
      [0, -this.height / 2],
      [this.#plotWidth, this.height * 1.5]
    ]);

    this.brush.on("brush end", null);
    let newBrushSelection = [
      this.y(this.colorScale.domain()[1]),
      this.y(this.colorScale.domain()[0])
    ];
    this.brushElement.call(this.brush).call(this.brush.move, newBrushSelection);
    this.brush.on("brush end", () => {
      this._brushed();
    });

    this.#colorScaleBarRoot
      .attr(
        "width",
        this.#colorBarWidth + this.margin.right - this.margin.between / 2
      )
      .attr("height", this.height);
    this.colorScaleBar
      .attr("width", this.#colorBarWidth)
      .attr("height", this.#colorBarHeight);

    let colorScaleBars = this.colorScaleBar
      .selectAll(".bars")
      .data(d3.range(this.#plotHeight), d => {
        return d;
      });

    let colorScale = d3
      .scaleSequential(d3.interpolateInferno)
      .domain([0, this.#plotHeight]);

    colorScaleBars
      .transition()
      .duration(0)
      .attr("class", "bars")
      .attr("y", (d, i) => {
        return this.#plotHeight - i;
      })
      .attr("x", 0)
      .attr("height", 1)
      .attr("width", this.#colorBarWidth)
      .style("fill", function(d) {
        return colorScale(d);
      });

    colorScaleBars
      .enter()
      .append("rect")
      .attr("class", "bars")
      .attr("y", (d, i) => {
        return this.#plotHeight - i;
      })
      .attr("x", 0)
      .attr("height", 1)
      .attr("width", this.#colorBarWidth)
      .style("fill", function(d) {
        return colorScale(d);
      });

    colorScaleBars.exit().remove();
  }
}
