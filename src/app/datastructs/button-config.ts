/**
 * File: /Users/omkarjoshi/Development/slic3r/src/app/datastructs/button-config.ts
 * Project: slic3r
 * Created Date: Monday, March 25th 2019, 5:11:31 pm
 * Author: Omkar Joshi
 * Desription:
 * Class to define button configuration. Instance of this class will be used when 
 * providing button configuration to all toolbar, menubar and bottom bar
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

export class ButtonConfig {
    id: string;
    label: string;
    icon: string[];
    type: string;
    parent: string;
}
