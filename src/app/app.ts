import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';


interface MapView {
  x: number;
  y: number;
  width: number;
  height: number;
}


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  @ViewChild('mapSvg')
  mapSvg!: ElementRef<SVGSVGElement>;


  /*
   * This is our default camera.
   *
   * It is deliberately slightly larger than
   * the island so the entire island is visible
   * when the page first opens.
   */
  private readonly initialView: MapView = {
    x: 51.5,
    y: 22,
    width: 19,
    height: 21
  };


  mapView: MapView = {
    ...this.initialView
  };


  private isDragging = false;

  private activePointerId: number | null = null;

  private lastPointerX = 0;
  private lastPointerY = 0;


  /*
   * Angular uses this string as the SVG viewBox.
   */
  get viewBox(): string {

    return `
      ${this.mapView.x}
      ${this.mapView.y}
      ${this.mapView.width}
      ${this.mapView.height}
    `;

  }


  /*
   * ZOOM
   */

  zoomIn(): void {
    this.zoomBy(0.8);
  }


  zoomOut(): void {
    this.zoomBy(1.25);
  }


  resetMap(): void {

    this.mapView = {
      ...this.initialView
    };

  }


  onWheel(event: WheelEvent): void {

    event.preventDefault();

    if (event.deltaY < 0) {

      this.zoomBy(0.88);

    } else {

      this.zoomBy(1.12);

    }

  }


  private zoomBy(factor: number): void {

    const currentWidth = this.mapView.width;

    let newWidth =
      currentWidth * factor;


    /*
     * Prevent ridiculous zoom levels.
     */
    const minimumWidth = 5;

    const maximumWidth =
      this.initialView.width;


    newWidth = Math.max(
      minimumWidth,
      Math.min(
        maximumWidth,
        newWidth
      )
    );


    /*
     * If we're completely zoomed out,
     * return to the original camera.
     */
    if (newWidth >= maximumWidth) {

      this.resetMap();

      return;

    }


    const scale =
      newWidth /
      currentWidth;


    const newHeight =
      this.mapView.height * scale;


    /*
     * Find the center of the current camera.
     */
    const centerX =
      this.mapView.x +
      this.mapView.width / 2;


    const centerY =
      this.mapView.y +
      this.mapView.height / 2;


    /*
     * Zoom toward the center.
     */
    this.mapView = {

      x:
        centerX -
        newWidth / 2,

      y:
        centerY -
        newHeight / 2,

      width:
        newWidth,

      height:
        newHeight

    };


    this.keepMapInsideBounds();

  }


  /*
   * DRAG / PAN
   */

  startPan(
    event: PointerEvent
  ): void {

    /*
     * Don't pan until the visitor
     * has actually zoomed in.
     */
    if (
      this.mapView.width >=
      this.initialView.width
    ) {

      return;

    }


    if (
      event.pointerType === 'mouse' &&
      event.button !== 0
    ) {

      return;

    }


    this.isDragging = true;

    this.activePointerId =
      event.pointerId;


    this.lastPointerX =
      event.clientX;

    this.lastPointerY =
      event.clientY;


    const svg =
      this.mapSvg.nativeElement;


    svg.setPointerCapture(
      event.pointerId
    );

  }


  panMap(
    event: PointerEvent
  ): void {

    if (
      !this.isDragging ||
      event.pointerId !==
        this.activePointerId
    ) {

      return;

    }


    const svg =
      this.mapSvg.nativeElement;


    const rectangle =
      svg.getBoundingClientRect();


    /*
     * Convert screen movement
     * into SVG map coordinates.
     */
    const dx =
      (event.clientX -
        this.lastPointerX) *
      (
        this.mapView.width /
        rectangle.width
      );


    const dy =
      (event.clientY -
        this.lastPointerY) *
      (
        this.mapView.height /
        rectangle.height
      );


    this.mapView = {

      ...this.mapView,

      x:
        this.mapView.x -
        dx,

      y:
        this.mapView.y -
        dy

    };


    this.lastPointerX =
      event.clientX;

    this.lastPointerY =
      event.clientY;


    this.keepMapInsideBounds();

  }


  endPan(
    event: PointerEvent
  ): void {

    if (
      event.pointerId !==
      this.activePointerId
    ) {

      return;

    }


    this.isDragging = false;

    this.activePointerId = null;

  }


  /*
   * Keeps the visitor from dragging
   * the island completely off-screen.
   */
  private keepMapInsideBounds(): void {

    const minimumX =
      this.initialView.x;


    const maximumX =
      this.initialView.x +
      this.initialView.width -
      this.mapView.width;


    const minimumY =
      this.initialView.y;


    const maximumY =
      this.initialView.y +
      this.initialView.height -
      this.mapView.height;


    this.mapView.x =
      Math.min(
        maximumX,
        Math.max(
          minimumX,
          this.mapView.x
        )
      );


    this.mapView.y =
      Math.min(
        maximumY,
        Math.max(
          minimumY,
          this.mapView.y
        )
      );

  }

}