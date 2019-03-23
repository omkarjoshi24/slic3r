import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})

export class ThreeEngineService {

  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private light: THREE.AmbientLight;

  private cube: THREE.Mesh;

  constructor() { }

  createScene(elId: string): void {
    this.canvas = document.getElementById(elId) as HTMLCanvasElement;
  }

}
