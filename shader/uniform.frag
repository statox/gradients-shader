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

// https://gist.github.com/yiwenl/745bfea7f04c456e0101
vec3 hsb2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
    // Normalize the position between 0 and 1
    vec2 st = gl_FragCoord.xy/u_resolution.xy; 
    vec2 uv = vTexCoord;

    vec4 tex1 = texture2D(u_texture, uv);
    vec4 tex = texture2D(u_texture, uv);
    /* tex += texture2D(u_texture, vec2(uv.x-1.0, uv.y-1.0)); */
    /* tex += texture2D(u_texture, vec2(uv.x,     uv.y-1.0)); */
    /* tex += texture2D(u_texture, vec2(uv.x+1.0, uv.y-1.0)); */

    tex += texture2D(u_texture, vec2(uv.x, uv.y-1.0));
    tex += texture2D(u_texture, vec2(uv.x, uv.y+1.0));

    /* tex += texture2D(u_texture, vec2(uv.x-1.0, uv.y+1.0)); */
    /* tex += texture2D(u_texture, vec2(uv.x,     uv.y+1.0)); */
    /* tex += texture2D(u_texture, vec2(uv.x+1.0, uv.y+1.0)); */

    tex /= vec4(3.0, 3.0, 3.0, 3.0);
    gl_FragColor = tex;

/*
 *     vec4 color;
 *     if (st.x > 0.5) {
 *         color = vec4(1.0, 0.0, 0.0, 1.0);
 *     } else {
 *         color = vec4(0.0, 0.0, 0.0, 0.0);
 *     }
 * 
 *     // Set the color of the pixel
 *     gl_FragColor = color;
 */
}
