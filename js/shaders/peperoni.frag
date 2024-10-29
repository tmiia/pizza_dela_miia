varying vec2 vUv;
varying vec3 vPos;
varying vec3 vNormal;
varying vec3 vWorldPosition;

uniform sampler2D uTexture;

void main(void) {
  vec3 pos = vPos;

  // vec3 lightPosition = vec3(2., 1., 10.);

  // vec3 lightDirection = normalize(lightPosition - vWorldPosition);
  // float diff = max(dot(vNormal, lightDirection), 0.);

  // diff = max(diff, .3); //  ambient light

  vec4 color = texture(uTexture, vUv).rgba;
  // color.rgb *= diff * 1.;

  if(texture(uTexture, vUv).a < 0.3){
    discard;
  }

  // color = vec4(1.);

  gl_FragColor = vec4(color);
}
