/**
 * File: /Users/omkarjoshi/Development/slic3r/src/app/menubar/menubar.component.ts
 * Project: slic3r
 * Created Date: Friday, March 22nd 2019, 5:36:26 pm
 * Author: Omkar Joshi
 * Desription:
 * 
 * 
 * -----
 * Last Modified: Tue Apr 16 2019
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
import { ButtonConfig } from '../datastructs/button-config';
import { ThreeEngineService } from '../threeengine/threeengine.service';
import * as THREE from 'three-full';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements OnInit {

  private buttons: ButtonConfig[] = [
    { id: 'addButton',
      label: 'Add',
      icon: ['slic3r-icon-3d-add'],
      type: 'circle',
      parent: 'toolbar',
      children: [
        { id: 'cubeButton', label: 'Cube', icon: ['slic3r-icon-3d-cube'], type: 'circle',
          parent: 'addButton', isFontAwesomeIcon: false, additionData: 'cube', showLabel: true },
        { id: 'sphereButton', label: 'Sphere', icon: ['slic3r-icon-3d-sphere'], type: 'circle',
          parent: 'addButton', isFontAwesomeIcon: false, additionData: 'sphere', showLabel: true },
        { id: 'cylinderButton', label: 'Cylinder', icon: ['slic3r-icon-3d-cylinder'], type: 'circle',
          parent: 'addButton', isFontAwesomeIcon: false, additionData: 'cylinder', showLabel: true },
        { id: 'coneButton', label: 'Cone', icon: ['slic3r-icon-3d-cone'], type: 'circle',
            parent: 'addButton', isFontAwesomeIcon: false, additionData: 'cone', showLabel: true },
        { id: 'torusButton', label: 'Torus', icon: ['slic3r-icon-3d-torus'], type: 'circle',
          parent: 'addButton', isFontAwesomeIcon: false, additionData: 'torus', showLabel: true },
        { id: 'icosahedronButton', label: 'Icosahedron', icon: ['slic3r-icon-3d-icosahedron'], type: 'circle',
          parent: 'addButton', isFontAwesomeIcon: false, additionData: 'icosahedron', showLabel: true },
        { id: 'dodecahedronButton', label: 'Dodecahedron', icon: ['slic3r-icon-3d-dodecahedron'], type: 'circle',
          parent: 'addButton', isFontAwesomeIcon: false, additionData: 'dodecahedron', showLabel: true },
        { id: 'octahedronButton', label: 'Dodecahedron', icon: ['slic3r-icon-3d-octahedron'], type: 'circle',
          parent: 'addButton', isFontAwesomeIcon: false, additionData: 'octahedron', showLabel: true },
        { id: 'tetrahedronButton', label: 'Tetrahedron', icon: ['slic3r-icon-3d-tetrahedron'], type: 'circle',
          parent: 'addButton', isFontAwesomeIcon: false, additionData: 'tetrahedron', showLabel: true }
      ],
      isFontAwesomeIcon: false,
      togglable: true,
      toggleClass: 'add-button-active'
    },
    { id: 'translateButton', label: 'Translate', icon: ['slic3r-icon-3d-translate'], type: 'circle',
      parent: 'toolbar', isFontAwesomeIcon: false, hideCondition: 'this.threeEngineService.selected3DObj === null',
      additionData: 'translate' },
    { id: 'scaleButton', label: 'Scale', icon: ['slic3r-icon-3d-scale'], type: 'circle',
      parent: 'toolbar', isFontAwesomeIcon: false, hideCondition: 'this.threeEngineService.selected3DObj === null',
      additionData: 'scale' },
    { id: 'rotateButton', label: 'Rotate', icon: ['slic3r-icon-3d-rotate'], type: 'circle',
      parent: 'toolbar', isFontAwesomeIcon: false, hideCondition: 'this.threeEngineService.selected3DObj === null',
      additionData: 'rotate' },
    { id: 'editButton', label: 'Edit Shape', icon: ['slic3r-icon-3d-edit'], type: 'circle',
        parent: 'toolbar', isFontAwesomeIcon: false, hideCondition: 'this.threeEngineService.selected3DObj === null',
        additionData: 'edit', togglable: true, toggleClass: 'edit-button-active',
        children: [
          { id: 'singleVertexButton', label: 'Single Vertex', icon: ['slic3r-icon-3d-back'], type: 'circle',
            parent: 'editButton', isFontAwesomeIcon: false, additionData: 'singleVertex', showLabel: true, 
            hideCondition: 'this.threeEngineService.selected3DObj === null' },
          { id: 'multipleVerticesButton', label: 'Multiple Vertices', icon: ['slic3r-icon-3d-plane'], type: 'circle',
            parent: 'editButton', isFontAwesomeIcon: false, additionData: 'multipleVertices', showLabel: true,
            hideCondition: 'this.threeEngineService.selected3DObj === null' },
          { id: 'selectHorizontalHalfButton', label: 'Select Horizontal Half', icon: ['slic3r-icon-3d-plane'], type: 'circle',
            parent: 'editButton', isFontAwesomeIcon: false, additionData: 'selectHorizontalHalf', showLabel: true,
            hideCondition: 'this.threeEngineService.selected3DObj === null' },
          { id: 'selectOtherHorizontalHalfButton', label: 'Select Other Horizontal Half', icon: ['slic3r-icon-3d-plane'], type: 'circle',
            parent: 'editButton', isFontAwesomeIcon: false, additionData: 'selectOtherHorizontalHalf', showLabel: true,
            hideCondition: 'this.threeEngineService.selected3DObj === null' },
          { id: 'selectVerticleHalfButton', label: 'Select Verticle Half', icon: ['slic3r-icon-3d-plane'], type: 'circle',
            parent: 'editButton', isFontAwesomeIcon: false, additionData: 'selectVerticleHalf', showLabel: true,
            hideCondition: 'this.threeEngineService.selected3DObj === null' },
          { id: 'selectOtherVerticleHalfButton', label: 'Select Other Verticle Half', icon: ['slic3r-icon-3d-plane'], type: 'circle',
            parent: 'editButton', isFontAwesomeIcon: false, additionData: 'selectOtherVerticleHalf', showLabel: true,
            hideCondition: 'this.threeEngineService.selected3DObj === null' }
        ]
    },
    { id: 'removeButton', label: 'Delete', icon: ['slic3r-icon-3d-trash'], type: 'circle', parent: 'toolbar',
      hideCondition: 'this.threeEngineService.selected3DObj === null', isFontAwesomeIcon: false }
  ];

  private chidrenVisible = false;
  private visibleChildren: ButtonConfig[] = [];
  private currentClickedButton: string;
  private activeToggleClass = '';
  constructor(private threeEngineService: ThreeEngineService) { }

  ngOnInit() {
  }

  toolButtonClicked(dataid: string) {
    if (dataid !== undefined && dataid !== null && dataid !== '') {
      this.currentClickedButton = dataid;
      let btnConfig = this.getButtonConfigById( dataid );
      if (btnConfig !== null) {
        switch ( dataid ) {
          case 'addButton':
            this.showChildren( dataid );
            this.activeToggleClass = btnConfig.toggleClass;
            break;
          case 'removeButton':
            this.threeEngineService.remove3DObject( this.threeEngineService.selected3DObj );
            break;
          case 'cubeButton':
          case 'sphereButton':
          case 'cylinderButton':
          case 'icosahedronButton':
          case 'torusButton':
          case 'coneButton':
          case 'dodecahedronButton':
          case 'octahedronButton':
          case 'tetrahedronButton':
            this.threeEngineService.add3DObject( btnConfig.additionData );
            this.hideChildren();
            break;
          case 'translateButton':
          case 'scaleButton':
          case 'rotateButton':
            this.threeEngineService.startTransform( btnConfig.additionData, this.threeEngineService.selected3DObj );
            this.hideChildren();
            break;
          case 'editButton':
            this.showChildren( dataid );
            this.activeToggleClass = btnConfig.toggleClass;
            break;
          case 'singleVertexButton':
            this.threeEngineService.edit3dObject(this.threeEngineService.selected3DObj);
            this.activeToggleClass = btnConfig.toggleClass;
            this.hideChildren();
        }
      }
    }
  }

  toolButtonClosed(dataid: string): void {
    this.hideChildren();
  }

  private hideChildren() {
    this.chidrenVisible = false;
    this.visibleChildren = [];
    this.activeToggleClass = '';
    this.currentClickedButton = '';
  }

  private showChildren(dataid: string): void {
    let btnConfig = this.getButtonConfigById( dataid );
    if ( btnConfig !== null && btnConfig.children !== undefined && btnConfig.children !== null && btnConfig.children.length > 0 ) {
      this.chidrenVisible = true;
      this.visibleChildren = btnConfig.children;
    }
  }

  private getButtonConfigById( dataid: string, buttonConfigs: ButtonConfig[] = this.buttons ): ButtonConfig {
    let totalBtnConfigs: number = buttonConfigs.length;
    for (let buttonsCnt = 0; buttonsCnt < totalBtnConfigs; buttonsCnt++) {
      if ( buttonConfigs[ buttonsCnt ].id === dataid ) {
        return buttonConfigs[ buttonsCnt ];
      } else if ( buttonConfigs[ buttonsCnt ].children !== undefined &&
                  buttonConfigs[ buttonsCnt ].children !== null &&
                  buttonConfigs[ buttonsCnt ].children.length > 0 ) {
        let childButtonConfig: ButtonConfig = this.getButtonConfigById( dataid, buttonConfigs[ buttonsCnt ].children );
        if ( childButtonConfig !== null ) {
          return childButtonConfig;
        }
      }
    }
    return null;
  }

}
