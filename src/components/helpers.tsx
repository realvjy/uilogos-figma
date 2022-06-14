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

// getLogos
export const getLogos = async (data, imgRef, canRef) => {
  console.log(data);
  shuffle(data);
  console.log(data);

  let count = 4;
  for (let i = 0; i < count; i++) {
    console.log(data[i].URL, "something in loop");
    await setBg("cool", data[i].URL, imgRef, canRef);
  }
};

// Set Image on Figma convas
export const setBg = async (name, url, imgRef, canRef) => {
  const image = await loadImage(`${url}`, imgRef);
  console.log("insideSetBg");

  const { imageData, canvas, context } = getImageData(image, canRef);

  const height = imageData.height;
  const width = imageData.width;
  const newBytes = await encodeFigma(canvas, context, imageData);

  parent.postMessage(
    {
      pluginMessage: {
        type: "set-bg",
        icoName: name,
        data: { newBytes },
        imgSize: { height, width },
      },
    },
    "*"
  );
};

// Shuffle arrary
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

// Frame Size for image repace
export const getFrameSize = (w, h, node) => {
  // Default dimentions
  var newX = 0;
  var newY = 0;
  var newWidth = 100;
  var newHeight = 100;

  // // Decide the output frame dimension for reference
  if (node) {
    newX = node.x;
    newY = node.y;
    newWidth = node.width;
    newHeight = node.height;
  }

  // // Decide the height and width
  var ratio = h / w;

  var newHeight = newHeight;
  var newWidth = newHeight / ratio;

  // Check for portrait logo
  if (newWidth > node.width) {
    newWidth = node.height;
    newHeight = newWidth * ratio;
  }

  // Decide location center align with shape
  newX = node.x + (node.width - newWidth) / 2;
  newY = node.y + (node.height - newHeight) / 2;

  return { newX, newY, newWidth, newHeight };
};

export const fillWithImage = (newBytes, w, h, ratio, node) => {
  console.log("inside fill", node);

  const newFills = [];
  //@ts-ignore
  node.resize(w, h);

  for (const paint of node.fills) {
    const newPaint = JSON.parse(JSON.stringify(paint));
    newPaint.blendMode = "NORMAL";
    newPaint.filters = {
      contrast: 0,
      exposure: 0,
      highlights: 0,
      saturation: 0,
      shadows: 0,
      temperature: 0,
      tint: 0,
    };
    newPaint.imageTransform = [
      [1, 0, 0],
      [0, 1, 0],
    ];
    newPaint.opacity = 1;
    newPaint.scaleMode = "FILL";
    newPaint.scalingFactor = 0.5;
    newPaint.visible = true;
    newPaint.type = "IMAGE";
    delete newPaint.color;
    newPaint.imageHash = figma.createImage(newBytes).hash;
    newFills.push(newPaint);
  }
  // //@ts-ignore
  node.fills = newFills;

  node = [node];
};
