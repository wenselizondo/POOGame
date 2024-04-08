const browsersync = require("browser-sync").create();
const { series, src, dest, watch } = require("gulp");
const zip = require('gulp-vinyl-zip').zip;
const gulp = require("gulp");
const clean = require('gulp-clean');
const { rollup } = require('rollup');
const { terser } = require('rollup-plugin-terser');
const cleanCSS = require('clean-css');
const concat = require('gulp-concat');
var exec = require('child_process').exec;
var fs = require('fs');
const isDevelopment = true;

function copyFiles() {
    return src('js/*.js').pipe(dest('dist/js'));
};

function watchTask() {
    watch('*.html', browsersyncReload);
    watch('js/', { events: 'all' }, browsersyncReload);
    watch('css/', browsersyncReload);
};

function browsersyncStart(cd) {
    const config = { server: { baseDir: '.' } };
    browsersync.init(config);
    cd();
};

function browsersyncReload(cd) {
    bundleCSS();
    bundleJS();
    browsersync.reload();
    cd();
};

function zipFiles() {
    return src('./js/*').pipe(zip('Archive.zip')).pipe(gulp.dest('.'));
}

function cleanDistFolder() {
    return src('dist', { read: false })
        .pipe(clean());
};

function cleanZip() {
    return src('Archive.zip', { read: false })
        .pipe(clean());
};

const bundleJS = async function () {

    var input = 'js/main.js';;
    console.log('-> BUNDLE PROYECT');

    const bundle = await rollup({
        input: input
    });

    return bundle.write({
        file: 'dist/bundle.js',
        format: 'es',
        sourcemap: isDevelopment ? 'inline' : false,
        plugins: [
            terser({
                ecma: 2020,
                mangle: { toplevel: true },
                compress: {
                    module: true,
                    toplevel: true,
                    unsafe_arrows: true,
                    drop_console: !isDevelopment,
                    drop_debugger: !isDevelopment
                },
                output: { quote_style: 1 }
            })
        ]
    });
}

function bundleCSS() {

    const options = {
        compatibility: '*',
        inline: ['all'],
        level: 2
    };

    return src('css/**/*.css')
        .pipe(concat('dist/bundle.css'))
        .on('data', function (file) {
            const bufferFile = new cleanCSS(options).minify(file.contents)
            return file.contents = Buffer.from(bufferFile.styles)
        })
        .pipe(dest('./'));
};

function firebase(cb) {
    exec('firebase deploy', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
}

exports.deploy = series(
    bundleCSS,
    bundleJS,
    firebase
);

exports.bundle = series(
    bundleCSS,
    bundleJS
);

exports.run = series(
    bundleCSS,
    bundleJS,
    browsersyncStart,
    watchTask
);

exports.clean = series(
    cleanDistFolder,
    cleanZip
);

exports.css = series(
    bundleCSS
);

exports.zip = series(
    zipFiles
);

//exports.build = series (transpile,bundle); 
exports.default = series(copyFiles);