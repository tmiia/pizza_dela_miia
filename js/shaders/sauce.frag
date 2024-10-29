varying vec2 vUv;
varying vec3 vPos;
varying vec3 vNormal;
varying vec3 vWorldPosition;

uniform sampler2D uTexture;

void main(void) {
  vec3 pos = vPos;

  vec4 color = texture(uTexture, vUv).rgba;

  if(texture(uTexture, vUv).a < 0.3){
    discard;
  }

  gl_FragColor = vec4(color);
}
