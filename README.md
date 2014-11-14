Mloader
=======
<hr />
Plugin that pre-load images in a background-process, out of the DOM, using promises.

Aren't you sick and tired of loading your image files inline? By doing this, your DOM become super-heavy and no animation ever will be soft and smooth at the very loading of the document.

-> What this plugin does is receive a list of images from a jQuery selector or an Array, download them out of DOM, put them in cache, and then, fire some callbacks to put them in the DOM.
-> Even if you don't use the build-in callbacks, after loading them, you have them on cache, now, just do your magic.
<hr />
-> Easy like that <br />
<code>
  $('.toLoad').Mloader();
</code>
<br /><br />
-> And it has some parameters
<code><pre>
  $('.toLoad').Mloader({
      onReady: function () {
          console.log('all done');
      },
      onSingleLoad: function (i, url, $this) {
          console.log('The image number '+ i +' has loaded.');
          console.log('The cached url is '+ url);
          $this.show();
      },
      ignoreErrors: true,
      transformTo: 'background'
  });
</pre></code>
