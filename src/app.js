(function () {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        slider = document.getElementById("scale-range"),
        watermarkCanvas = document.getElementById("watermark-canvas"),
        watermarkContext = watermarkCanvas.getContext("2d"),
        font_weight = document.getElementById('font_weight'),
        font_weight_V = document.getElementById('font_weight_V'),
        font_color = document.getElementById('font_color'),
        font_color_V = document.getElementById('font_color_V'),
        drawFontWeight = font_weight.value,
        drawFontColor = font_color.value,
        input = document.getElementById('input'),
        WannaText = input.value || "请输入",
        WannaImg = document.getElementById('img').value || './s1.jpg',
        btn = document.getElementById('btn'),
        image = new Image(),
        scale = 0.4,
        cav_width = document.getElementById('cav_width'),
        cav_width_V = document.getElementById('cav_width_V'),
        cav_height = document.getElementById('cav_height'),
        cav_height_V = document.getElementById('cav_height_V'),
        font_x = document.getElementById('font_x'),
        font_y = document.getElementById('font_y'),
        font_x_V = document.getElementById('font_x_V'),
        font_y_V = document.getElementById('font_y_V');

    var CANVAS_WIDTH = 400,
          CANVAS_HEIGHT = 400,
          WATERMARKCANVAS_WIDTH = 1152,
          WATERMARKCANVAS_HEIGHT = 768,
          FONT_X = CANVAS_WIDTH/2,
          FONT_Y = CANVAS_HEIGHT - 100;

    MyAddEventListner = function (obj, ev, fn) {
      return obj.addEventListener(ev, fn);
    }

    //setup watermark canvas
    function drawWatermark(drawFontWeight, drawFontColor, WannaText) {
        watermarkCanvas.width = CANVAS_WIDTH;
        watermarkCanvas.height = CANVAS_HEIGHT;
        watermarkContext.font = "bold "+ drawFontWeight + "px" +" Arial"
        watermarkContext.lineWidth = drawFontWeight;
        watermarkContext.fillStyle = drawFontColor;
        watermarkContext.textBaseline = "middle";
        watermarkContext.fillText( "" +WannaText , FONT_X , FONT_Y);
    }

    function drawImage( image , scale , drawFontWeight, drawFontColor, WannaText){

        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        imageWidth = WATERMARKCANVAS_WIDTH * scale
        imageHeight = WATERMARKCANVAS_HEIGHT * scale
        x = canvas.width /2 - imageWidth / 2
        y = canvas.height / 2 - imageHeight / 2
        drawWatermark(drawFontWeight, drawFontColor, WannaText);
        context.clearRect( 0 , 0 , canvas.width , canvas.height );
        context.fillStyle="#ffffff";
        context.fillRect(0 , 0 , canvas.width , canvas.height);
        context.drawImage( image , x , y , imageWidth , imageHeight );
        context.drawImage( watermarkCanvas , canvas.width - watermarkCanvas.width ,
                                               canvas.height - watermarkCanvas.height )
    }


    font_weight.addEventListener('change', function(e) {
        font_weight_V.innerText = this.value;
        drawFontWeight = this.value;
        update(context, drawFontWeight, drawFontColor, WannaText);
    })

    font_color.addEventListener('change', function(e) {
        font_color_V.innerText = this.value;
        drawFontColor = this.value;
        update(context, drawFontWeight, drawFontColor, WannaText);

    });

    input.addEventListener('change', function(e) {
        console.log(this.value);
        WannaText = this.value;
        update(context, drawFontWeight, drawFontColor, WannaText);
    })

    slider.addEventListener('change', function(){
        scale = slider.value;
        update(context, drawFontWeight, drawFontColor, WannaText);
    })

    btn.addEventListener('click', function(){
         WannaImg = document.getElementById('img').value || './s1.jpg';
         update(context, drawFontWeight, drawFontColor, WannaText);
    })

    cav_height.addEventListener('change', function () {
      CANVAS_HEIGHT = this.value;
      cav_height_V.innerText = this.value
      update(context, drawFontWeight, drawFontColor, WannaText);
    })
    
    cav_width.addEventListener('change', function () {
      CANVAS_WIDTH = this.value;
      cav_width_V.innerText = this.value
      update(context, drawFontWeight, drawFontColor, WannaText);
    })

    font_x.addEventListener('change', function(){
        FONT_X = this.value;
        font_x_V.innerText = this.value;
        update(context, drawFontWeight, drawFontColor, WannaText);
    })

    font_y.addEventListener('change', function () {
        FONT_Y = this.value;
        font_y_V.innerText = this.value;
        update(context, drawFontWeight, drawFontColor, WannaText);
    })


    function update(cxt, fillStyle, lineWidth, WannaText) {
      image.src = WannaImg;
      image.onload = function(){
          drawImage( image , scale , drawFontWeight, drawFontColor ,WannaText);
      }
      drawImage(image , scale , drawFontWeight, drawFontColor, WannaText);

    }
    update();
})()
