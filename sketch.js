const sketch = (p5) => {
    let gradientShader;
    let halfUniformShader;
    let boardDimensions = [50, 50];
    let appData = {};
    let init = true;
    let seed;
    let cpt = 0;

    const updateSimulation = (init, time) => {
        shader.setUniform('u_resolution', [p5.width, p5.height]);
        shader.setUniform('u_texture', graphics);

        shader.setUniform('u_init', cpt === 1);
        shader.setUniform('u_time', cpt);

        graphics.rect(0, 0, p5.width, p5.height);
    };

    p5.preload = () => {
        shader = p5.loadShader('shader/uniform2.vert', 'shader/random.frag');
    };

    p5.setup = () => {
        app = new Vue({
            el: '#app',
            data: appData
        });

        const canvas = p5.createCanvas(window.innerWidth * 0.9, window.innerHeight * 0.9, p5.WEBGL);
        canvas.parent('canvasDiv');
        p5.setAttributes('antialias', true);

        graphics = p5.createGraphics(...boardDimensions, p5.WEBGL);
        graphics.shader(shader);

        setInterval(updateSimulation, 100);
    };

    p5.draw = () => {
        cpt += 1;

        p5.texture(graphics);
        p5.background('black');
        p5.rect(-p5.width / 2, -p5.height / 2, p5.width, p5.height);
    };
};

new p5(sketch);
