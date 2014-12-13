module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('bower.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/**/*.js'],
                dest: 'assets/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'assets/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js'],
            options: {
                // options here to override JSHint defaults
                trailing: true,
                globals: {
                    browser: true,
                    console: true
                }
            }
        },
        sass: {
            dist: {
                files: {
                    'assets/gantt.css' : 'assets/scss/gantt.css.scss'
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint', 'concat']
            //css: {
            //    files: '**/*.scss',
            //    tasks: ['sass']
            //}
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['sass', 'jshint', 'concat', 'uglify']);
    grunt.registerTask('dev', ['watch']);


};