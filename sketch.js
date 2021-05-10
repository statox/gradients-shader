const sketch = (p5) => {
    let gradientShader;
    let halfUniformShader;
    let boardDimensions = [50, 50];
    let appData = {};
    let init = true;
    let seed;

    p5.preload = () => {
        gradientShader = p5.loadShader('shader/uniform.vert', 'shader/gradient2.frag');
        rainbowShader = p5.loadShader('shader/uniform.vert', 'shader/rainbow.frag');
        halfUniformShader = p5.loadShader('shader/uniform2.vert', 'shader/uniform.frag');
        golShader = p5.loadShader('shader/uniform2.vert', 'shader/gol.frag');
    };

    p5.setup = () => {
        app = new Vue({
            el: '#app',
            data: appData
        });

        const canvas = p5.createCanvas(window.innerWidth * 0.9, window.innerHeight * 0.9, p5.WEBGL);
        canvas.parent('canvasDiv');
        p5.setAttributes('antialias', true);

        // boardDimensions = [p5.width / 10, p5.height / 10];

        golGraphics = p5.createGraphics(...boardDimensions, p5.WEBGL);
        golGraphics.shader(golShader);

        seed = Math.random();
    };

    let cpt = 0;
    p5.draw = () => {
        cpt += 1;

        golShader.setUniform('u_time', cpt);
        golShader.setUniform('u_seed', seed);
        golShader.setUniform('u_resolution', boardDimensions);
        golShader.setUniform('u_update', cpt % 10 === 0);

        if (init) {
            golShader.setUniform('u_init', true);
            init = false;
        } else {
            golShader.setUniform('u_init', false);
            golShader.setUniform('u_texture', golGraphics);
        }

        golGraphics.rect(0, 0, ...boardDimensions);
        p5.texture(golGraphics);
        p5.background('black');
        p5.rect(-p5.width / 2, -p5.height / 2, p5.width, p5.height);
    };
};

new p5(sketch);
