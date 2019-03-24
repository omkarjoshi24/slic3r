/**
 * File: /Users/omkarjoshi/Development/slic3r/src/app/threeengine/threeengine.service.ts
 * Project: slic3r
 * Created Date: Friday, March 22nd 2019, 6:51:51 pm
 * Author: Omkar Joshi
 * Desription:
 * This service provides basic three js functionality to interact with 3D
 * objects
 * xs
 * -----
 * Last Modified: Sun Mar 24 2019
 * Modified By: Omkar Joshi
 * -----
 * Copyright (c) 2019 Omkar Joshi
 * 
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	----------------------------------------------------------
 */

import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { WebGLRenderer } from 'three';

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

  constructor() { }

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

  animate(): void {
    requestAnimationFrame(this.animate);
    this.editorRenderer.render(this.editorScene, this.editorCamera);
  }

  add3DObject(type: string): void {
    this.editorScene.add(this.get3DObjByType(type));
  }

  private get3DObjByType(type: string): THREE.Mesh {
    if (type !== undefined && type !== null && type !== '') {
      let geometry: THREE.BoxGeometry | THREE.Geometry | THREE.SphereGeometry | THREE.BufferGeometry;
      const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00, wireframe: true});
      switch(type) {
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
  createPerspectiveSwitcher(eleId: string): void {

  }

}
