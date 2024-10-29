varying vec2 vUv;
varying vec3 vPos;
varying vec3 vNormal;
varying vec3 vWorldPosition;

uniform float uTime;

void main(void){
  vec3 pos = position;
  vec3 norm = normal;

  float time = uTime;


  vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
  vec4 worldNormal = modelMatrix * vec4(norm, 1.0);
  vec4 modelViewPosition = viewMatrix * worldPosition;
  vec4 modelViewProjectionPosition = projectionMatrix * modelViewPosition;

  pos.z += sin(uv.x * 5. * time);

  gl_Position = modelViewProjectionPosition;
  vUv = uv;
  vPos = position;
  vNormal = worldNormal.xyz;
  vWorldPosition = worldPosition.xyz;
}
