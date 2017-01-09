module.exports = {
    index: function*() {
        console.log('index');
        let pageData = {
            js: [],
            css: [],
            enter: '',
            "title": "koa demo"

        }
        yield this.render('index', pageData);
    },
    test: function*() {
        yield this.render('index', {
            "title": "koa demo"
        });
    }
}