/* https://itp-xstory.github.io/p5js-shaders/#/./docs/examples/shaders_to_vertices */

/*
Example:
 Color the entire background blue
*/

precision highp float;

uniform vec3 u_c1;
uniform vec3 u_c2;
uniform float u_time;
uniform vec2 u_resolution;


// https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83
/*
 * float rand(vec2 n) { 
 *     return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
 * }
 * 
 * float noise(vec2 p){
 *     vec2 ip = floor(p);
 *     vec2 u = fract(p);
 *     u = u*u*(3.0-2.0*u);
 * 
 *     float res = mix(
 *             mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
 *             mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
 *     return res*res;
 * }
 */

float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

float noise(vec3 p){
    vec3 a = floor(p);
    vec3 d = p - a;
    d = d * d * (3.0 - 2.0 * d);

    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);

    vec4 c = k2 + a.zzzz;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c + 1.0);

    vec4 o1 = fract(k3 * (1.0 / 41.0));
    vec4 o2 = fract(k4 * (1.0 / 41.0));

    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

    return o4.y * d.y + o4.x * (1.0 - d.y);
}


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

    // Gradient using pixel position + time
    vec2 sampledSt = st*100.0;
    /* float amt = noise(vec3(sampledSt, u_time)); */
    float amt = noise(vec3(sampledSt.x + u_time, sampledSt.y, 0));
    vec3 color = lerpColor(u_c1, u_c2, amt);

    // Set the color of the pixel
    gl_FragColor = vec4(hsb2rgb(color), 1.0);
}
