const sketch = (p5) => {
    let gradientShader;
    let appData = {};

    p5.preload = () => {
        gradientShader = p5.loadShader('shader/gradient.vert', 'shader/gradient.frag');
    };

    p5.setup = () => {
        app = new Vue({
            el: '#app',
            data: appData
        });

        const canvas = p5.createCanvas(window.innerWidth * 0.9, window.innerHeight * 0.9, p5.WEBGL);
        canvas.parent('canvasDiv');
        p5.colorMode(p5.HSB, 100);
        // p5.setAttributes('antialias', true);
    };

    let cpt = 0;
    p5.draw = () => {
        cpt += 0.01;
        gradientShader.setUniform('u_c1', [0.25, 0.54, 0.54]);
        gradientShader.setUniform('u_c2', [0.09, 0.63, 0.42]);
        gradientShader.setUniform('u_time', cpt);

        gradientShader.setUniform('u_resolution', [p5.width, p5.height]);
        // gradientShader.setUniform('u_resolution', [p5.width * 2, p5.height * 2]);
        p5.shader(gradientShader);
        p5.rect(0, 0, p5.width, p5.height);
    };
};

new p5(sketch);
