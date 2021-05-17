precision highp float;

uniform float u_seed;
uniform bool u_init;    // True if we need to initalize the board
uniform vec2 u_resolution;
uniform float u_time;
uniform bool u_update;
uniform sampler2D u_texture;

// grab texcoords from vert shader
varying vec2 vTexCoord;

float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453 * u_seed);
}

void main() {
    /* vec2 delta = vec2(1.0, 1.0)/u_resolution.xy; */
    vec2 delta = vec3(1.0, 1.0, 1.0)/textureSize(u_texture, 0);
    // Normalize the position between 0 and 1
    vec2 st = gl_FragCoord.xy/u_resolution.xy; 
    vec2 uv = vTexCoord;

    // Initialize with random values
    if (u_init) {
        float r = rand(st);
        if (r>0.8) { // Alive
            gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        } else {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }
        return;
    }

    if (!u_update) {
        gl_FragColor = texture2D(u_texture, uv);
        return;
    }


    bool isAlive = texture2D(u_texture, uv).a > 0.0;
    int aliveNeighbors = 0;
    if (texture2D(u_texture, vec2(uv.x-delta.x, uv.y-delta.y)).a > 0.0) {
        aliveNeighbors++;
    }
    if (texture2D(u_texture, vec2(uv.x, uv.y-delta.y)).a > 0.0) {
        aliveNeighbors++;
    }
    if (texture2D(u_texture, vec2(uv.x+delta.x, uv.y-delta.y)).a > 0.0) {
        aliveNeighbors++;
    }

    if (texture2D(u_texture, vec2(uv.x-delta.x, uv.y)).a > 0.0) {
        aliveNeighbors++;
    }
    if (texture2D(u_texture, vec2(uv.x+delta.x, uv.y)).a > 0.0) {
        aliveNeighbors++;
    }

    if (texture2D(u_texture, vec2(uv.x-delta.x, uv.y+delta.y)).a > 0.0) {
        aliveNeighbors++;
    }
    if (texture2D(u_texture, vec2(uv.x, uv.y+delta.y)).a > 0.0) {
        aliveNeighbors++;
    }
    if (texture2D(u_texture, vec2(uv.x+1.0, uv.y+1.0)).a > 0.0) {
        aliveNeighbors++;
    }

    if (
            (isAlive && aliveNeighbors > 1 && aliveNeighbors < 4) ||
            (!isAlive && aliveNeighbors == 3)
       ) {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    } else {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 0.0);
    }
}
