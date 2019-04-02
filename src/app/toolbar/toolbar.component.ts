/**
 * File: /Users/omkarjoshi/Development/slic3r/src/app/toolbar/toolbar.component.ts
 * Project: slic3r
 * Created Date: Friday, March 22nd 2019, 5:41:26 pm
 * Author: Omkar Joshi
 * -----
 * Last Modified: Mon Apr 01 2019
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
      icon: ['fas', 'plus'],
      type: 'circle',
      parent: 'toolbar',
      children: [
        { id: 'backButton', label: 'Back', icon: ['fas', 'arrow-left'], type: 'circle', parent: 'addButton' },
        { id: 'cubeButton', label: 'Cube', icon: ['fas', 'cube'], type: 'circle', parent: 'addButton' },
        { id: 'sphereButton', label: 'Sphere', icon: ['fas', 'circle'], type: 'circle', parent: 'addButton' },
        { id: 'cylinderButton', label: 'Cylinder', icon: ['fas', 'compact-disc'], type: 'circle', parent: 'addButton' },
        { id: 'icosahedronButton', label: 'Icosahedron', icon: ['fas', 'compact-disc'], type: 'circle', parent: 'addButton' },
        { id: 'torusButton', label: 'Icosahedron', icon: ['fas', 'compact-disc'], type: 'circle', parent: 'addButton' },
        { id: 'coneButton', label: 'Cone', icon: ['fas', 'compact-disc'], type: 'circle', parent: 'addButton' },
        { id: 'dodecahedronButton', label: 'Dodecahedron', icon: ['fas', 'compact-disc'], type: 'circle', parent: 'addButton' },
      ]},
    { id: 'removeButton', label: 'Delete', icon: ['fas', 'trash-alt'], type: 'circle', parent: 'toolbar',
      hideCondition: 'this.threeEngineService.selected3DObj === null' },
    { id: 'transformButton',
      label: 'Transform',
      icon: ['fas', 'expand'],
      type: 'circle',
      parent: 'toolbar',
      children: [
        { id: 'backButton', label: 'Back', icon: ['fas', 'arrow-left'], type: 'circle', parent: 'addButton' },
        { id: 'translateButton', label: 'Translate', icon: ['fas', 'expand-arrows-alt'], type: 'circle', parent: 'transformButton'},
        { id: 'scaleButton', label: 'Scale', icon: ['fas', 'arrows-alt-h'], type: 'circle', parent: 'transformButton'},
        { id: 'rotateButton', label: 'Rotate', icon: ['fas', 'sync-alt'], type: 'circle', parent: 'transformButton'}
      ],
      hideCondition: 'this.threeEngineService.selected3DObj === null' }
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
          break;
        case 'sphereButton':
          this.threeEngineService.add3DObject('sphere');
          break;
        case 'translateButton':
          this.threeEngineService.startTransform('translate', this.threeEngineService.selected3DObj);
          break;
        case 'scaleButton':
          this.threeEngineService.startTransform('scale', this.threeEngineService.selected3DObj);
          break;
        case 'rotateButton':
          this.threeEngineService.startTransform('rotate', this.threeEngineService.selected3DObj);
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
