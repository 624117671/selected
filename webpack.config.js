var path = require('path');
module.exports = {
    entry:'./src/lib/index.js',
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'vue-selected.js',
        libraryTarget: "umd",  //一套完整的规范 cmd  amd
        library: 'vue-selected'  //库的名字
    },
    module:{
        rules:[
            {
               test:/\.js$/,
               loader:'babel-loader',
               include:path.join(__dirname,'src'),
               exclude:/node_modules/,
            },
            {
                test:/\.vue$/,
                loader:'vue-loader',
                include:path.join(__dirname,'src'),
                exclude:/node_modules/,
                options:{
                    loaders:{
                        scss:'style-loader!css-loader!postcss-loader!sass-loader'
                    },
 
                }
            }
        ]
    },
    plugins: [
    ]
}