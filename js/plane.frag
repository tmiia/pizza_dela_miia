varying vec2 vUv;
varying vec3 vPos;
varying vec3 vNormal;
varying vec3 vWorldPosition;

uniform float uAspectRatio;
uniform float uTime;
uniform sampler2D uTexture;


void main(void) {
  // vec2 uv = vUv;

  // float time = uTime;
  // vec2 center = vec2(0.5);
  // vec2 aspectCorrectedUv = vec2(uv.x * uAspectRatio, uv.y);
  // vec2 aspectCorrectedCenter = vec2(center.x * uAspectRatio, center.y);

  // float distToCenter = distance(aspectCorrectedUv, aspectCorrectedCenter);
  // float radius = .5;

  // float circle = step(radius, mod(distToCenter * 3. - time, 1.));

  // vec3 color = vec3(.4, .3, .7);

  // // color += circle * vec3(sin(uv.x * distToCenter), sin(uv.y * distToCenter), 0.0);
  // color *= mix(vec3(.2, .3, .60), color, smoothstep(radius, radius + .4, mod(distToCenter * 4. - time, 1.)));

  // vec3 pos = vPos;

  vec2 uv = vUv;
  // uv.y += uTime * 0.1;

  vec4 texture = texture2D(uTexture, uv);

  gl_FragColor = vec4(texture);
}
