import vue from "rollup-plugin-vue";
import buble from "@rollup/plugin-buble";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import {terser} from 'rollup-plugin-terser';
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));

const config = {
    input: "src/entry.js",
    external: [
        'vanilla-tilt'
    ],
    output: {
        name: "VueTilt",
        exports: "named",
        globals: {
            'vanilla-tilt': 'VanillaTilt',
        }
    },
    plugins: [
        replace({
            "process.env.NODE_ENV": JSON.stringify("production")
        }),
        commonjs(),
        vue(),
        buble()
    ]
};

// Only minify browser (iife) version
if (argv.format === "iife") {
    config.plugins.push(terser());
}

export default config;
