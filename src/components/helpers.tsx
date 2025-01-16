// Get image and return image data to add on figma

export const getImageData = (image, canvasRef) => {
  const canvas = canvasRef.current;

  canvas.width = image.width;
  canvas.height = image.height;
  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0);
  return {
    imageData: context.getImageData(0, 0, image.width, image.height),
    canvas,
    context,
  };
};

// Load image from the view
export const loadImage = async (src, imgRef) =>
  new Promise((resolve, reject) => {
    const img = imgRef.current;
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = (...args) => reject(args);
    img.src = src + "?uilogos";
  });

// Encode image to object to upload on figma
export async function encodeFigma(canvas, ctx, imageData) {
  ctx.putImageData(imageData, 0, 0);

  return await new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      const reader = new FileReader();
      //@ts-ignore
      reader.onload = () => resolve(new Uint8Array(reader.result));
      reader.onerror = () => reject(new Error("Could not read from blob"));
      reader.readAsArrayBuffer(blob);
    });
  });
}

export const checkSelection = (logoCount) => {
  //@ts-ignore
  parent.postMessage(
    {
      pluginMessage: {
        type: "get-all",
        total: { logoCount },
      },
    },
    "*"
  );
  onmessage = (event) => {
    const selection = event.data.pluginMessage;
  };
};

// getLogos
export const getLogos = async (data, imgRef, canRef) => {
  shuffle(data);

  console.log(data);

  //@ts-ignore
  parent.postMessage(
    {
      pluginMessage: {
        type: "check-selection",
        total: { data },
      },
    },
    "*"
  );

  onmessage = async (event) => {
    var totalSelection = event.data.pluginMessage;
    var newBytes = [];
    if (totalSelection) {
      for (let i = 0; i < totalSelection; i++) {
        const image = await loadImage(`${data[i].url}`, imgRef);

        const { imageData, canvas, context } = getImageData(image, canRef);

        const height = imageData.height;
        const width = imageData.width;
        const name = data[i].name;

        const imageEncoded = await encodeFigma(canvas, context, imageData);

        let imgBytes = {
          imgBytes: imageEncoded,
          height: height,
          width: width,
          name: name,
        };

        newBytes.push(imgBytes);
      }
      setBg(newBytes, "random");
    }
  };
};

// getLogo single
export const getLogo = async (name, url, imgRef, canRef) => {

  console.log("what url", url);

  const image = await loadImage(url, imgRef);
  var newBytes = [];
  const { imageData, canvas, context } = getImageData(image, canRef);

  const height = imageData.height;
  const width = imageData.width;

  const imageEncoded = await encodeFigma(canvas, context, imageData);

  let imgBytes = {
    imgBytes: imageEncoded,
    height: height,
    width: width,
    name: name,
  };
  newBytes.push(imgBytes);
  setBg(newBytes, "single");
};

export const getLogoWithPos = async (name, url, imgRef, canRef, pos) => {


  const image = await loadImage(url, imgRef);
  var newBytes = [];
  const { imageData, canvas, context } = getImageData(image, canRef);

  const height = imageData.height;
  const width = imageData.width;

  const imageEncoded = await encodeFigma(canvas, context, imageData);

  let imgBytes = {
    imgBytes: imageEncoded,
    height: height,
    width: width,
    name: name,
    pos: pos
  };
  newBytes.push(imgBytes);
  setBg(newBytes, "single");
};

// Set Image on Figma convas
export const setBg = async (imageData, fillType) => {
  parent.postMessage(
    {
      pluginMessage: {
        type: "set-bg",
        data: { imageData },
        fillType: fillType,
      },
    },
    "*"
  );
};

// Shuffle arrary (logo data)
export const shuffle = (array) => {
  var currentIndex = array.length;
  var tempValue = 0;
  var randomIndex = 0;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    tempValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = tempValue;
  }

  return array;
};

/**
 * Resize Shape <Rectangle, Circle....> Node
 * @param node, height, width
 * return new X, Y, H, W
 */
export const getFrameSize = (w, h, node) => {
  // Default dimentions
  var newX = 0;
  var newY = 0;
  var newWidth = 100;
  var newHeight = 100;

  // // Decide the output frame dimension for reference
  newX = node.x;
  newY = node.y;
  newWidth = node.width;
  newHeight = node.height;

  // // Decide the height and width
  var ratio = w / h;

  var newHeight = newHeight;
  var newWidth = newHeight * ratio;

  // // Decide location center align with shape
  newX = node.x + (node.width - newWidth) / 2;
  newY = node.y + (node.height - newHeight) / 2;

  return { newX, newY, newWidth, newHeight };
};

// Fill node with Image
export const fillWithImage = (newBytes, w, h, node) => {
  const newFills = [
    {
      type: "IMAGE",
      opacity: 1,
      scaleMode: "FILL",
      blendMode: "NORMAL",
      imageTransform: [
        [1, 0, 0],
        [0, 1, 0],
      ],
      imageHash: figma.createImage(newBytes).hash,
    },
  ];

  //@ts-ignore
  //Fix errorr with Sticky resizing on figjam
  if (node.type !== "STICKY") {
    node.resize(w, h);
  }

  // //@ts-ignore
  node.fills = [{ type: "SOLID", color: { r: 0.85, g: 0.85, b: 0.85 } }]; // create fill for non border

  // //@ts-ignore
  node.fills = newFills;

  node = [node];
};

// Fix Node Type Issue
// Group Node and Section not work properly with fill
export const checkNode = (node) => {
  const type = node.type;

  if (type === "GROUP" || type === "SECTION") {
    return false;
  }
  return true;
};
