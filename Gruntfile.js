/* jshint node: true */

//   http://gruntjs.com/sample-gruntfile

module.exports = function(grunt) {
    "use strict";

    // initializing task configuration
    grunt.initConfig({

//        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                // separator: ';',
                stripBanners: true
            },
    
            app: {
                dest: "build/js/app.min.js",
                src: [
                    "src/js/app.js"
                ]
            }
        }
    });


    // loading local tasks
//    grunt.loadTasks("tasks");

    // loading external tasks (aka: plugins)
    grunt.loadNpmTasks("grunt-contrib-concat");

    // creating workflows
    grunt.registerTask('default', ['concat']);

};
