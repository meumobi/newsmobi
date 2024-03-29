module.exports = function(config) {

	// Output directory
	config.dest = 'www';
	
	config.version = "1.2.0"; // version of the App
  
	// Inject cordova script into html
	config.cordova = true;
  
	// Images minification
	config.minify_images = true;

	// Development web server

	config.server.host = '0.0.0.0';
	config.server.port = '8000';
  
	// Set to false to disable it:
	// config.server = false;

	// Weinre Remote debug server
  
	config.weinre.httpPort = 8080;
	config.weinre.boundHost = '192.168.0.5';

	// Comment to enable weinre, uncomment to disable weinre 
	// config.weinre = false;
	config.debug = false;
    
	// 3rd party components
	config.vendor.js.push('./bower_components/angular-touch/angular-touch.js');
	config.vendor.js.push('./bower_components/angular-sanitize/angular-sanitize.js');
	config.vendor.js.push('./bower_components/angular-animate/angular-animate.js');
	config.vendor.js.push('./bower_components/angular-resource/angular-resource.js');
	config.vendor.js.push('./bower_components/angular-carousel/dist/angular-carousel.js');
	config.vendor.js.push('./bower_components/js-md5/js/md5.js');
	//config.vendor.js.push('./src/js/lib/pushwoosh-android.js');
	//config.vendor.js.push('./src/js/lib/pushwoosh-ios.js');
	config.vendor.js.push('./bower_components/ladda/dist/spin.min.js');
	config.vendor.js.push('./bower_components/ladda/dist/ladda.min.js');
	// config.vendor.fonts.push('.bower_components/font/dist/*');
};
