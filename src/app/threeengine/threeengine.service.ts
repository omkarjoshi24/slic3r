/**
 * File: /Users/omkarjoshi/Development/slic3r/src/app/threeengine/threeengine.service.ts
 * Project: slic3r
 * Created Date: Friday, March 22nd 2019, 6:51:51 pm
 * Author: Omkar Joshi
 * -----
 * Last Modified: Sun Mar 24 2019
 * Modified By: Omkar Joshi
 * -----
 * Copyright (c) 2019 Omkar Joshi
 * 
 * <<licensetext>>
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

  private cube: THREE.Mesh;

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

  }

  createPerspectiveSwitcher(eleId: string): void {

  }

}
