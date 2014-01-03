var canvas, ctx;
window.onload = function(){
    canvas = document.getElementById("image");
    ctx = canvas.getContext("2d");
    
    canvas.width = 300;
    canvas.height = 300;
    
    var imageOb = new Image();
    imageOb.onload = function() {
        ctx.drawImage(this, 0, 0);
        
        var imageOb2 = new Image();
        imageOb2.onload = function() {
            
            var hc = new HUE_Changer();
            var imageObj = ctx.getImageData(0, 0, canvas.width, canvas.height);
            console.log(imageObj);
            function input_change(){
                var hue = parseInt(document.getElementById('hue').value);
                var image = hc.change_hue({
                    image: imageObj,
                    image_width: canvas.width,
                    image_height: canvas.height,
                    pixels_map: {
                        type: "IMAGE",
                        map: imageOb2
                    },
                    hue: hue
                });
                
                document.getElementById("hue_out").value = 'Hue value: '+hue;
                imageObj.data = image;
                ctx.putImageData(imageObj, 0, 0);
            }
            document.getElementById("hue_form").oninput = function(){
                input_change();
            };
        };
        imageOb2.src = 'test-3-mask.png';
    };
    imageOb.src = 'test-3.png';
};
