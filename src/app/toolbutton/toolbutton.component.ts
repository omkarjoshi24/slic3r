/**
 * File: /Users/omkarjoshi/Development/slic3r/src/app/toolbar/toolbutton/toolbutton.component.ts
 * Project: slic3r
 * Created Date: Friday, March 22nd 2019, 5:55:20 pm
 * Author: Omkar Joshi
 * Desription:
 * Toolbar button To perform various actions on scene
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

import { Component, OnInit, Input, Output, EventEmitter, SimpleChange, OnChanges } from '@angular/core';
import { ThreeEngineService } from '../threeengine/threeengine.service';

@Component({
  selector: 'app-tool-button',
  templateUrl: './toolbutton.component.html',
  styleUrls: ['./toolbutton.component.scss']
})
export class ToolButtonComponent implements OnInit, OnChanges {
  /**
   * label for tool button
   */
  @Input() label: string;
  /**
   * icon string array for tool icon
   */
  @Input() icon: string[];
  /**
   * A unique id for this button
   */
  @Input() dataid: string;
  /**
   * type of a tool button
   */
  @Input() type: string;

  @Input() isFontAwesomeIcon: boolean;

  @Input() showLabel: boolean;

  @Input() togglable: boolean;

  @Input() isToggled: boolean = false;
  
  /**
   * condotion for hiding this this button
   */
  @Input() hideCondition: string = 'true';

  /**
   * @emits button click event emitter trigger when tool button is clicked
   */
  @Output() buttonClicked: EventEmitter<string> = new EventEmitter();

  @Output() buttonClosed: EventEmitter<string> =  new EventEmitter();

  /**
   * Creates an instance of tool button component.
   */
  constructor(private threeEngineService: ThreeEngineService) { }

  /**
   * on init
   */
  ngOnInit() {

  }

  isHidden(): boolean {
    if (this.hideCondition !== undefined && this.hideCondition !== null && eval(this.hideCondition) === true) {
      return true;
      this.isToggled = false;
    }
    return false;
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}): void {
    const propName = 'isToggled';
    let changedProp = changes[propName];
    if (changedProp) {
      let newVal = JSON.stringify(changedProp.currentValue);
      let preVal = JSON.stringify(changedProp.previousValue);
      if (!changedProp.isFirstChange()) {
        if (newVal !== preVal) {
          if (!newVal || newVal === 'false') {
            this.buttonClosed.emit(this.dataid);
          } else {
            this.buttonClicked.emit(this.dataid);
          }
        }
      }
    }
  }

  onButtonClicked() {
    if (this.togglable) {
      if (!this.isToggled) {
        this.buttonClicked.emit(this.dataid);
      } else {
        this.buttonClosed.emit(this.dataid);
      }
      this.isToggled = !this.isToggled;
    } else {
      this.buttonClicked.emit(this.dataid);
    }
  }
}
