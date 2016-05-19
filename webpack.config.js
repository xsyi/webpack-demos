var path = require('path');

function rewriteUrl(replacePath) {
  return function (req, opt) {
    var queryIndex = req.url.indexOf('?');
    var query = queryIndex >= 0 ? req.url.substr(queryIndex) : "";

    req.url = req.path.replace(opt.path, replacePath) + query;
    console.log("rewriting ", req.originalUrl, req.url);
  };
}


module.exports ={
	entry:'./src/index.js',
	output:{
		path:'./build',
		filename:'bundle.js'
	},
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader'
        }
      ]
    },
    resolve: {
  		extensions: ["", ".js", ".jsx", ".css", ".json"],
	},
	devtool: 'cheap-module-source-map',
    devServer: {
      publicPath:'/static/',
      progress:true,
      stats: { colors: true },
      contentBase: 'build',
      hot: true,
      proxy: [
	      {
	        path: /^\/api\/(.*)/,
	        target: "http://localhost:8080/",
	        rewrite: rewriteUrl('/$1\.json'),
	        changeOrigin: true
	      }
  		]
    }

}