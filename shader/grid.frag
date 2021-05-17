/* https://itp-xstory.github.io/p5js-shaders/#/./docs/examples/shaders_to_vertices */

/*
Example:
 Color the entire background blue
*/

precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform bool u_init;
uniform sampler2D u_texture;

// grab texcoords from vert shader
varying vec2 vTexCoord;

// https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83
float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

// https://gist.github.com/yiwenl/745bfea7f04c456e0101
vec3 hsb2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
    // Normalize the position between 0 and 1
    vec2 st = gl_FragCoord.xy/u_resolution.xy; 
    // uv in the texture
    vec2 texture_uv = vTexCoord;

    // uv in the grid
    int _Pixels = int(u_resolution.x) * int(u_resolution.y);
    vec2 uv = vec2(round(texture_uv.x * _Pixels) / _Pixels,round(texture_uv.y * _Pixels) / _Pixels);
    float s = 1 / _Pixels;

    if (u_init) {
        vec3 color = vec3(uv.x*3.33, 0.5, 0.5);
        gl_FragColor = vec4(hsb2rgb(color), 1.0);
        return;
    }

    // Center of this cell
    vec4 c = texture2D(u_texture, uv + vec2(0, +s));
    gl_FragColor = c;
    // Center of bottom cell
    /* float bc = tex2D(_MainTex, uv + fixed2( 0, +s)).a; */

    /* vec4 c = texture2D(u_texture, uv); */
    /* gl_FragColor = vec4(c.g, c.b, c.r, c.a); */
}
