/*global module:false */

module.exports = function(grunt) {
	
	'use strict';
	
	grunt.initConfig({
		
		pkg : grunt.file.readJSON('package.json'),
		
		/* #############################################################
		   JS Header Info
		   ########################################################## */
		
		meta : {
			
			banner_long : '/**\n' +
			              ' * <%= pkg.title || pkg.name %>\n' +
			              '<%= pkg.description ? " * " + pkg.description + "\\n" : "" %>' +
			              ' *\n' +
			              '<%= pkg.author.names ? " * @author " + pkg.author.names.one + ", " + pkg.author.names.two + "\\n" : "" %>' +
			              '<%= pkg.author.name ? " * @author " + pkg.author.name + "\\n" : "" %>' +
			              '<%= pkg.author.urls ? " * @link " + pkg.author.urls.one + ", " + pkg.author.urls.two + "\\n" : "" %>' +
			              '<%= pkg.author.url ? " * @link " + pkg.author.url + "\\n" : "" %>' +
			              '<%= pkg.homepage ? " * @docs " + pkg.homepage + "\\n" : "" %>' +
			              ' * @copyright Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>.\n' +
			              '<%= pkg.licenses ? " * @license Released under the " + _.pluck(pkg.licenses, "type").join(", ") + ".\\n" : "" %>' +
			              '<%= pkg.version ? " * @version " + pkg.version + "\\n" : "" %>' +
			              ' * @date <%= grunt.template.today("yyyy/mm/dd") %>\n' +
			              ' */\n\n',
			
			banner_short : '/*! ' +
			               '<%= pkg.title || pkg.name %>' +
			               '<%= pkg.version ? " v" + pkg.version : "" %>' +
			               '<%= pkg.licenses ? " | " + _.pluck(pkg.licenses, "type").join(", ") : "" %>' +
			               '<%= pkg.homepage ? " | " + pkg.homepage : "" %>' +
			               ' */'
			
		},
		
		/* #############################################################
		   Watch Changes
		   ########################################################## */
		
		/**
		 * $ grunt watch
		 *
		 * @see https://github.com/gruntjs/grunt-contrib-watch
		 */
		
		watch : {
			
			tmpl : {
				
				files : [
					
					'./src/<%= pkg.name %>.js',
					'../demo/**/*'
					
				],
				
				tasks : ['dev']
				
			}
			
		},
		
		/* #############################################################
		   JS Hinting
		   ########################################################## */
		
		/**
		 * @see http://www.jshint.com/
		 * @see https://github.com/gruntjs/grunt-contrib-jshint
		 * @see https://github.com/jshint/jshint/blob/master/src/stable/jshint.js
		 * @see http://www.jshint.com/docs/
		 */
		
		jshint : {
			
			options : {
				
				jshintrc : '.jshintrc'
				
			},
			
			dev : [
				
				'./Gruntfile.js',
				'./src/<%= pkg.name %>.dev.js'
				
			],
			
			pro : [
				
				'./Gruntfile.js',
				'./src/<%= pkg.name %>.js'
				
			]
			
			/*
			init : [
				
				'./Gruntfile.js',
				'./src/<%= pkg.name %>.js'
				
			]
			*/
			
		},
		
		/* #############################################################
		   Conditional calls in demo
		   ########################################################## */
		
		/**
		 * Grunt task to automate environment configuration for future tasks.
		 *
		 * @see https://github.com/onehealth/grunt-env
		 */
		
		env : {
			
			dev : {
				
				NODE_ENV : 'DEVELOPMENT'
				
			},
			
			pro : {
				
				NODE_ENV : 'PRODUCTION'
				
			}
			
		},
		
		/* #############################################################
		   Clean the `pro`-duction directory
		   ########################################################## */
		
		/**
		 * @see https://github.com/gruntjs/grunt-contrib-clean
		 */
		
		clean : {
			
			options : {
				
				force : true // Sketchy!
				
			},
			
			dev : {
				
				src : [
					
					'../demo/index.html',
					'../demo/css/ads.css'
					
				]
				
			},
			
			pro : {
				
				src : [
					
					'../<%= pkg.name %>/<%= pkg.name %>.js'
					
				]
				
			}
			
		},
		
		/* #############################################################
		   Minify the JS
		   ########################################################## */
		
		/**
		 * @see https://github.com/gruntjs/grunt-contrib-uglify
		 * @see http://lisperator.net/uglifyjs/
		 */
		
		uglify : {
			
			pro : {
				
				files : {
					
					'../<%= pkg.name %>/<%= pkg.name %>.min.js' : './src/<%= pkg.name %>.js'
					
				}
				
			}
			
		},
		
		/* #############################################################
		   Minify the CSS
		   ########################################################## */
		
		/**
		 * @see https://github.com/gruntjs/grunt-contrib-less
		 */
		
		less : {
			
			options : {
				
				compress : true
				
			},
			
			dev : {
				
				files : {
					
					'../demo/css/ads.css' : '../demo/build/css/ads.less'
					
				}
				
			},
			
			pro : {
				
				options : {
					
					yuicompress : true
					
				},
				
				files : {
					
					'../demo/css/ads.min.css' : '../demo/build/css/ads.less'
					
				}
				
			}
			
		},
		
		/* #############################################################
		   Preprocess Files
		   ########################################################## */
		
		/**
		 * Grunt task around preprocess npm module.
		 *
		 * @see https://github.com/onehealth/grunt-preprocess
		 * @see https://github.com/onehealth/preprocess
		 */
		
		preprocess : {
			
			dev : {
				
				src : '../demo/build/index.html',
				dest : '../demo/index.html'
				
			},
			
			pro : {
				
				src : '../demo/build/index.html',
				dest : '../demo/index.html'
				
			}
			
		}
		
	});
	
	//--------------------------------------------------------------------
	
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	grunt.loadNpmTasks('grunt-contrib-jshint');
	
	grunt.loadNpmTasks('grunt-contrib-clean');
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	grunt.loadNpmTasks('grunt-contrib-concat');
	
	grunt.loadNpmTasks('grunt-contrib-less');
	
	grunt.loadNpmTasks('grunt-preprocess');
	
	grunt.loadNpmTasks('grunt-env');
	
	//----------------------------------
	
	grunt.registerTask('default', ['jshint']);
	
	grunt.registerTask('dev', ['jshint:dev', 'env:dev', 'clean:dev', 'less:dev', 'preprocess:dev']);
	
	grunt.registerTask('pro', ['jshint:pro', 'env:pro', 'clean:pro', 'uglify:pro', 'less:pro', 'preprocess:pro']);
	
};
