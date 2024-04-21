# Picsart Challenge

This is a web application for the Picsart Challenge.

The app was made with NextJS, Typescript and vanilla CSS. It is hosted on vercel so you can check a live demo [here](https://picsart-challenge.vercel.app/).

![sketching](./public/docs/shot.png)

### Contents
- [Picsart Challenge](#picsart-challenge)
    - [Contents](#contents)
    - [How to run](#how-to-run)
    - [Features](#features)
    - [Approach](#approach)
      - [1. Sketching](#1-sketching)
      - [2. Getting the Image Data](#2-getting-the-image-data)
      - [3. Color Picker Preview](#3-color-picker-preview)
      - [4. Follow the Mouse](#4-follow-the-mouse)

### How to run

1. Clone the repository
2. Install dependencies
   ```sh
   npm install
   ```
3. Run the application
    ```sh
   npm run dev
   ```

### Features
**Technical Requirements**
- [x] **_"Usage of Canvas"_** 
  - The HTML canvas tag was used in the main working are and for the preview.
- [x] **_"Usage of Typescript"_**
  - The project was written in Typescript..
- [x] **_"Being able to work with at least 16 MB(4000 * 4000) canvas"_**
  -  The projects handdles large images, it is possible to zoom in/out and pan to fit the images in the canvas.

**Extra features**
- **Color comparison**: When hovering over a color, it will show the hovering color next to the last current color so it's easy to compare.
- **Image Selection**: There's is a select that allows the user to select an image from the list of images.
- **Copy to clipboard**: The user can copy the color picker hexadecimal value to clipboard.

### Approach

#### 1. Sketching
Before starting to code, I did some sketching to get a better idea of the requirements and make important decisions, like app layout, canvas position and preview size.

![sketching](./public/docs/sketching.png)

#### 2. Getting the Image Data
In order to get the pixels colors of the image, first, I'm getting the mouse position inside the canvas

![mouse-position](./public/docs/mouse-position.png)

Then, I defined the area of the canvas that I want to get the pixels colors, in this case, it's a matrix of NxN pixels.

![hover-area](./public/docs/hover-area.png)

After getting all pixels data from the hovering area, I parse the Uint8ClampedArray to an array of hexadecimal colors.

#### 3. Color Picker Preview
I tried to used a grid of divs to show the illusion of zooming in the image's pixels, but performance was not good enough, so I decided to use a canvas to draw the pixels instead.

After the Uint8ClampedArray is parsed, I draw the pixels to the canvas and updated them every time the mouse moves.

After that, I clip the element with a circle and add the SVG ring on top of it.

![preview](./public/docs/preview.png) 

#### 4. Follow the Mouse
The only thing left was following the mouse. The preview is moved every time the mouse updates it's position, it transitions with a small delay of 20ms that makes it smoother.

![follow-mouse](./public/docs/follow-mouse.png) 
