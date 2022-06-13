// This plugin will add uilogos from uilogos.co to your artboard

import { fillWithImage, shuffle } from "./components/helpers";

// Show the plugin UI
figma.showUI(__html__, {
    width: 275,
    height: 340,
    themeColors: true
  }
);


console.log('uilogos running...');

//  Message received
figma.ui.onmessage = (msg) => {

    if (msg.type === 'notify') {
        figma.notify(msg.data.message);
        return;
    }
    

    
    // shuffle(msg.type.data);
    if (msg.type === 'set-bg') {
        
        const newBytes: Uint8Array = msg.data.newBytes;
        console.log(newBytes);
        
        let node = figma.currentPage.selection[0];
        
        let totalSelection = figma.currentPage.selection.length;

        if (totalSelection > 1) {
          for (let i = 0; i < totalSelection; i++) {
            let nodeN = figma.currentPage.selection[i]
            fillWithImage(newBytes, 1, nodeN);
          }
        }
        console.log(msg.imgSize.height);
        console.log(msg.imgSize.width);
        //@ts-ignore
        node.resize(msg.imgSize.width,msg.imgSize.height);

      

        // if (!node) {
        //   node = figma.createRectangle();
        //   node.resize(800, 800)
        //   node.x = Math.round(figma.viewport.center.x - node.width / 2);
        //   node.y = Math.round(figma.viewport.center.y - node.height / 2);
        // }
        
        // const newFills = []
        // //@ts-ignore
        // for (const paint of node.fills) {
        //   const newPaint = JSON.parse(JSON.stringify(paint))
        //   newPaint.blendMode = "NORMAL"
        //   newPaint.filters = {
        //     contrast: 0,
        //     exposure: 0,
        //     highlights: 0,
        //     saturation: 0,
        //     shadows: 0,
        //     temperature: 0,
        //     tint: 0,
        //   }
        //   newPaint.imageTransform = [
        //     [1, 0, 0],
        //     [0, 1, 0]
        //   ]
        //   newPaint.opacity = 1
        //   newPaint.scaleMode = "FILL"
        //   newPaint.scalingFactor = 0.5
        //   newPaint.visible = true
        //   newPaint.type = "IMAGE"
        //   delete newPaint.color
        //   newPaint.imageHash = figma.createImage(newBytes).hash
        //   newFills.push(newPaint)
        // }
        // //@ts-ignore
        
        // node.fills = newFills
        // // console.log(figma.viewport.center.x, figma.viewport.center.y );
    
        // figma.currentPage.selection = [node];
        
        figma.notify(msg.icoName + ' added from uiLogos' );
    
        return;
    }

    //   figma.closePlugin()
}
