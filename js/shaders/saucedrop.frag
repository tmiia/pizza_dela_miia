uniform float uTime;
uniform sampler2D uTexture;
varying vec2 vUv;

void main(void) {
  vec2 uv = vUv;
  uv.y += uTime * 0.1;

  vec4 sauceColor = texture2D(uTexture, uv);

  gl_FragColor = vec4(sauceColor.rgb, sauceColor.a * 0.8);
}
