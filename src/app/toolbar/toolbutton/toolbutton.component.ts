/**
 * File: /Users/omkarjoshi/Development/slic3r/src/app/toolbar/toolbutton/toolbutton.component.ts
 * Project: slic3r
 * Created Date: Friday, March 22nd 2019, 5:55:20 pm
 * Author: Omkar Joshi
 * Desription:
 * Toolbar button To perform various actions on scene
 * 
 * -----
 * Last Modified: Mon Mar 25 2019
 * Modified By: Omkar Joshi
 * -----
 * Copyright (c) 2019 Omkar Joshi
 * 
 * -----
 * HISTORY:
 * Date                 			By   		Comments
 * ---------------------	-----	----------------------------------------------------------
 */

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { icon } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-tool-button',
  templateUrl: './toolbutton.component.html',
  styleUrls: ['./toolbutton.component.scss']
})
export class ToolButtonComponent implements OnInit {
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

  /**
   * @emits button click event emitter trigger when tool button is clicked
   */
  @Output() buttonClicked: EventEmitter<string> = new EventEmitter();

  /**
   * Creates an instance of tool button component.
   */
  constructor() { }

  /**
   * on init
   */
  ngOnInit() {
  }

  onButtonClicked() {
    this.buttonClicked.emit(this.dataid);
  }

}
