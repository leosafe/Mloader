/**
 * Mloader v1.0.3 - Images loader plugin, based on promises
 * https://github.com/filipemerker/Mloader
 *
 * Copyright 2014, Filipe Merker - http://filipemerker.com.br
 * Written while drinking coffee and listening to Paradizzlle by DJ Feijot
 * Special thanks to https://github.com/leosafe
 *
 * Released under the MIT license - http://opensource.org/licenses/MIT
 */
$.fn.Mloader = function(options) {
    var t = this,
            settings = $.extend({
                onSingleLoad: function() {
                },
                onReady: function() {
                },
                transformTo: false,
                ignoreErrors: true
            }, options),
            counter = 0;
    loadImageWorker = function(i, t, url, numTot, ob) {
        var Mloader = function(deferred) {
            var image = new Image();
            image.onload = loaded;
            image.onerror = (settings.ignoreErrors) ? loaded : errored;
            image.onabort = errored;
            image.src = url;

            function loaded() {
                unbindEvents();
                // Calling the "resolve" method, means that the image is fully loaded and ready to be used.
                // After that, runs the callback who is activated by "then" callback.
                deferred.resolve(image).then(function(){
                    if (settings.transformTo != false && ob === 'object') {
                        if (settings.transformTo == 'image') {
                            //if is transforming to image
                            $(t).after('<img src="' + url + '" />');
                            var img = $(t).next();
                            $(t).remove();
                            t = img;
                        } else if (settings.transformTo == 'background') {
                            //if is transforming to background
                            $(t).css({'background-image': 'url(' + url + ')'}).removeClass('toLoad').attr({'data-src': ''});
                        }
                    }
                    if ($.type(settings.onSingleLoad) === 'function' && ob === 'object') {
                        //if the list of images is a jquery selector
                        settings.onSingleLoad(counter, url, $(t));
                    } else {
                        //if the list of images is an array
                        settings.onSingleLoad(counter, url, null);
                    }
                    if (settings.onReady != false && counter == numTot - 1) {
                        settings.onReady();
                    }
                    counter += 1;
                });
            }
            function errored() {
                unbindEvents();
                // Couldn't load (e.g. 404, server offline, etc).
                deferred.reject(image);
                console.log('Erro na imagem: ' + url)
            }
            function unbindEvents() {
                // Ensure that the callbacks are aloading just once.
                image.onload = null;
                image.onerror = null;
                image.onabort = null;
            }

        };
        // Create the deferred object that conteins the image to be loaded.
        // Call the "promise" method makes the image "read only", for security purposes.
        return $.Deferred(Mloader).promise();
    }
    $.each(t, function(i, v) {
        var url = (t.selector == '') ? v : $(v).data('src'),
                nt = t.length,
                ob = (t.selector == '') ? 'array' : 'object';
        loadImageWorker(i, v, url, nt, ob);

    });
};