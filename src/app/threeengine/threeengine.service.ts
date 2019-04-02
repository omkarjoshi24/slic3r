/**
 * File: /Users/omkarjoshi/Development/slic3r/src/app/threeengine/threeengine.service.ts
 * Project: slic3r
 * Created Date: Friday, March 22nd 2019, 6:51:51 pm
 * Author: Omkar Joshi
 * Desription:
 * Service to provide Three js functionality
 *
 * -----
 * Last Modified: Mon Apr 01 2019
 * Modified By: Omkar Joshi
 * -----
 * Copyright (c) 2019 Omkar Joshi
 *
 * -----
 * HISTORY:
 * Date                 			By   		Comments
 * ---------------------	-----	----------------------------------------------------------
 * 2019/03/24 5:50:15 pm	OJ
 * 2019/03/24 11:37:53 am	OJ
 */

import { Injectable } from '@angular/core';
import * as THREE from 'three-full';

/**
 * Injectable
 */
@Injectable({
  providedIn: 'root'
})

export class ThreeEngineService {

  public editorCanvas: HTMLCanvasElement;
  public editorRenderer: THREE.WebGLRenderer;
  public editorCamera: THREE.PerspectiveCamera;
  public editorScene: THREE.Scene;
  public editorLight: THREE.AmbientLight;
  public editorGrid: THREE.GridHelper;
  public editorCameraController: THREE.OrbitControls;
  public editorTransformController: THREE.TransformControls;
  public editorSelectionBox = THREE.BoxHelper;

  // public added3DObjs: THREE.Mesh[] = [];
  public helper3DObjs = {};
  public added3DObjs: THREE.Object3D[] = [];

  public selected3DObj: THREE.Object3D = null;

  private boundTCChanged = event => this.tcChanged();
  private boundTCDraggingChanged = event => this.tcDraggingChanged(event);

  /**
   * Creates an instance of three engine service.
   */
  constructor() { }

  /**
   * Creates scene and add it to HTML canvas
   * @param elId (string) element id of the canvas element
   */
  createScene(elId: string): void {
    // store HTML Canvas element in to class variable
    this.editorCanvas = document.getElementById(elId) as HTMLCanvasElement;
    // create new scene
    this.editorScene = new THREE.Scene();
    // create new Perspective Camera using window's innerWidth and innerHeight
    this.editorCamera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);
    // set position of the camera in x, y and z
    this.editorCamera.position.set(20, 40, 70);
    // set camera to look at scene
    this.editorCamera.lookAt(this.editorScene.position);
    // add camera to the scene
    this.editorScene.add(this.editorCamera);
    // create new ambient light
    this.editorLight = new THREE.AmbientLight(0x404040);
    // add newly created light to scene
    this.editorScene.add(this.editorLight);
    // create renderer to render 3D content
    this.editorRenderer = new THREE.WebGLRenderer({
      canvas: this.editorCanvas,
      alpha: false, // opaque background
      antialias: true // smooth edges
    });
    // set clear color for renderer
    this.editorRenderer.setClearColor(0xFFFFFF, 1);
    // set renderer size to window's innerWidth and innerHeigth
    this.editorRenderer.setSize(window.innerWidth, window.innerHeight);
    // create editor grid
    this.editorGrid = new THREE.GridHelper(100, 100);
    this.editorGrid.position.set(0, 0, 0);
    // add editor grid to the scene
    this.editorScene.add(this.editorGrid);
    // create oribit controls to let user control camera
    this.editorCameraController = new THREE.OrbitControls(this.editorCamera, this.editorRenderer.domElement);
    // set Oribit controls's target position
    this.editorCameraController.target.set(0, 0, 0);
    // enable damping to false to avoid innertia effect
    this.editorCameraController.enableDamping = false;
    this.editorCameraController.update();
    this.editorSelectionBox = new THREE.BoxHelper();
    this.editorSelectionBox.material.depthTest = false;
    this.editorSelectionBox.material.transparent = true;
    this.editorSelectionBox.visible = false;
    this.editorScene.add(this.editorSelectionBox);

