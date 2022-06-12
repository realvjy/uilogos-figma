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
    console.log(src, "here");

    const img = imgRef.current;
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = (...args) => reject(args);
    img.src = src + "?new-icon";
    console.log(img.src);
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
export const getLogos = (data) => {
  shuffle(data);
  console.log(data);
};

export const setBg = async (name, url, imgRef, canRef) => {
  const image = await loadImage(`${url}`, imgRef);

  const { imageData, canvas, context } = getImageData(image, canRef);

  const newBytes = await encodeFigma(canvas, context, imageData);

  parent.postMessage(
    {
      pluginMessage: {
        type: "set-bg",
        icoName: name,
        data: { newBytes },
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
export function getFrameSize(originalSize, selectedLayer) {
  // Default dimentions
  var newX = 0;
  var newY = 0;
  var newWidth = 100;
  var newHeight = 100;

  // // Decide the output frame dimension for reference
  // if (isRectangleShape(selectedLayer) || isOvalShape(selectedLayer)) {
  //   newX = selectedLayer.frame().x();
  //   newY = selectedLayer.frame().y();
  //   newWidth = selectedLayer.frame().width();
  //   newHeight = selectedLayer.frame().height();
  // }

  // // // Decide the height and width
  // var ratio = originalSize.height / originalSize.width;

  // var newHeight = newHeight;
  // var newWidth = newHeight / ratio;

  // // Check for portrait logo
  // if (newWidth > selectedLayer.width) {
  //   newWidth = selectedLayer.height;
  //   newHeight = newWidth * ratio;
  // }

  // // Decide location center align with shape
  // var newX =
  //   selectedLayer.frame().x() + (selectedLayer.frame().width() - newWidth) / 2;
  // var newY =
  //   selectedLayer.frame().y() +
  //   (selectedLayer.frame().height() - newHeight) / 2;

  // return CGRectMake(newX, newY, newWidth, newHeight);
}