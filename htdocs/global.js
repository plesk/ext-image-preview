Jsw.onReady(function () {
    if ("/smb/file-manager/list" != window.location.pathname) {
        return;
    }

    var Script = {
        _loadedScripts:[],
        includeJs:function (script) {
            // include script only once
            if (this._loadedScripts.include(script)) {
                return false;
            }
            // request file synchronous
            var code = new Ajax.Request(script, {
                asynchronous:false, method:"GET",
                evalJS:false, evalJSON:false
            }).transport.responseText;
            // eval code on global level
            if (Prototype.Browser.IE) {
                window.execScript(code);
            } else if (Prototype.Browser.WebKit) {
                $$("head").first().insert(Object.extend(
                    new Element("script", {type:"text/javascript"}), {text:code}
                ));
            } else {
                window.eval(code);
            }
            // remember included script
            this._loadedScripts.push(script);
            return true;
        },
        includeCss:function (stylesheet) {
            // include stylesheet only once
            if (this._loadedScripts.include(stylesheet)) {
                return false;
            }
            // request file synchronous
            var code = new Ajax.Request(stylesheet, {
                asynchronous:false, method:"GET",
                evalJS:false, evalJSON:false
            }).transport.responseText;

            var imagesUrl = '/modules/image-preview/external/images/';
            code = code.replace(/\.\.\/images\//g, imagesUrl);
            var styleElement = new Element("style");
            $(styleElement).update(code);
            $$("head").first().insert(styleElement);

            // remember included script
            this._loadedScripts.push(stylesheet);
            return true;
        }
    };

    var initLightbox = function() {
        var overlayElement = $('overlay');
        if (overlayElement) {
            overlayElement.remove();
        }
        var lightboxElement = $('lightbox');
        if (lightboxElement) {
            lightboxElement.remove();
        }

        var boxInstance = new Lightbox();

        var supportedExtensions = ['.gif', '.jpg', '.jpeg', '.png', '.bmp'];

        $$('a.fm-file-name-link').each(function (file) {
            var name = file.down('span').innerHTML;

            var isSupported = false;
            supportedExtensions.each(function (extension) {
                if (0 < name.lastIndexOf(extension)) {
                    isSupported = true;
                }
            });
            if (!isSupported) {
                return;
            }

            var url = '/smb/file-manager/show-image/?file=' + encodeURIComponent(name);
            file.writeAttribute('rel', 'lightbox[roadtrip]');
            file.writeAttribute('href', url);
            file.observe('click', function (event) {
                Event.stop(event);
                boxInstance.start(this);
            });
        });
    };

    var rootUrl = '/modules/image-preview/external/';

    Script.includeJs(rootUrl + 'js/effects.js');
    Script.includeJs(rootUrl + 'js/builder.js');
    Script.includeJs(rootUrl + 'js/lightbox.js');
    Script.includeCss(rootUrl + 'css/lightbox.css');

    LightboxOptions.fileLoadingImage = rootUrl + LightboxOptions.fileLoadingImage;
    LightboxOptions.fileBottomNavCloseImage = rootUrl + LightboxOptions.fileBottomNavCloseImage;

    document.body.observe('plesk:pageElementResize', initLightbox);
});
