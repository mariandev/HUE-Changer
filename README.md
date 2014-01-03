HUE-Changer
===========

HUE Changer is a small library (only 3KB minified) that can change colors from an image dynamically.

Docs
====

You can initialize Hue Changer like this:

var hc = new Hue_changer();

After that you can use the function `change` to modify the colors in your images

var new_image = hc.change(options);

Instead of the `options` you will have to provide a JSON Object:

{
    image: this could be an image element , or ImageData ( resulted from the canvas' function .getImageData() ) or the image data from ImageData,
    image_width: the width of the image,
    image_height: the height of the image,
    pixels_map: {
        type: this option can take multiple values (detailed explanation below): `PIXELS_MAP_BOOL`, `PIXELS_MAP_HUE`, `PIXELS_ARRAY`, `PIXELS_ARRAY_HUE`, `IMAGE`, `ALL`
        map: the value depends on the type
    },
    hue: this is a number from 0 to 360 which is the hue with which the colors will change
}

Pixel Map Types:
================

`PIXEL_MAP_BOOL` - for this type the `map` value will be an array with the size of image_width*image_height in which every bool value is associated with a pixel from the image. If on a random position the value is `false` that means that that pixel's color will not be changed , and if it is `true` the pixel's color will be changed. This type replaces the color with the specified `hue` value.
`PIXEL_MAP_HUE` - for this type the `map` value will be an array with the size of image_width*image_height in which every number value is associated with a pixel from the image. If on a random position the value is `-1` that means that that pixel's color will not be changed , and if it is a number between 0 and 360 the pixel's color will be changed with that value. (the `hue` is not required)
`PIXELS_ARRAY` - for this type the `map` value will be an array with the pixels positions that color will be changed with the `hue` value. The elements from the array should look like [x, y] where x and y are the positions of the pixel that color's you want to be changed.
`PIXELS_ARRAY_HUE` - for this type the `map` value will be an array with the pixels positions that color will be changed. The elements from the array should look like [x, y, hue] where x and y are the positions of the pixel that color's you want to be changed and the hue is a number from 0 to 360 with which the pixels's color will be changed.
`IMAGE` - for this type the `map` value will be an image element , ImageData ( resulted from the canvas' function .getImageData() ) or the image data from ImageData. This is actually a mask which sais thatthe color ofevery pixel that is not white (in the mask) should be changed with the `hue` value.
`ALL` - for this type the `map` is not required , because every pixels' color will be changed.