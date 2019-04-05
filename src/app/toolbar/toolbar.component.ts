/**
 * File: /Users/omkarjoshi/Development/slic3r/src/app/toolbar/toolbar.component.ts
 * Project: slic3r
 * Created Date: Friday, March 22nd 2019, 5:41:26 pm
 * Author: Omkar Joshi
 * -----
 * Last Modified: Thu Apr 04 2019
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

import { Component, OnInit } from '@angular/core';
import { ButtonConfig } from '../datastructs/button-config';
import { ThreeEngineService } from '../threeengine/threeengine.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  private buttons: ButtonConfig[] = [
    { id: 'addButton',
      label: 'Add',
      icon: ['slic3r-icon-3d-add'],
      type: 'circle',
      parent: 'toolbar',
      children: [
        { id: 'backButton', label: 'Back', icon: ['slic3r-icon-3d-back'], type: 'circle', parent: 'addButton', isFontAwesomeIcon: false },
        { id: 'cubeButton', label: 'Cube', icon: ['slic3r-icon-3d-cube'], type: 'circle', parent: 'addButton', isFontAwesomeIcon: false },
        { id: 'sphereButton', label: 'Sphere', icon: ['slic3r-icon-3d-sphere'], type: 'circle',
          parent: 'addButton', isFontAwesomeIcon: false },
        { id: 'cylinderButton', label: 'Cylinder', icon: ['slic3r-icon-3d-cylinder'], type: 'circle',
          parent: 'addButton', isFontAwesomeIcon: false },
        { id: 'icosahedronButton', label: 'Icosahedron', icon: ['slic3r-icon-3d-icosahedron'], type: 'circle',
          parent: 'addButton', isFontAwesomeIcon: false },
        { id: 'torusButton', label: 'Torus', icon: ['slic3r-icon-3d-torus'], type: 'circle',
          parent: 'addButton', isFontAwesomeIcon: false },
        { id: 'coneButton', label: 'Cone', icon: ['slic3r-icon-3d-cone'], type: 'circle', parent: 'addButton', isFontAwesomeIcon: false },
        { id: 'dodecahedronButton', label: 'Dodecahedron', icon: ['slic3r-icon-3d-dodecahedron'], type: 'circle', 
          parent: 'addButton', isFontAwesomeIcon: false },
      ],
      isFontAwesomeIcon: false
    },
    { id: 'translateButton', label: 'Translate', icon: ['slic3r-icon-3d-translate'], type: 'circle',
      parent: 'toolbar', isFontAwesomeIcon: false, hideCondition: 'this.threeEngineService.selected3DObj === null' },
    { id: 'scaleButton', label: 'Scale', icon: ['slic3r-icon-3d-scale'], type: 'circle',
      parent: 'toolbar', isFontAwesomeIcon: false, hideCondition: 'this.threeEngineService.selected3DObj === null' },
    { id: 'rotateButton', label: 'Rotate', icon: ['slic3r-icon-3d-rotate'], type: 'circle',
      parent: 'toolbar', isFontAwesomeIcon: false, hideCondition: 'this.threeEngineService.selected3DObj === null' },
    { id: 'removeButton', label: 'Delete', icon: ['slic3r-icon-3d-trash'], type: 'circle', parent: 'toolbar',
      hideCondition: 'this.threeEngineService.selected3DObj === null', isFontAwesomeIcon: false }
  ];

  private chidrenVisible = false;
  private visibleChildren: ButtonConfig[] = [];
  private currentClickedButton: string;

  constructor(private threeEngineService: ThreeEngineService) { }

  ngOnInit() {
  }

  toolButtonClicked(dataid: string) {
    if (dataid !== undefined && dataid !== null && dataid !== '') {
      this.currentClickedButton = dataid;
      switch ( dataid ) {
        case 'addButton':
        case 'transformButton':
          this.showChildren(dataid);
          break;
        case 'backButton':
          this.chidrenVisible = false;
          this.visibleChildren = [];
          break;
        case 'removeButton':
          this.threeEngineService.remove3DObject(this.threeEngineService.selected3DObj);
          break;
        case 'cubeButton':
          this.threeEngineService.add3DObject('cube');
          this.chidrenVisible = false;
          this.visibleChildren = [];
          break;
        case 'sphereButton':
          this.threeEngineService.add3DObject('sphere');
          this.chidrenVisible = false;
          this.visibleChildren = [];
          break;
        case 'translateButton':
          this.threeEngineService.startTransform('translate', this.threeEngineService.selected3DObj);
          this.chidrenVisible = false;
          this.visibleChildren = [];
          break;
        case 'scaleButton':
          this.threeEngineService.startTransform('scale', this.threeEngineService.selected3DObj);
          this.chidrenVisible = false;
          this.visibleChildren = [];
          break;
        case 'rotateButton':
          this.threeEngineService.startTransform('rotate', this.threeEngineService.selected3DObj);
          this.chidrenVisible = false;
          this.visibleChildren = [];
          break;
      }
    }
  }
  private showChildren(dataid: string): void {
    let btnConfig = this.getButtonConfigById(dataid);
    if ( btnConfig !== null && btnConfig.children !== undefined && btnConfig.children !== null && btnConfig.children.length > 0 ) {
      this.chidrenVisible = true;
      this.visibleChildren = btnConfig.children;
    }
  }

  private setDefaultTransform() {
    
  }

  private getButtonConfigById(dataid: string): ButtonConfig {
    let totalBtnConfigs: number = this.buttons.length;
    for (let buttonsCnt = 0; buttonsCnt < totalBtnConfigs; buttonsCnt++) {
      if ( this.buttons[ buttonsCnt ].id === dataid ) {
        return this.buttons[ buttonsCnt ];
      }
    }
    return null;
  }
}
