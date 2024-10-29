const frag = /* glsl */`
uniform sampler2D tNormal;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPos;
varying vec3 vPosition;


  #include <common>
  #include <lights_pars_begin>

  void main() {
    
    // Initialize the lighting total
    vec3 color = vec3(0.4, 0.2, .25); // Base material color
    vec4 cNormal = texture(tNormal, vUv);
    
    // Get total lighting from all Three.js lights
    vec3 totalLight = vec3(0.0);
    
    #if NUM_DIR_LIGHTS > 0
    DirectionalLight directionalLight;
    
    // Loop through all directional lights
    #pragma unroll_loop_start
    for (int i = 0; i < NUM_DIR_LIGHTS; i++) {
        directionalLight = directionalLights[i];
        vec3 _directionToLight = directionalLight.direction;
        float _diff = max(dot(vNormal, _directionToLight), 0.0);
        totalLight += directionalLight.color * _diff;
    }
    #pragma unroll_loop_end
    #endif
    
    #if NUM_POINT_LIGHTS > 0
    PointLight pointLight;
    
    // Loop through all point lights
    #pragma unroll_loop_start
    for (int i = 0; i < NUM_POINT_LIGHTS; i++) {
        pointLight = pointLights[i];
        vec3 directionToLight = normalize(pointLight.position - vWorldPos);
        float diff = max(dot(vNormal, directionToLight), 0.0);
        
        // Calculate distance attenuation
        float distanceSq = dot(pointLight.position - vWorldPos, pointLight.position - vWorldPos);
        float attenuation = 1.0 / (1.0 + pointLight.distance * distanceSq);
        
        totalLight += pointLight.color * diff * attenuation;
    }
    #pragma unroll_loop_end
    #endif
    
    // Add lighting to base color
    color = totalLight * .4;
    // color = cNormal.rgb;

    gl_FragColor = vec4(color, 1.);

  }


`

export default frag
