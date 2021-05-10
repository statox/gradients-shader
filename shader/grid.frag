/* https://itp-xstory.github.io/p5js-shaders/#/./docs/examples/shaders_to_vertices */

/*
Example:
 Color the entire background blue
*/

precision highp float;

uniform vec2 u_resolution;
uniform sampler2D u_texture;

// grab texcoords from vert shader
varying vec2 vTexCoord;

void main() {
    // Normalize the position between 0 and 1
    vec2 st = gl_FragCoord.xy/u_resolution.xy; 
    vec2 uv = vTexCoord;

    vec4 tex = texture2D(u_texture, uv);
    tex /= vec4(3.0, 3.0, 3.0, 3.0);
    gl_FragColor = tex;
}
