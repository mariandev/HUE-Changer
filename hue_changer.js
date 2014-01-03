var HUE_Changer = function(){
    function rgbToHsl(r, g, b){
        r /= 255, g /= 255, b /= 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;
    
        if(max == min){
            h = s = 0; // achromatic
        }else{
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max){
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
    
        return [h, s, l];
    }
    function hslToRgb(h, s, l){
        var r, g, b;
    
        if(s == 0){
            r = g = b = l; // achromatic
        }else{
            function hue2rgb(p, q, t){
                if(t < 0) t += 1;
                if(t > 1) t -= 1;
                if(t < 1/6) return p + (q - p) * 6 * t;
                if(t < 1/2) return q;
                if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            }
    
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
    
        return [r * 255, g * 255, b * 255];
    }
    this.change_hue = function(options){
        var map = options.pixels_map || false;
        if(!map) return (new Error("Please provide a valid `image map`."));
        var map_type = map.type;
            map = map.map;
        var image = options.image;
        var image_type = Object.prototype.toString.call( image );
        var image_width = options.image_width;
        var image_height = options.image_height;
        
        if(image_type === "[object ImageData]"){
            image = image.data;
        }
        else if(image_type === "[object HTMLImageElement]"){
            var pcanvas = document.createElement("canvas");
                pcanvas.width = image.width;
                pcanvas.height = image.height;
            var pctx = pcanvas.getContext("2d");
            ctx.drawImage(image, 0, 0);
            image = (ctx.getImageData(0, 0, canvas.width, canvas.height)).data;
            delete pcanvas;
            delete pctx;
        }
        else if(image_type !== "[object Uint8ClampedArray]"){
            return (new Error("Please provide a valid image"));
        }
        
        if(Object.prototype.toString.call( map ) === "[object ImageData]"){
            map = map.data;
        }
        else if(Object.prototype.toString.call( map ) === "[object HTMLImageElement]"){
            var pcanvas = document.createElement("canvas");
                pcanvas.width = map.width;
                pcanvas.height = map.height;
            var pctx = pcanvas.getContext("2d");
            ctx.drawImage(map, 0, 0);
            map = (ctx.getImageData(0, 0, canvas.width, canvas.height)).data;
            delete pcanvas;
            delete pctx;
        }
        else if(image_type !== "[object Uint8ClampedArray]"){
            return (new Error("Please provide a valid `image map`"));
        }
        
        if(map_type === "PIXELS_MAP_BOOL"){
            for(var i=0;i<image.length;i+=4){
                if(map[i/4]){
                    var color = rgbToHsl(image[i], image[i+1], image[i+2]);
                    color[0] = option.hue/360;
                    color = hslToRgb(color[0], color[1], color[2]);
                    image[i  ] = color[0];
                    image[i+1] = color[1];
                    image[i+2] = color[2];
                }
            }
        }else if(map_type === "PIXELS_MAP_HUE"){
            for(var i=0;i<image.length;i+=4){
                if(map[i/4] != -1){
                    var color = rgbToHsl(image[i], image[i+1], image[i+2]);
                    color[0] = map[i/4]/360;
                    color = hslToRgb(color[0], color[1], color[2]);
                    image[i  ] = color[0];
                    image[i+1] = color[1];
                    image[i+2] = color[2];
                }
            }
        }else if(map_type === "PIXELS_ARRAY"){
            for(var i=0;i<map.length;i++){
                var pos = (map[i][1]*image_width + map[i][0])*4;
                var color = rgbToHsl(image[pos], image[pos+1], image[pos+2]);
                color[0] = options.hue/360;
                color = hslToRgb(color[0], color[1], color[2]);
                image[pos  ] = color[0];
                image[pos+1] = color[1];
                image[pos+2] = color[2];
            }
        }else if(map_type === "PIXELS_ARRAY_HUE"){
            for(var i=0;i<map.length;i++){
                var pos = (map[i][1]*image_width + map[i][0])*4;
                var color = rgbToHsl(image[pos], image[pos+1], image[pos+2]);
                color[0] = map[i][2]/360;
                color = hslToRgb(color[0], color[1], color[2]);
                image[pos  ] = color[0];
                image[pos+1] = color[1];
                image[pos+2] = color[2];
            }
        }else if(map_type === "IMAGE"){
            for(var i=0;i<map.length;i+=4){
                if(map[i] != 255 || map[i+1] != 255 || map[i+2] != 255){                var pos = (map[i][0]*image_width + map[i][1])*4;
                    var color = rgbToHsl(image[i], image[i+1], image[i+2]);
                    color[0] = options.hue/360;
                    color = hslToRgb(color[0], color[1], color[2]);
                    image[i  ] = color[0];
                    image[i+1] = color[1];
                    image[i+2] = color[2];
                }

            }
        }else if(map_type === "ALL"){
            for(var i=0;i<image.length;i+=4){
                var color = rgbToHsl(image[i], image[i+1], image[i+2]);
                color[0] = options.hue/360;
                color = hslToRgb(color[0], color[1], color[2]);
                image[i  ] = color[0];
                image[i+1] = color[1];
                image[i+2] = color[2];
            }
        }
        
        return image;
        
    }
};