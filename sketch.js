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

        const canvas = p5.createCanvas(800, 800, p5.WEBGL);
        canvas.parent('canvasDiv');
        p5.colorMode(p5.HSB, 100);
        p5.setAttributes('antialias', true);
    };

    p5.draw = () => {
        gradientShader.setUniform('u_c1', [0.25, 0.54, 0.54]);
        gradientShader.setUniform('u_c2', [0.09, 0.63, 0.42]);

        gradientShader.setUniform('u_resolution', [p5.width, p5.height]);
        p5.shader(gradientShader);
        p5.rect(0, 0, p5.width, p5.height);
    };
};

new p5(sketch);
