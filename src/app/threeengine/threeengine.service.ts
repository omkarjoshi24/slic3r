/**
 * File: /Users/omkarjoshi/Development/slic3r/src/app/threeengine/threeengine.service.ts
 * Project: slic3r
 * Created Date: Friday, March 22nd 2019, 6:51:51 pm
 * Author: Omkar Joshi
 * Desription:
 * Service to provide Three js functionality
 *
 * -----
 * Last Modified: Tue Mar 26 2019
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

  private editorCanvas: HTMLCanvasElement;
  private editorRenderer: THREE.WebGLRenderer;
  private editorCamera: THREE.PerspectiveCamera;
  private editorScene: THREE.Scene;
  private editorLight: THREE.AmbientLight;
  private editorGrid: THREE.GridHelper;
  private editorCameraController: THREE.OrbitControls;
  private editorTransformController: THREE.TransformControls;

  private perspectiveSwitcherCanvas: HTMLCanvasElement;
  private perspectiveSwitcherRenderer: THREE.WebGLRenderer;
  private perspectiveSwitcherCamera: THREE.PerspectiveCamera;
  private perspectiveSwitcherScene: THREE.Scene;
  private perspectiveSwitcherLight: THREE.AmbientLight;

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
   * Resizes renderer
   */
  resize(): void {
    let width = window.innerWidth; // store window innerwidth
    let height = window.innerHeight;// store window innerHeight

    // set aspect ration of the camera using new width and height
    this.editorCamera.aspect = width / height;
    // update camera projection matrix
    this.editorCamera.updateProjectionMatrix();
    // set new size to renderer
    this.editorRenderer.setSize(width, height);
  }

  /**
   * Add3s dobject
   * @param type (string) type of the 3D object to add to the scene
   */
  add3DObject(type: string): void {
    // create new 3D object by type
    let generated3DObj: THREE.Mesh = this.get3DObjByType(type);
    // calculate xyz dimentions of generated 3D object
    generated3DObj.geometry.computeBoundingBox();
    // calculate y position of the generated 3D object in a scene
    let generated3DObjY: number = (generated3DObj.geometry.boundingBox.max.y - generated3DObj.geometry.boundingBox.min.y) / 2;
    // set generated 3D object's position in a scene
    generated3DObj.position.set(0, generated3DObjY, 0);
    // add created 3D object to the scene
    this.editorScene.add(generated3DObj);
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
    this.editorTransformController.addEventListener('change', this.doRender);
    this.editorTransformController.addEventListener('dragging-changed', (event) => {
      this.editorCameraController.enable = !event.value;
    });
    this.editorTransformController.enable = true;
    this.editorTransformController.attach(obj3D);
    this.editorTransformController.setMode(type);
  }

  stopTransform(): void {
    this.editorCameraController.enable = false;
    this.editorTransformController.removeEventListener('change', this.doRender);
    this.editorTransformController.removeEventListener('dragging-changed', (event) => {
      this.editorCameraController.enable = !event.value;
    });
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
