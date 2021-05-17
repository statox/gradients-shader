/* https://itp-xstory.github.io/p5js-shaders/#/./docs/examples/shaders_to_vertices */

precision highp float;

uniform vec2 u_resolution;
uniform sampler2D u_texture;

// grab texcoords from vert shader
varying vec2 vTexCoord;

void main() {
    // Normalize the position between 0 and 1
    vec2 st = gl_FragCoord.xy/u_resolution.xy; 
    // Get the texture coordinate from the vertex shader
    vec2 uv = vTexCoord;
    // Get the color at the texture coordinate
    vec4 c = texture2D(u_texture, vec2(uv.x, 1.0-uv.y));
    //vec4 c = texture2D(u_texture, vec2(st.x, 1.0-st.y));
    // Reuse the same color
    if (c.a > 0.5) {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 0.0);
    } else {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
}
