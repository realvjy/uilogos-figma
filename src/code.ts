// This plugin will add uilogos from uilogos.co to your artboard

import { encodeFigma, fillWithImage, getFrameSize, getImageData, loadImage, shuffle } from "./components/helpers";

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
    
    if (msg.type === 'check-selection') {
      console.log('checking');
      let count = figma.currentPage.selection.length;
      if(count > 0){
        figma.ui.postMessage(count)
        return;
      }
      figma.notify('Select atleast one shape')
      return;
    }
    
    if (msg.type === 'set-bg') {
        
      // Playground
      console.log(msg.data);

      // Enode data

      let node = figma.currentPage.selection[0];
      let totalSelection = figma.currentPage.selection.length;

        if (!node) {
          //@ts-ignore
          node = figma.createRectangle();
          const newBytes: Uint8Array = msg.data.imageData[0].imgBytes;
          let name = msg.data.imageData[0].name;
          let h = msg.data.imageData[0].height;
          let w = msg.data.imageData[0].width;
          node.resize(w,h);
          node.name = name;
          node.x = Math.round(figma.viewport.center.x - node.width / 2);
          node.y = Math.round(figma.viewport.center.y - node.height / 2);
          fillWithImage(newBytes, w, h,  node);
          
          figma.notify(' \' ' + name + '\' added from uiLogos' );
        } else {
          console.log(totalSelection);
        
          for (let i = 0; i < totalSelection; i++) {
            const newBytes: Uint8Array = msg.data.imageData[i].imgBytes;
            let name = msg.data.imageData[i].name;
            let h = msg.data.imageData[i].height;
            let w = msg.data.imageData[i].width;
            const { newX, newY, newWidth, newHeight } = getFrameSize(w, h, node);
            
            let nodeN = figma.currentPage.selection[i]
            console.log(nodeN);
            console.log(newBytes);
            
            nodeN.name = name;
            fillWithImage(newBytes, newWidth, newHeight,  nodeN);
          }
          figma.notify(' \' ' + totalSelection + '\' logos added from uiLogos' );
        }
        
       
    
        return;
    }

    //   figma.closePlugin()
}
