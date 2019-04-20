/**
 * File: /Users/omkarjoshi/Development/slic3r/src/app/centerpane/centerpane.component.ts
 * Project: slic3r
 * Created Date: Friday, March 22nd 2019, 5:37:53 pm
 * Author: Omkar Joshi
 * Desription:
 * Center pane
 * 
 * -----
 * Last Modified: Thu Apr 11 2019
 * Modified By: Omkar Joshi
 * -----
 * Copyright (c) 2019 Omkar Joshi
 * 
 * -----
 * HISTORY:
 * Date                 			By   		Comments
 * ---------------------	-----	----------------------------------------------------------
 */

import { Component, OnInit } from '@angular/core';
import { ThreeEngineService } from '../threeengine/threeengine.service';
import * as THREE from 'three-full';

@Component({
  selector: 'app-center-pane',
  templateUrl: './centerpane.component.html',
  styleUrls: ['./centerpane.component.scss']
})
export class CenterPaneComponent implements OnInit {
  // HTML canvas element id
  private canvasEleId = 'centerPaneCanvas';

  private onMouseDownPosition: THREE.Vector2 = new THREE.Vector2();
  private onMouseUpPosition: THREE.Vector2 = new THREE.Vector2();
  private onDoubleClickPosition: THREE.Vector2 = new THREE.Vector2();

  private rayCaster: THREE.Raycaster = new THREE.Raycaster();
  private mouse: THREE.Vector2 = new THREE.Vector2();
  /**
   * Creates an instance of center pane component.
   * @param threeEngineServ instance of a three engin service
   */
  constructor(private threeEngineServ: ThreeEngineService) { }

  /**
   * on init create a scene and render it
   */
  ngOnInit() {
    this.threeEngineServ.createScene(this.canvasEleId);
    this.threeEngineServ.animate();
    this.threeEngineServ.editorCanvas.addEventListener('mousedown', this.boundMouseDown, false);
    this.threeEngineServ.editorCanvas.addEventListener('touchstart', this.boundTouchStart, false);
  }

  private boundMouseDown = event => this.onMouseDown(event);
  private boundTouchStart = event => this.onTouchStart(event);

  private getMousePosition(element: HTMLCanvasElement, x: number, y: number) {
    let rect: ClientRect | DOMRect = element.getBoundingClientRect();
    return [ ( x - rect.left ) / rect.width, ( y - rect.top ) / rect.height ];
  }

  private getIntersectingObjByPoint(point: THREE.Vector2, sceneChildren: THREE.Object3D[]): THREE.Object3D[] {
    this.mouse.set( ( point.x * 2 ) - 1, - ( point.y * 2 ) + 1 );
    this.rayCaster.setFromCamera(this.mouse, this.threeEngineServ.editorCamera);
    return this.rayCaster.intersectObjects(sceneChildren);
  }

  private handleClick(): void {
    if (this.onMouseDownPosition.distanceTo(this.onMouseUpPosition) === 0) {
      let rayCastingOnObjs = this.threeEngineServ.added3DObjs.concat( [ this.threeEngineServ.editorScene ] );
      let intersectObjs: any[] = this.getIntersectingObjByPoint(this.onMouseUpPosition, this.threeEngineServ.editorScene.children);
      if (intersectObjs && intersectObjs.length > 0) {
        let obj3dClicked: THREE.Object3D = intersectObjs[0].object;
        this.threeEngineServ.select3DObject(obj3dClicked);
      } else {
        this.threeEngineServ.select3DObject(null);
      }
    }
  }

  private boundMouseUp = (event) => {
    this.onMouseUp(event);
  };

  private onMouseDown(event: any): void {
    this.onMouseDownPosition.fromArray(this.getMousePosition(this.threeEngineServ.editorCanvas, event.clientX, event.clientY));
    document.addEventListener('mouseup', this.boundMouseUp, false);
  }

  private onMouseUp(event: any): void {
    this.onMouseUpPosition.fromArray(this.getMousePosition(this.threeEngineServ.editorCanvas, event.clientX, event.clientY));
    this.handleClick();
    document.removeEventListener('mouseup', this.boundMouseUp, false);
  }

  private onTouchStart(event: any): void {
    
  }
  
}
