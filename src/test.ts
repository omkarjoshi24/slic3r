/**
 * File: /Users/omkarjoshi/Development/slic3r/src/test.ts
 * Project: slic3r
 * Created Date: Thursday, March 21st 2019, 8:16:57 pm
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

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
