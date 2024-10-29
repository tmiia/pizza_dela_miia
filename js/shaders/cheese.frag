varying vec2 vUv;
varying vec3 vPos;
varying vec3 vNormal;
varying vec3 vWorldPosition;

uniform sampler2D uTexture;
uniform float uBurnOpacity;

vec3 blendLinearBurn(vec3 base, vec3 blend) {
	// Note : Same implementation as BlendSubtract
	return max(base+blend-vec3(1.0),vec3(0.0));
}

vec3 blendLinearBurn(vec3 base, vec3 blend, float opacity) {
	return (blendLinearBurn(base, blend) * opacity + base * (1.0 - opacity));
}

void main(void) {
  vec3 pos = vPos;


  vec4 color = texture(uTexture, vUv).rgba;

  vec3 burnColor = vec3(255., 212., 81.) / 255.;

  color.rgb = blendLinearBurn(color.rgb, burnColor, uBurnOpacity);

    if(texture(uTexture, vUv).a < 0.3){
    discard;
    }

  gl_FragColor = vec4(color.rgb, 1.);
}
