/**
 * File: /Users/omkarjoshi/Development/slic3r/src/app/toolbar/toolbar.component.ts
 * Project: slic3r
 * Created Date: Friday, March 22nd 2019, 5:41:26 pm
 * Author: Omkar Joshi
 * -----
 * Last Modified: Mon Mar 25 2019
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
    { id: 'addButton', label: 'Add', icon: ['fas', 'plus'], type: 'circle', parent: 'toolbar'},
    { id: 'removeButton', label: 'Delete', icon: ['fas', 'trash-alt'], type: 'circle', parent: 'toolbar'}
  ];

  constructor(private threeEngineService: ThreeEngineService) { }

  ngOnInit() {
  }

  toolButtonClicked(dataid: string) {
    if (dataid !== undefined && dataid !== null && dataid !== '') {
      let objToAdd: string;
      switch ( dataid ) {
        case 'addButton':
          objToAdd = 'cube';
          break;
      }

      if (objToAdd !== undefined && objToAdd !== null && objToAdd !== '') {
        this.threeEngineService.add3DObject(objToAdd);
      }
    }
    
  }
}
