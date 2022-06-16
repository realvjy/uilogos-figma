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
  console.log("inside check");

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
    console.log(selection);
  };
};

// getLogos
export const getLogos = async (data, imgRef, canRef) => {
  shuffle(data);

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
        const image = await loadImage(`${data[i].URL}`, imgRef);

        const { imageData, canvas, context } = getImageData(image, canRef);

        const height = imageData.height;
        const width = imageData.width;
        const name = data[i].Name;

        const imageEncoded = await encodeFigma(canvas, context, imageData);

        let imgBytes = {
          imgBytes: imageEncoded,
          height: height,
          width: width,
          name: name,
        };

        newBytes.push(imgBytes);
      }
      setBg(newBytes);
    }
  };
};

// getLogos
export const getLogo = async (name, url, imgRef, canRef) => {
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
  console.log(newBytes);
  setBg(newBytes);
};

// Set Image on Figma convas
export const setBg = async (imageData) => {
  parent.postMessage(
    {
      pluginMessage: {
        type: "set-bg",
        data: { imageData },
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

  console.log("frame in", h, w);

  // // Decide the output frame dimension for reference
  newX = node.x;
  newY = node.y;
  newWidth = node.width;
  newHeight = node.height;

  // // Decide the height and width
  var ratio = w / h;

  var newHeight = newHeight;
  var newWidth = newHeight * ratio;

  console.log("node h/w", newHeight, newWidth);
  // // Decide location center align with shape
  newX = node.x + (node.width - newWidth) / 2;
  newY = node.y + (node.height - newHeight) / 2;

  return { newX, newY, newWidth, newHeight };
};

export const fillWithImage = (newBytes, w, h, node) => {
  const newFills = [];

  //@ts-ignore
  node.resize(w, h);
  console.log(w, h);

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
