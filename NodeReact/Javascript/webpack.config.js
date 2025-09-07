const path = require('path');

module.exports = env => {
    // const mode = env.mode.toLowerCase() === 'release'
    //     ? 'production'
    //     : 'development'; // Default to development, production mode minifies scripts

    console.log(`Building with: ${JSON.stringify(env, null, 2)}.`);

    return [
        {
            resolve: {
                extensions: ['.js']
            },
            entry: './interop.js',
            output: {
                filename: 'bundle.js',
                path: path.join(__dirname),
                library: {
                    type: 'commonjs2'
                }
            },
            mode: 'development',
            target: 'node',
        },
    ];
};
