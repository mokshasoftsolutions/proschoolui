/**
 * http://usejsdoc.org/
 */


var path = {
    src: {
        boot: 'bootstrap/**/*.*',
        external_css: 'plugins/**/*.*'
    }
};

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            boot: { cwd: '', src: path.src.boot, dest: 'build', expand: true },
            css: { cwd: '', src: ['dist/css/*.min.css', 'dist/css/skins/_all-skins.min.css', 'dist/css/custom.css','dist/css/gsdk-bootstrap-wizard.css'], dest: 'build', expand: true },
            img: { cwd: '', src: ['dist/img/**/*.*', 'dist/login/**/*.*'], dest: 'build', expand: true },
            //  html:{ cwd: '', src: ['pages/**/*.html'], dest: 'build', expand: true},                     
            plugins: { cwd: '', src: path.src.external_css, dest: 'build', expand: true },
            js: { cwd: '', src: 'dist/js/**/*.*', dest: 'build', expand: true },
            lib: { cwd: '', src: 'dist/lib/**/**', dest: 'build', expand: true },
            component: { cwd: '', src: ['app/components/**/*.html', 'index.html'], dest: 'build', expand: true }
            // index:{ cwd: 'src', src: '*.html', dest: 'build', expand: true},
            // angular:{ cwd: 'src', src: path.src.angular_src, dest: 'build', expand: true}
        },
        clean: {
            build: {
                src: ['build']
            },
        },
        // concat: {
        //     // js: { //target
        //     //     src: path.src.vendor_js,
        //     //     dest: 'build/assets/common/js/external.js'
        //     // },            
        //     css:{
        //         src: path.src.vendor_css,
        //         dest: 'build/assets/common/css/source/external.css'
        //     },
        //     cont:{
        //         src: path.src.vendor_css,
        //         dest: 'build/assets/common/css/source/external.css'
        //     }
        // },
        //  sass: {
        //     dist: {                            // Target
        //      options: {                       // Target options
        //        style: 'expanded',
        //        update:true,
        //      },
        //       files: {
        //           'build/assets/common/css/main.min.css': 'src/assets/common/css/main.scss'
        //       }
        //     }
        //   },
        uglify: {
            options: {
                report: 'min',
                compress: false,
                mangle: false
            },
            default: {
                files: {
                    'build/app/app.js': ['app/app.module.js', 'app/app.route.js', 'app/components/**/*.js']
                }
            }
        },
        connect: {
            dev: {
                options: {
                    port: 5000,
                    base: 'build',
                    hostname: '*'
                }
            },
            prod: {
                options: {
                    port: 9001,
                    base: 'build',
                    hostname: '*'
                }
            }
        },
        watch: {
            // for stylesheets, watch css and less files
            // only run less and cssmin
            stylesheets: {
                files: ['app/components/**/*.html', 'dist/css/*.*', 'dist/css/**/*.*', 'dist/img', 'index.html', 'dist/**/**/*.*'],
                tasks: ['copy']
            },
            // for scripts, run jshint and uglify
            scripts: {
                files: ['app/**/*.js', 'app/*.js'],
                tasks: ['uglify']
            }
        }
        //grunt task configuration will go here
    });
    //load grunt task
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    //  grunt.loadNpmTasks('grunt-contrib-sass');
    //register grunt default task
    //grunt.registerTask('build', ['clean', 'copy', 'html2js','connect:prod','watch']);
    // grunt.registerTask('default', ['concat', 'connect:dev', 'uglify','sass','watch']);
    grunt.registerTask('default', ['clean', 'copy', 'uglify', 'connect:dev', 'watch']);
}