"use strict";
module.exports = function(grunt){

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		path: {
			'raw': 'dev',
			'out': 'dist'
		},



		/*
		*** Styles ***
		*/
		sass:{
			options: {
				sourceMap : true,
				sourceComments: false,
				outputStyle: 'compressed'
			},
			files: {
				expand : true,
				cwd    : '<%= path.raw %>/sass/',
				src    : ['*.scss'],
				dest   : '<%= path.out %>/css/',
				ext    : '.css'
			}
		},

		autoprefixer:{
			options: {
				browsers: ['last 2 versions', 'ie 8', 'ie 9']
			},
			target: {
				files: [{
					expand  : true,
					flatten : true,
					cwd     : '<%= path.out %>/css/',
					src     : '**/*.css',
					dest    : '<%= path.out %>/css/',
					ext     : '.css'
				}]
			}
		},



		/*
		*** HTML ***
		*/
		jade: {
			compile: {
				options: {
					pretty : false,
                    data: function(dest, src) {
                        console.log(dest, src);
                        return grunt.file.readJSON('dev/data/all.json');
                    }
				},
				files: [{
					expand : true,
					cwd    : '<%= path.raw %>/jade/',
					src    : '*.jade',
					dest   : './',
					ext    : '.html'
				}]
			}
		},
		prettify: {
			options: {
				indent: 4,
				indent_char: ' ',
				preserveBOM: true,
				condense: true,
				indent_inner_html: true,
				wrap_line_length: 130,
				preserve_newlines: true,
				brace_style: 'collapse',
				unformatted: ['a', 'sub', 'sup', 'b', 'i', 'u']
			},
			all: {
				expand: true,
				cwd: './',
				ext: '.html',
				src: ['*.html'],
				dest: './'
			},
		},



		/*
		*** Scripts and JSONs ***
		*/
		uglify: {
			scripts: {
				options: {
					sourceMap     : true,
					sourceMapName : '<%= path.out %>/js/sourcemap/main.map',
				},
				files: {
					'<%= path.out %>/js/main.js': ['<%= path.raw %>/js/*.js', '!<%= path.raw %>/js/jquery*.js']
				}
			}
		},
		concat: {
			json: {
				src: ['<%= path.raw %>/data/parts/*.json'],
				dest: '<%= path.raw %>/data/all.json',
				options: {
					separator: ',',
					banner: '{',
					footer: '}'
				}
			}
		},



		/*
		*** Images ***
		*/
		imagemin:{
			minimize: {
				options: {
					optimizationLevel : 4,
					svgoPlugins       : [{ removeViewBox: false } , { removeEmptyAttrs: true }],
				},
				files: [{
					expand : true,
					cwd    : '<%= path.raw %>/img/',
					src    : ['**/*.{png,jpg,gif,svg,jpeg}'],
					dest   : '<%= path.out %>/img/'
				}]
			}
		},
		cropthumb: {
			people_resize: {
				options: {
					width: 320,
					height: 320,
					overwrite: true,
					changeName: false,
					upscale: true,
					cropAmount: 0
				},
				files: [{
					expand: true,
					src: ['*.{jpg,png,jpeg}'],
					cwd: '<%= path.raw %>/img/people/',
					dest: '<%= path.out %>/img/people/'
				}]
			},
			sponsor_resize: {
				options: {
					width: 325,
					height: 325,
					overwrite: true,
					changeName: false,
					upscale: true,
					cropAmount: 0
				},
				files: [{
					expand: true,
					src: ['*.{jpg,png,jpeg}'],
					cwd: '<%= path.raw %>/img/sponsors/',
					dest: '<%= path.out %>/img/sponsors/'
				}]
			}
		},



		/*
		*** Syncing Browser ***
		*/
		browserSync: {
			dev: {
				bsFiles: {
					src : [
						'<%= path.out %>/css/*.css',
						'<%= path.out %>/js/*.css',
						'<%= path.out %>/img/*.{png,jpg,gif,svg}',
						'*.html'
					]
				},
				options: {
					server : './',
					notify : false,
					port   : 4274
				}
			}
		},



		/*
		*** Watch ***
		*/
		watch:{
			styles:{
				files: ['<%= path.raw %>/sass/**/*.scss'],
				tasks: ['sass', 'autoprefixer'],
			},
			scripts:{
				files: ['<%= path.raw %>/js/**/*.js'],
				tasks: ['uglify']
			},
			contents:{
				files: [
					'<%= path.raw %>/data/**/*.json',
					'<%= path.raw %>/jade/**/*.jade'
				],
				tasks: ['concat', 'jade', 'prettify']
			},
			images:{
				files: [
					'<%= path.raw %>/img/**/*.{png,jpg,gif,svg}'
				],
				tasks: ['imagemin', 'cropthumb']
			},
			options: {
				spawn: false,
				livereload: true
			},
			livereload: {
				files: [
					'*.html',
					'<%= path.out %>/css/**/*.css',
					'<%= path.out %>/js/**/*.js'
				]
			},
		}
	});



	/*
	*** Load Grunt Packages ***
	*/
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-prettify');
	grunt.loadNpmTasks('grunt-cropthumb');
	grunt.loadNpmTasks('grunt-contrib-concat');



	/*
	*** Register Grunt Tasks ***
	*/
	grunt.registerTask('build', [
		'sass',
		'autoprefixer',
		'concat',
		'jade',
		'prettify',
		'uglify',
		'imagemin',
		'cropthumb',
		'watch'
	]);

	grunt.registerTask('browser', ['browserSync']);
}
