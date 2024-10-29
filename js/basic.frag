varying vec2 vUv;
varying vec3 vPos;
varying vec3 vNormal;
varying vec3 vWorldPosition;

uniform sampler2D uTexture;

void main(void) {
  vec3 pos = vPos;

  vec3 lightPosition = vec3(2., 1., 10.);

  vec3 lightDirection = normalize(lightPosition - vWorldPosition);
  float diff = dot(vNormal, lightDirection);

  vec4 color = texture(uTexture, vUv).rgba * diff * .9;

  gl_FragColor = vec4(color);
}
