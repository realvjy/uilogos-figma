// This plugin will add uilogos from uilogos.co to your artboard
// Update: 19 Jun 2022

import { checkNode, fillWithImage, getFrameSize } from "./components/helpers";

// Show the plugin UI
figma.showUI(__html__, {
    width: 275,
    height: 400,
    themeColors: true
  }
);


console.log('uilogos running...');

figma.ui.onmessage = (msg) => {

    if (msg.type === 'check-selection') {
     
      let count = figma.currentPage.selection.length;
      let dataCount = msg.total.data.length;
      if(count > 0){
        // Fixed errror for group and section node
        if(checkNode(figma.currentPage.selection[0])){
          if(dataCount >= count){
            figma.notify('⌛️ loading...');
            console.log('⌛️ loading...');
            figma.ui.postMessage(count)
            return;
          } else {
            figma.notify('🚨 Select max '+dataCount+ ' shape(s) or vector(s)', {timeout:1500})
            return;
          }
        }
      }
      figma.notify('🚨 Select any shape(s) [Rectangle, Ellipse, Star, Line or Any Vector(s)]', {timeout:1500})
      return;
    }
    
    if (msg.type === 'set-bg') {

      let node = figma.currentPage.selection[0];
      let totalSelection = figma.currentPage.selection.length;

        if(msg.fillType === 'random'){
          try {
            for (let i = 0; i < totalSelection; i++) {
              // Fixed errror for group and section node
              //@ts-ignore
              if(!checkNode(figma.currentPage.selection[i])){
                // Fixed error for section error and group
                figma.notify('🚨 Not worked for section and group. Select any shape(s) or vector(s)', {timeout:1200});
                i++;
              }
              const newBytes: Uint8Array = msg.data.imageData[i].imgBytes;
              let name = msg.data.imageData[i].name;
              let h = msg.data.imageData[i].height;
              let w = msg.data.imageData[i].width;
              const { newX, newY, newWidth, newHeight } = getFrameSize(w, h, node);
              let nodeN = figma.currentPage.selection[i]
              
              nodeN.name = name;
              fillWithImage(newBytes, newWidth, newHeight,  nodeN);
            }
            figma.notify(totalSelection + ' logos added from uiLogos', {timeout:1200});
            return;
          } catch (error) {
            console.log('Not worked for section node and group');
          }

        }

        if(msg.fillType === 'single'){
          let name = msg.data.imageData[0].name;
          let h = msg.data.imageData[0].height;
          let w = msg.data.imageData[0].width;
          if (!node) {
            //@ts-ignore
            node = figma.createRectangle();
            const newBytes: Uint8Array = msg.data.imageData[0].imgBytes;
            
            node.resize(w,h);
            node.name = name;
            node.x = Math.round(figma.viewport.center.x - node.width / 2);
            node.y = Math.round(figma.viewport.center.y - node.height / 2);
            fillWithImage(newBytes, w, h,  node);
            figma.notify(' \' ' + name + '\' added from uiLogos', {timeout: 1200} );
            return;
          } 

          for (let i = 0; i < totalSelection; i++) {
            const newBytes: Uint8Array = msg.data.imageData[0].imgBytes;

            //@ts-ignore
            if(!checkNode(figma.currentPage.selection[i])){
              // Fixed error for section error and group
                figma.notify('🚨 Not worked for section and group. Select any shape or vector(s)', {timeout:1200});
                return;
            }

            const { newX, newY, newWidth, newHeight } = getFrameSize(w, h, node);
            let nodeN = figma.currentPage.selection[i]
            
            nodeN.name = name;
            fillWithImage(newBytes, newWidth, newHeight,  nodeN);
          }
          //@ts-ignore
          figma.notify(' \' ' + name + '\' added from uiLogos' );
          return;
        }
        
    }

    //   figma.closePlugin()
}
