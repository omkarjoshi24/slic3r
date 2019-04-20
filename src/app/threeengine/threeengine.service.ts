/**
 * File: /Users/omkarjoshi/Development/slic3r/src/app/threeengine/threeengine.service.ts
 * Project: slic3r
 * Created Date: Friday, March 22nd 2019, 6:51:51 pm
 * Author: Omkar Joshi
 * Desription:
 * Service to provide Three js functionality
 *
 * -----
 * Last Modified: Fri Apr 19 2019
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
  public editObj3DPoints = {};

  public selected3DObj: THREE.Object3D = null;
  public selectedEditPoints: THREE.Object3D[] = [];

  private onMouseDownPosition: THREE.Vector3;

  private boundTCChanged = event => this.tcChanged(event);
  private boundTCDraggingChanged = event => this.tcDraggingChanged(event);
  private boundTCMouseDown = event => this.tcMouseDown(event);

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
    this.editorGrid = new THREE.GridHelper(300, 10);
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
    if (obj3DToSelect !== null && this.isSelectionPoint(obj3DToSelect)) {
      if (this.selectedEditPoints.length > 0) {
        this.selectedEditPoints.splice(0);
      }
      if (this.editorTransformController) {
        this.editorTransformController.removeEventListener('mouseDown', this.boundTCMouseDown);
      }
      this.selectedEditPoints.push(obj3DToSelect);
      this.startTransform('translate', obj3DToSelect);
      return;
    }
    if (this.selectedEditPoints.length > 0) {
      this.selectedEditPoints.splice(0);
    }
    this.editorSelectionBox.visible = false;
    this.stopTransform();
    this.selected3DObj = null;
    if (this.editObj3DPoints) {
      let editingObjectUUIDs = Object.keys(this.editObj3DPoints);
      if (editingObjectUUIDs) {
        editingObjectUUIDs.forEach((editingObjectUUID) => {
          if (this.editObj3DPoints[editingObjectUUID]) {
            let selectionPointUUIDs = Object.keys(this.editObj3DPoints[editingObjectUUID]);
            if (selectionPointUUIDs) {
              selectionPointUUIDs.forEach((selectionPointUUID) => {
                if (this.editObj3DPoints[editingObjectUUID][selectionPointUUID]) {
                  this.editorScene.remove(this.editObj3DPoints[editingObjectUUID][selectionPointUUID]);
                }
              });
            }
          }
        });
      }
    }
    this.stopTransform();
    if (obj3DToSelect !== null &&
        obj3DToSelect !== this.editorScene &&
        !this.isHelperObj(obj3DToSelect) &&
        !this.isSelectionPoint(obj3DToSelect)) {
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

  isSelectionPoint(obj3D: THREE.Object3D): boolean {
    if (this.editObj3DPoints) {
      let currentlyEditingObj3Ds = Object.keys(this.editObj3DPoints);
      if (currentlyEditingObj3Ds) {
        let totalCurrentlyEditingObj3Ds = currentlyEditingObj3Ds.length;
        if (totalCurrentlyEditingObj3Ds > 0) {
          for(let currentlyEditingObj3DsCnt = 0; currentlyEditingObj3DsCnt < totalCurrentlyEditingObj3Ds; currentlyEditingObj3DsCnt++){
            if (this.editObj3DPoints[currentlyEditingObj3Ds[currentlyEditingObj3DsCnt]] &&
              this.editObj3DPoints[currentlyEditingObj3Ds[currentlyEditingObj3DsCnt]][obj3D.uuid]) {
                return true;
              }
          }
        }
      }
    }
    return false;
  }

  getSelectionPointOwner(obj3D: THREE.Object3D): THREE.Object3D {
    if (this.editObj3DPoints) {
      let currentlyEditingObj3Ds = Object.keys(this.editObj3DPoints);
      if (currentlyEditingObj3Ds) {
        let totalCurrentlyEditingObj3Ds = currentlyEditingObj3Ds.length;
        if (totalCurrentlyEditingObj3Ds > 0) {
          for (let currentlyEditingObj3DsCnt = 0; currentlyEditingObj3DsCnt < totalCurrentlyEditingObj3Ds; currentlyEditingObj3DsCnt++){
            let uuidOfEditingObjAtIndex = currentlyEditingObj3Ds[currentlyEditingObj3DsCnt];
            if (this.editObj3DPoints[uuidOfEditingObjAtIndex] &&
                this.editObj3DPoints[uuidOfEditingObjAtIndex][obj3D.uuid]) {
                let totalAdded3DObjs = this.added3DObjs.length;
                for (let addedObjCnt = 0; addedObjCnt < totalAdded3DObjs; addedObjCnt++) {
                  if (this.added3DObjs[addedObjCnt].uuid === uuidOfEditingObjAtIndex) {
                    let objToReturn: THREE.Object3D =  this.added3DObjs[addedObjCnt];
                    return objToReturn;
                  }
                }
              }
          }
        }
      }
    }
    return null;
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
      let geometry: any;
      // variable to holder material
      const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
      // swicth by type
      switch (type) {
        case 'cube':
          geometry = new THREE.BoxBufferGeometry(10, 10, 10); // in case type is cube, create Box Geometry
          break;
        case 'sphere':
          geometry = new THREE.SphereBufferGeometry(5, 32, 32); // in case type is sphere, create Sphere geometry
          break;
        case 'cylinder':
          geometry = new THREE.CylinderBufferGeometry(5, 5, 20);
          break;
        case 'cone':
          geometry = new THREE.ConeBufferGeometry(5, 20, 32);
          break;
        case 'torus':
          geometry = new THREE.TorusBufferGeometry(10, 3, 30, 200);
          break;
        case 'icosahedron':
          geometry = new THREE.IcosahedronBufferGeometry(10, 0);
          break;
        case 'dodecahedron':
          geometry = new THREE.DodecahedronBufferGeometry(10, 0);
          break;
        case 'octahedron':
          geometry = new THREE.OctahedronBufferGeometry(10, 0);
          break;
        case 'tetrahedron':
          geometry = new THREE.TetrahedronBufferGeometry(10, 0);
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
    if (this.isSelectionPoint(obj3D)) {
      this.editorTransformController.addEventListener('mouseDown', this.boundTCMouseDown);
    }
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

  edit3dObject(obj3d: THREE.Mesh) {
    let editPoints = this.getVerticesPositions(obj3d.geometry);
    let existingVertices = {};
    let xyzName: string = '';
    editPoints.forEach((vertex) => {
      let selectionPoint: THREE.Mesh;
      xyzName = 'xyz' + vertex.vertexPosition.x + vertex.vertexPosition.y + vertex.vertexPosition.z;
      if (existingVertices[xyzName]) {
        selectionPoint = existingVertices[xyzName];
        let existingOriginalVertexPositionIndexInBuffer = selectionPoint.geometry.getAttribute('originalVertexPositionIndexInBuffer').array;
        if (existingOriginalVertexPositionIndexInBuffer && existingOriginalVertexPositionIndexInBuffer) {
          let newIndexInBuffer: Float32Array = new Float32Array(existingOriginalVertexPositionIndexInBuffer.length + 1);
          newIndexInBuffer.set(existingOriginalVertexPositionIndexInBuffer, 0);
          newIndexInBuffer.set([vertex.vertexPositionIndex], existingOriginalVertexPositionIndexInBuffer.length);
          let totalIndexBuffers = newIndexInBuffer.length;
          selectionPoint.geometry.addAttribute('originalVertexPositionIndexInBuffer',
                                           new THREE.BufferAttribute(newIndexInBuffer, totalIndexBuffers));
        }
      } else {
        selectionPoint = new THREE.Mesh(new THREE.BoxBufferGeometry(0.2, 0.2, 0.2),
                                        new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: false}));
        selectionPoint.geometry.addAttribute('originalVertexPosition',
                                             new THREE.BufferAttribute( new Float32Array([ vertex.vertexPosition.x,
                                                                                vertex.vertexPosition.y,
                                                                                vertex.vertexPosition.z ]), 3));
        selectionPoint.geometry.addAttribute('originalVertexPositionIndexInBuffer',
                                             new THREE.BufferAttribute(new Float32Array([vertex.vertexPositionIndex]), 1));
        xyzName = 'xyz' + vertex.vertexPosition.x + vertex.vertexPosition.y + vertex.vertexPosition.z;
        existingVertices[xyzName] = selectionPoint;
        vertex.vertexPosition.applyMatrix4(obj3d.matrixWorld);
        selectionPoint.position.x = vertex.vertexPosition.x;
        selectionPoint.position.y = vertex.vertexPosition.y;
        selectionPoint.position.z = vertex.vertexPosition.z;
        this.editorScene.add(selectionPoint);
        if (!this.editObj3DPoints[obj3d.uuid]) {
          this.editObj3DPoints[obj3d.uuid] = {};
        }
        this.editObj3DPoints[obj3d.uuid][selectionPoint.uuid] = selectionPoint;
      }
    });
  }

  private getVerticesPositions(geo: THREE.BufferGeometry): {vertexPositionIndex: number, vertexPosition: THREE.Vector3}[] {
    let vertices: {vertexPositionIndex: number, vertexPosition: THREE.Vector3}[] = [];
    let positions: Float32Array = geo.getAttribute('position').array;
    let totalPositions = positions.length / 3;
    for (let i = 0; i < totalPositions; i++) {
        let currentVertexPosition = new THREE.Vector3(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
        let vertexPositionObj = {vertexPositionIndex: i, vertexPosition: currentVertexPosition};
        vertices.push(vertexPositionObj);
    }
    return vertices;
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

  private tcChanged(event): void {
    let obj3D: THREE.Object3D = this.editorTransformController.object;
    if (obj3D !== undefined && !this.isSelectionPoint(obj3D)) {
      this.editorSelectionBox.setFromObject(obj3D);
    } else if (obj3D !== undefined && this.isSelectionPoint(obj3D) && this.onMouseDownPosition !== undefined) {
      let selectionPointPosition: THREE.Vector3 = new THREE.Vector3(obj3D.position.x, obj3D.position.y, obj3D.position.z);
      let selectionPointOwner = this.getSelectionPointOwner(obj3D) as THREE.Mesh;
      let originalVertexPosition: Float32Array = (obj3D as THREE.Mesh).geometry.getAttribute('originalVertexPosition');
      let originalVertexPositionIndexInBuffer = (obj3D as THREE.Mesh).geometry.getAttribute('originalVertexPositionIndexInBuffer').array;

      let xDiff = this.onMouseDownPosition.x - selectionPointPosition.x;
      let yDiff = this.onMouseDownPosition.y - selectionPointPosition.y;
      let zDiff = this.onMouseDownPosition.z - selectionPointPosition.z;

      if (xDiff !== 0 || yDiff !== 0 || zDiff !== 0) {
        if (originalVertexPositionIndexInBuffer) {
          originalVertexPositionIndexInBuffer.forEach((index: number) => {
            let newX = selectionPointOwner.geometry.attributes.position.array[index] + xDiff;
            let newY = selectionPointOwner.geometry.attributes.position.array[index + 1] + yDiff;
            let newZ = selectionPointOwner.geometry.attributes.position.array[index + 2] + zDiff;
            selectionPointOwner.geometry.attributes.position.set([newX], index);
            selectionPointOwner.geometry.attributes.position.set([newY], index + 1);
            selectionPointOwner.geometry.attributes.position.set([newZ], index + 2);
          });
        }
        (obj3D as THREE.Mesh).geometry.attributes.originalVertexPosition = new THREE.BufferAttribute(
          new Float32Array([this.onMouseDownPosition.x + xDiff,
                            this.onMouseDownPosition.y + yDiff,
                            this.onMouseDownPosition.z + zDiff]),
                          3);
        // selectionPointOwner.geometry.computeBoundingBox();
        // selectionPointOwner.geometry.computeBoundingSphere();
        selectionPointOwner.geometry.attributes.position.needsUpdate = true;
      }
    }
  }

  private tcDraggingChanged(event): void {
    if (this.editorCameraController) {
      this.editorCameraController.enabled = !event.value;
    }
  }

  private tcMouseDown(event): void {
    let obj3D: THREE.Object3D = this.editorTransformController.object;
    if (this.isSelectionPoint(obj3D)) {
      this.onMouseDownPosition = new THREE.Vector3(obj3D.position.x, obj3D.position.y, obj3D.position.z);
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
