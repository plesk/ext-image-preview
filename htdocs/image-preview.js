// Copyright 1999-2018. Plesk International GmbH. All rights reserved.

Jsw.onReady(function () {
    var supportedExtensions = ['.gif', '.jpg', '.jpeg', '.png', '.bmp'];
    var rootUrl = '/modules/image-preview/external/';

    LightboxOptions.fileLoadingImage = rootUrl + LightboxOptions.fileLoadingImage;
    LightboxOptions.fileBottomNavCloseImage = rootUrl + LightboxOptions.fileBottomNavCloseImage;

    var lightbox = new Lightbox();

    document.addEventListener('click', function (e) {
        var target = event.findElement('a.fm-file-name-link');
        if (!target) {
            return;
        }

        var name = target.down('span').innerHTML;
        var isSupported = false;
        supportedExtensions.each(function (extension) {
            if (0 < name.lastIndexOf(extension)) {
                isSupported = true;
            }
        });
        if (!isSupported) {
            return;
        }

        e.preventDefault();
        e.stopPropagation();

        var url = '/smb/file-manager/show-image/?file=' + encodeURIComponent(name),
            newUrl = target.readAttribute('href').indexOf('/show?') > -1
                ? target.readAttribute('href').replace('/show?', '/show-image/?')
                : url;
        target.writeAttribute('rel', 'lightbox[roadtrip]');
        target.writeAttribute('href', newUrl);
        lightbox.start(target);
        target.removeAttribute('rel');
    }, true);
});
