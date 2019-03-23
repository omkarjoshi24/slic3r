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
