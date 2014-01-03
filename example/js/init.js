var canvas, ctx;
window.onload = function(){
    canvas = document.getElementById("image");
    ctx = canvas.getContext("2d");
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight/2;
    
    var random_hue = Math.floor(Math.random()*360);
    
    var imageOb = new Image();
    imageOb.onload = function() {
        ctx.drawImage(this, 0, 0);
        
        var imageOb2 = new Image();
        imageOb2.onload = function() {
        
            document.getElementById("hue").value = random_hue;
            document.getElementById("hue_out").value = random_hue;
            
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
                        //map: [[100,100],[101,100],[102,100],[103,100],[104,100],[105,100]]
                        map: imageOb2
                    },
                    hue: hue
                });
                
                document.getElementById("hue_out").value = hue;
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