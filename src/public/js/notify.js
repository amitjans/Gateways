function notify(messaje, type = 'success') {
    $.notify(messaje, {
        animate: {
            enter: 'animated fadeInRight',
            exit: 'animated fadeOutRight'
        },
        type: type,
        placement: {
            from: "bottom"
        }
    });
}