    this.helper3DObjs[this.editorCamera.uuid] = this.editorCamera;
    this.helper3DObjs[this.editorLight.uuid] = this.editorLight;
    this.helper3DObjs[this.editorGrid.uuid] = this.editorGrid;
    this.helper3DObjs[this.editorSelectionBox.uuid] = this.editorSelectionBox;
  }

  /**
   * Renders scene once DOM contents are loaded and if window
   * resizes it resizes the scene
   */
  animate(): void {
    // listen to DOMContentLoaded to render the scene
    window.addEventListener('DOMContentLoaded', () => {
      this.render();
    });
    // listen to the resize of a window to resize the scene
    window.addEventListener('resize', () => {
      this.resize();
    });
  }

  /**
   * Renders the scene
   */
  render(): void {
    // create a loop that causes the renderer to draw the scene every time the screen is refreshed
    requestAnimationFrame(() => {
      this.render();
    });
    this.editorCameraController.update();
    this.doRender();
  }
  /**
   * actually excutes method render of renderer
   */
  private doRender() {
    // render the scene
    this.editorRenderer.render(this.editorScene, this.editorCamera);
  }

  /**
   * Add3s dobject
   * @param type (string) type of the 3D object to add to the scene
   */
  add3DObject(type: string): void {
    // create new 3D object by type
    let generated3DObj: THREE.Object3D = this.get3DObjByType(type);
    // calculate xyz dimentions of generated 3D object
    generated3DObj.geometry.computeBoundingBox();
    // calculate y position of the generated 3D object in a scene
    let generated3DObjY: number = (generated3DObj.geometry.boundingBox.max.y - generated3DObj.geometry.boundingBox.min.y) / 2;
    // set generated 3D object's position in a scene
    generated3DObj.position.set(0, generated3DObjY, 0);
    // add created 3D object to the scene
    this.editorScene.add(generated3DObj);

    this.select3DObject(generated3DObj);

    generated3DObj.traverse( (child: any) => {
      this.added3DObjs.push(child);
    });
  }

  remove3DObject(obj3DToRemove: THREE.Object3D): void {
    this.select3DObject(null);
    this.editorScene.remove(obj3DToRemove);
  }

  select3DObject(obj3DToSelect: THREE.Object3D): void {
    this.editorSelectionBox.visible = false;
    this.stopTransform();
    this.selected3DObj = null;
    this.stopTransform();
    if (obj3DToSelect !== null &&
        obj3DToSelect !== this.editorScene &&
        !this.isHelperObj(obj3DToSelect)) {
          let verificationBox: THREE.Box3 = new THREE.Box3();
          verificationBox.setFromObject(obj3DToSelect);
          if (verificationBox.isEmpty() === false) {
            this.editorSelectionBox.setFromObject(obj3DToSelect);
            this.editorSelectionBox.visible = true;
            this.selected3DObj = obj3DToSelect;
          }
    }
    this.doRender();
  }

  isHelperObj(obj3D: THREE.Object3D): boolean {
    if (this.helper3DObjs[obj3D.uuid]) {
      return true;
    }
    return false;
  }

  /**
   * Gets 3D mesh obj by type
   * @param type type of 3D mesh
   * @returns 3D object mesh
   */
  private get3DObjByType(type: string): THREE.Mesh {
    // make sure type param is not undefined
    if (type !== undefined && type !== null && type !== '') {
      // variable to hold geometry object
      let geometry: THREE.BoxGeometry | THREE.Geometry | THREE.SphereGeometry | THREE.BufferGeometry;
      // variable to holder material
      const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
      // swicth by type
      switch (type) {
        case 'cube':
          geometry = new THREE.BoxBufferGeometry(10, 10, 10); // in case type is cube, create Box Geometry
          break;
        case 'sphere':
          geometry = new THREE.SphereGeometry(5, 32, 32); // in case type is sphere, create Sphere geometry
          break;
      }
      // return Mesh using geometry and material objects
      return new THREE.Mesh(geometry, material);
    }
  }

  /**
   * Apply Transformation controls to given 3D object
   * @param type (string) type of transformation to apply
   * @param obj3D (THREE.Mesh) 3D object the transformation should apply to
   */
  startTransform(type: string, obj3D: THREE.Mesh): void {
    // create instance of transforme controller only if not created 
    if (this.editorTransformController === undefined || this.editorTransformController === null) {
      this.editorTransformController = new THREE.TransformControls(this.editorCamera, this.editorRenderer.domElement);
    }
    this.editorTransformController.addEventListener('change', this.boundTCChanged);
    this.editorTransformController.addEventListener('dragging-changed', this.boundTCDraggingChanged);
    this.editorTransformController.enable = true;
    this.editorTransformController.attach(obj3D);
    this.editorScene.add(this.editorTransformController);
    this.editorTransformController.setMode(type);
  }

  stopTransform(): void {
    if (this.editorCameraController) {
      this.editorCameraController.enable = true;
    }
    if (this.editorTransformController) {
      this.editorTransformController.detach();
      this.editorTransformController.removeEventListener('change', this.boundTCChanged);
      this.editorTransformController.removeEventListener('dragging-changed', this.boundTCDraggingChanged);
    }
  }

  /**
   * Resizes renderer
   */
  private resize(): void {
    let width = window.innerWidth; // store window innerwidth
    let height = window.innerHeight;// store window innerHeight

    // set aspect ration of the camera using new width and height
    this.editorCamera.aspect = width / height;
    // update camera projection matrix
    this.editorCamera.updateProjectionMatrix();
    // set new size to renderer
    this.editorRenderer.setSize(width, height);
  }

  tcChanged(): void {
    let obj3D = this.editorTransformController.object;
    if (obj3D !== undefined) {
      this.editorSelectionBox.setFromObject(obj3D);
    }
    this.doRender();
  }

  tcDraggingChanged(event): void {
    if (this.editorCameraController) {
      this.editorCameraController.enabled = !event.value;
      console.log('event.value: ' + event.value);
      console.log('orbit controller enabled? ' + this.editorCameraController.enable);

    }
  }

  /**
   * Creates perspective switcher and it to HTML canvas
   * @param eleId (string) element id of a HTML canvas
   * @param width (number) width of a HTML canvas
   * @param height (number) height of the HTML canvas
   */
  createPerspectiveSwitcher(eleId: string, width: number, height: number): void {

  }

}
