(function() {
    if ("/smb/file-manager/list" != window.location.pathname) {
        return;
    }

    var rootUrl = '/modules/image-preview/';
    $$("head").first()
        .insert(new Element("script", {type: "text/javascript", src: rootUrl + 'external/js/effects.js'}))
        .insert(new Element("script", {type: "text/javascript", src: rootUrl + 'external/js/builder.js'}))
        .insert(new Element("script", {type: "text/javascript", src: rootUrl + 'external/js/lightbox.js'}))
        .insert(new Element("script", {type: "text/javascript", src: rootUrl + 'image-preview.js'}))
        .insert(new Element("link", {rel: "stylesheet", href: rootUrl + 'external/css/lightbox.css'}));
})();