function main() {

    // make sure that only one object is selected
    if (figma.currentPage.selection.length !== 1) {
      figma.closePlugin("Select one object")
      return
    }
  
    // save selected object name
    var savedName = figma.currentPage.selection[0].name
  
    // callback function for findAll
    // checks if name of node is same as saved name
    function isSameName(node) {
        return node.name === savedName
    }
  
    // save an array of all object with same name
    var nodesWithSameName = figma.currentPage.findAll(isSameName)
  
    // Select all object with same name
    figma.currentPage.selection = nodesWithSameName
  
    figma.closePlugin("Objects selected") // close plugin
  }
  
  main()
  