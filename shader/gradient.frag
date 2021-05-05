/* https://itp-xstory.github.io/p5js-shaders/#/./docs/examples/shaders_to_vertices */

/*
Example:
 Color the entire background blue
*/

precision highp float;

uniform vec3 u_c1;
uniform vec3 u_c2;
uniform vec2 u_resolution;

// https://gist.github.com/yiwenl/745bfea7f04c456e0101
vec3 hsb2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

/* amt * (stop - start) + start, */
vec3 lerpColor(vec3 c1, vec3 c2, float amt) {
    return vec3(
        amt * (c2.x - c1.x) + c1.x,
        amt * (c2.y - c1.y) + c1.y,
        amt * (c2.z - c1.z) + c1.z
    );
}

void main() {
    // Normalize the position between 0 and 1
    vec2 st = gl_FragCoord.xy/u_resolution.xy; 

    // Define the color depending on the x position of the pixel (horizontal gradient)
    vec3 color = lerpColor(u_c1, u_c2, st.x);

    // Set the color of the pixel
    gl_FragColor = vec4(hsb2rgb(color), 1.0);
}
