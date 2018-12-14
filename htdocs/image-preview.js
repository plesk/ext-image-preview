// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

Jsw.onReady(function () {
    var supportedExtensions = ['.gif', '.jpg', '.jpeg', '.png', '.bmp'];
    var rootUrl = '/modules/image-preview/external/';

    LightboxOptions.fileLoadingImage = rootUrl + LightboxOptions.fileLoadingImage;
    LightboxOptions.fileBottomNavCloseImage = rootUrl + LightboxOptions.fileBottomNavCloseImage;

    function modifyLink(file) {
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

        var url = '/smb/file-manager/show-image/?file=' + encodeURIComponent(name),
            newUrl = file.readAttribute('href').indexOf('/show?') > -1
                ? file.readAttribute('href').replace('/show?', '/show-image/?')
                : url;
        file.writeAttribute('rel', 'lightbox[roadtrip]');
        file.writeAttribute('href', newUrl);
    }

    var lightbox = new Lightbox();

    document.addEventListener('click', function (e) {
        var selector = 'a.fm-file-name-link';
        var target = event.findElement(selector);
        if (!target) {
            return;
        }

        $$(selector).each(modifyLink);

        if (target.readAttribute('rel') === 'lightbox[roadtrip]') {
            e.preventDefault();
            e.stopPropagation();
            lightbox.start(target);
        }
    }, true);
});
