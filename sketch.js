const sketch = (p5) => {
    const D = 100;
    let gradientShader;
    let boardDimensions = [50, 50];
    let appData = {};

    let initialTexture;

    const updateSimulation = (init, time) => {
        console.log('update');
        // shader.setUniform('u_resolution', [p5.width, p5.height]);
        shader.setUniform('u_texture', graphics);

        graphics.rect(0, 0, p5.width, p5.height);
    };

    p5.preload = () => {
        // Create the initial image
        initialTexture = p5.createImage(D, D);
        initialTexture.loadPixels();
        for (let i = 0; i < initialTexture.width; i++) {
            for (let j = 0; j < initialTexture.height; j++) {
                // const alive = Math.random() < 0.1;
                // const alive = i < D / 2;
                // const alive = j % 10 === 0;
                // const alive = j < D / 2;
                // const alive = i === j;
                const alive = i === j || i === 10 || j === 40;
                const color = p5.color(250, 250, 250, alive ? 250 : 0);
                initialTexture.set(i, j, color);
            }
        }
        initialTexture.updatePixels();

        // Initialize the shader
        shader = p5.loadShader('shader/uniform2.vert', 'shader/alternating.frag');
    };

    p5.setup = () => {
        app = new Vue({
            el: '#app',
            data: appData
        });

        const canvas = p5.createCanvas(D, D, p5.WEBGL);
        canvas.parent('canvasDiv');

        graphics = p5.createGraphics(D, D, p5.WEBGL);
        graphics.shader(shader);

        // Initial step
        shader.setUniform('u_resolution', [p5.width, p5.height]);
        shader.setUniform('u_texture', initialTexture);
        graphics.rect(0, 0, p5.width, p5.height);

        // Next steps
        setInterval(updateSimulation, 1009);
    };

    p5.draw = () => {
        p5.background(0);
        p5.image(graphics, -p5.width / 2, -p5.height / 2);
    };
};

new p5(sketch);
