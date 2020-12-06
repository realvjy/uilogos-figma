figma.showUI(__html__, { width: 260, height: 340 })

figma.ui.onmessage = msg => {
        console.log("Clicked yes", msg)
    
    //   figma.closePlugin()
}
