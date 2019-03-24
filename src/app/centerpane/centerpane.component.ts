/**
 * File: /Users/omkarjoshi/Development/slic3r/src/app/centerpane/centerpane.component.ts
 * Project: slic3r
 * Created Date: Friday, March 22nd 2019, 5:37:53 pm
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

import { Component, OnInit } from '@angular/core';
import { ThreeEngineService } from '../threeengine/threeengine.service';

@Component({
  selector: 'app-center-pane',
  templateUrl: './centerpane.component.html',
  styleUrls: ['./centerpane.component.scss']
})
export class CenterPaneComponent implements OnInit {
  private canvasEleId = 'renderCanvas';

  constructor(private threeEngineServ: ThreeEngineService) { }

  ngOnInit() {
    this.threeEngineServ.createScene(this.canvasEleId);
  }

}
