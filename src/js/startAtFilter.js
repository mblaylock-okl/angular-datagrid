datagridApp.filter('startAt', function () {
    return function (items, index) {
        return items.slice(index);
    };
});
