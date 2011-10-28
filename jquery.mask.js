(function($) {
  $.extend($.fn, {
    mask: function() {
      this.each(function() {
        var self = $(this),
            src = self.attr('src'),
            masksrc = src.replace(/(\.jpg|\.png)$/, "-mask$1");

        if(!src) return;

        self.hide();

        var canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d');

        var img = new Image();

        img.onload = function() {
          var imgmask = new Image();

          imgmask.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.putImageData(self.addMask(self.getPixels(img), self.getPixels(imgmask)), 0, 0);
            self.replaceWith(canvas);
            self.show();
          };

          imgmask.src = masksrc;

        };

        img.src = src;

      });

      return this;

    },

    addMask: function(pixels, mask_pixels) {
      var img = pixels.data,
          mask = mask_pixels.data,
          i = 0, r, g, b;

      for(i = 0; i < img.length; i+=4) {
        r = mask[i];
        g = mask[i+1];
        b = mask[i+2];

        img[i+3] = img[i+3] * ((r+g+b)/(255*3));
      }

      return pixels;
    },

    // From http://www.html5rocks.com/en/tutorials/canvas/imagefilters/
    getCanvas: function(w,h) {
      var c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      return c;
    },

    // From http://www.html5rocks.com/en/tutorials/canvas/imagefilters/
    getPixels: function(img) {
      var c = this.getCanvas(img.width, img.height);
      var ctx = c.getContext('2d');
      ctx.drawImage(img, 0, 0);
      return ctx.getImageData(0,0,c.width,c.height);
    }

  });
})(jQuery);
