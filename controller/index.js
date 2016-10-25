module.exports = {
    index: function*(){
        yield this.render('index',{"title":"koa demo"});
    },
    test: function*(){
        yield this.render('index',{"title":"koa demo"});
    }
}