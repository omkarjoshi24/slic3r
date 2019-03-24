/**
 * File: /Users/omkarjoshi/Development/slic3r/src/app/threeengine/threeengine.service.ts
 * Project: slic3r
 * Created Date: Friday, March 22nd 2019, 6:51:51 pm
 * Author: Omkar Joshi
 * Desription:
 * 
 * 
 * -----
 * Last Modified: Sun Mar 24 2019
 * Modified By: Omkar Joshi
 * -----
 * Copyright (c) 2019 Omkar Joshi
 * 
 * -----
 * HISTORY:
 * Date                 			By   		Comments
 * ---------------------	-----	----------------------------------------------------------
 */

import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { WebGLRenderer } from 'three';

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
    this.editorCanvas = document.getElementById(elId) as HTMLCanvasElement;
    this.editorScene = new THREE.Scene();
    this.editorCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    this.editorRenderer = new WebGLRenderer({
      canvas: this.editorCanvas,
      alpha: true,
      antialias: true
    });
    this.editorRenderer.setSize(window.innerWidth, window.innerHeight);
    this.editorCamera.position.z = 5;
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
    requestAnimationFrame(this.render);
    // render the scene
    this.editorRenderer.render(this.editorScene, this.editorCamera);
  }

  /**
   * Resizes renderer
   */
  resize(): void {
    let width = window.innerWidth;
    let height = window.innerHeight;

    this.editorCamera.aspect = width / height;
    this.editorCamera.updateProjectionMatrix();

    this.editorRenderer.setSize(width, height);
  }

  /**
   * Add3s dobject
   * @param type (string) type of the 3D object to add to the scene
   */
  add3DObject(type: string): void {
    this.editorScene.add(this.get3DObjByType(type));
  }

  /**
   * Gets 3D mesh obj by type
   * @param type type of 3D mesh
   * @returns 3D object mesh
   */
  private get3DObjByType(type: string): THREE.Mesh {
    if (type !== undefined && type !== null && type !== '') {
      let geometry: THREE.BoxGeometry | THREE.Geometry | THREE.SphereGeometry | THREE.BufferGeometry;
      const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00, wireframe: true});
      switch (type) {
        case 'cube':
          geometry = new THREE.BoxGeometry(1, 1, 1);
          break;
        case 'sphere':
          geometry = new THREE.SphereGeometry(5, 32, 32);
          break;
      }
      return new THREE.Mesh(geometry, material);
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
