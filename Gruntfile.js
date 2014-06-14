module.exports = function (grunt) {

	grunt.initConfig({
		compass   : {
			dist: {
				options: {
					sassDir: 'scss',
					cssDir : 'dist'
				}
			}
		},
		watch     : {
			css    : {
				files: ['css/**/*.scss', 'css/*.scss'],
				tasks: ['compass']
			},
			js     : {
				files: ['js/*.js', 'js/**/*.js'],
				tasks: ['uglify']
			},
			options: {
				livereload: true
			}
		},
		nodewebkit: {
			options: {
				build_dir: './build',
				mac      : true,
				win      : false,
				linux32  : false,
				linux64  : false
			},
			src    : ['./**/*' ]
		},
		jshint    : {
			all: ['Gruntfile.js', 'js/**/*.js']
		},
		uglify    : {
			options: {
				mangle: false
			},
			js     : {
				files: {
					'dist/app.min.js': ['js/**/*.js']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-node-webkit-builder');

	grunt.registerTask('default', ['watch']);
	grunt.registerTask('test', ['jshint']);
	grunt.registerTask('build', ['nodewebkit']);

};
