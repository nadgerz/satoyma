/* jshint node: true */

//   http://gruntjs.com/sample-gruntfile

module.exports = function ( grunt ) {
    "use strict";

    grunt.initConfig( {

        pkg:         grunt.file.readJSON( 'package.json' ),

        sourceJs:  ["public/javascripts/**/*.js", "routes/**/*.js"],
        clientJs:  ["public/**/*.js" ],
        serverJs:  ["public/lib/require.js", "app.js", "routes/*.js" ],
        jsFiles:   ["public/**/*.js", "routes/**/*.js"],
        pgVersion: "9.3.4",

        // Zip everything up
        compress:  {
            target: {
                files: {
                    'pack/<%= pkg.name %>.v<%= pkg.version %>.zip': ['prod/**']
                }
            }
        }

        , concat:   {
            options: {
                // define a string to put between each file in the concatenated output
                // separator: ';',
                stripBanners: true
            }
            , client:   {
                // the files to concatenate
                src:  "<%= clientJs %>",

                // the location of the resulting JS file
                dest: 'dist/<%= pkg.name %>.<%= pkg.version %>.client.concat.js'
            }
            , server:   {
                // the files to concatenate
                src:  "<%= serverJs %>",

                // the location of the resulting JS file
                dest: 'dist/<%= pkg.name %>.<%= pkg.version %>.server.concat.js'
            }
            , css:  {
                // the files to concatenate
                src:    ['public/**/*.css'],

                // the location of the resulting JS file
                dest:   'dist/<%= pkg.name %>.<%= pkg.version %>.concat.css',

                // 'dist/<%= pkg.name %>.<%= pkg.version %>.css' : ['public/**/*.css'],
                nonull: true,
            }
        }

        , htmlhint: {
            build: {
                // https://github.com/yaniswang/HTMLHint/wiki/Rules
                options: {
                    'attr-lowercase':           true,
                    'attr-value-double-quotes': true,
                    'attr-value-note-empty':    true,
                    'doctype-first':            true,
                    'doctype-html5':            true,
                    'head-script-disabled':     false,
                    'id-unique':                true,
                    'spec-char-escape':         true,
                    'src-note-empty':           true,
                    'style-disabled':           true,
                    'tag-pair':                 true,
                    'tag-self-close':           true,
                    'tagname-lowercase':        true
                }
                , src:  ['public/html/**/*.html']
            }
        }

        , jasmine:  {
            files: ['<%= sourceJs %>']
            , options: {
                specs:      "spec/**/*.js"
                , vendor:   "vendor/**/*.js"
            }
        }

        , jshint: {
            all:        [
                "Gruntfile.js"
                , "public/javascripts/**/*.js"
                , "routes/**/*.js"
                , "spec/**/*.js"
            ]

            , options: {
                // http://www.jshint.com/docs/options/
                jshintrc: '.jshintrc',
                globals: {
                    "console":      true,
                    "require":      true,
                    "module":       true
                }
            }
        }

        , markdown: {
            all: {
                files:      [
                    {
                        expand: true,
                        src:    'doc/**/*.md',
                        dest:   '.',
                        ext:    '.html'
                    }
                ],

                options: {
                    template:        'doc/markdown.jst',
                        preCompile:      function ( src, context ) {
                    },
                    postCompile:     function ( src, context ) {
                    },
                    templateContext: {},
                    markdownOptions: {
                        gfm: true,
    //                        highlight: 'manual',
    //                        codeLines: {
    //                            before: '<span>',
    //                            after:  '</span>'
    //                        }
                    }
                }
            }
        }

        , requirejs: {
            server: {
                options: {
                    mainConfigFile: "app.js",
                    name: "app",
                    out: "app.min.js",
                    include: "node_modules"
                }
            }
        }

//        , targz: {
//            postgres: {
//                files: {
//                    "build":  "<%= curl.postgres.dest %>"
//                }
//            }
//        }

        , watch:    {
            js:      {
                files: ['<%= sourceJs %>']
                , tasks: ['jshint']
            }
            , html: {
                files: ['<%= htmlhint.build.src %>']
                , tasks: ['htmlhint']
            }
            , markdown: {
                files: ['doc/**/*.md', 'doc/markdown.jst']
                , tasks: ['markdown']
            }
        }

        , uglify:   {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
                sourceMap: true
            }
            , client: {
                files: {
                    '<%= pkg.name %>.<%= pkg.version %>.client.min.js': ['<%= clientJs %>']
                }
            }
            , server: {
                files: {
                    '<%= pkg.name %>.<%= pkg.version %>.server.min.js': ['<%= serverJs %>']
                }
            }
        }
    } );

    grunt.loadNpmTasks( 'grunt-contrib-clean' );
    grunt.loadNpmTasks( 'grunt-contrib-compress' );
    grunt.loadNpmTasks( 'grunt-contrib-concat' );
    grunt.loadNpmTasks( 'grunt-contrib-copy' );
    grunt.loadNpmTasks( 'grunt-contrib-jasmine' );
    grunt.loadNpmTasks( 'grunt-contrib-jshint' );
    grunt.loadNpmTasks( 'grunt-contrib-requirejs' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'grunt-htmlhint' );
    grunt.loadNpmTasks( 'grunt-markdown' );
    grunt.loadNpmTasks( 'grunt-tar.gz' );

    grunt.registerTask( 'dist', ['concat', 'uglify' ] );

    grunt.registerTask( 'qa', ['htmlhint', 'jshint', 'jasmine' ] );

    grunt.registerTask( 'lint', ['jshint', 'htmlhint'] );
    grunt.registerTask( 'test', ['jshint', 'htmlhint', 'jasmine'] );
    grunt.registerTask( 'default', ['jshint', 'htmlhint', 'concat', 'uglify'] )
};
