// Copyright 1999-2014. Parallels IP Holdings GmbH. All Rights Reserved.
Jsw.onReady(function () {
    var supportedExtensions = ['.gif', '.jpg', '.jpeg', '.png', '.bmp'];
    var rootUrl = '/modules/image-preview/external/';

    LightboxOptions.fileLoadingImage = rootUrl + LightboxOptions.fileLoadingImage;
    LightboxOptions.fileBottomNavCloseImage = rootUrl + LightboxOptions.fileBottomNavCloseImage;

    document.observe('click', function (event) {
        var target = event.findElement('a.fm-file-name-link');
        if (!target) {
            return;
        }

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
        });
    });

    new Lightbox();
});