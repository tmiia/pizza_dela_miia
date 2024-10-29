import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let turnOn = false;
const basilics = [];
const cheeses = [];
let hasSauce = false;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );

// const controls = new OrbitControls( camera, renderer.domElement );

const response = await fetch("./js/basic.frag");
const fragmentShader = await response.text();

const responseVert = await fetch("./js/basic.vert");
const vertexShader = await responseVert.text();

const responsePlane = await fetch("./js/plane.frag");
const fragmentShaderPlane = await responsePlane.text();

const responseVertPlane = await fetch("./js/plane.vert");
const vertexShaderPlane = await responseVertPlane.text();

const basilicRes = await fetch("./js/shaders/basilic.frag");
const basilicFragmentShader = await basilicRes.text();

const peperoniRes = await fetch("./js/shaders/peperoni.frag");
const peperoniFragmentShader = await peperoniRes.text();

const pateRes = await fetch("./js/shaders/pate.frag");
const pateFragmentShader = await pateRes.text();

const sauceRes = await fetch("./js/shaders/sauce.frag");
const sauceFragmentShader = await sauceRes.text();

const cheeseRes = await fetch("./js/shaders/cheese.frag");
const cheeseFragmentShader = await cheeseRes.text();


// const world = new CANNON.World();
// world.gravity.set(0, -9.82, 0);



const gltfLoader = new GLTFLoader();

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
gltfLoader.setDRACOLoader( dracoLoader );
let model;

gltfLoader.load(
	'./assets/pizza/models/pizza_dough/pizza.glb',

	function ( gltf ) {
    gltf.scene.traverse((object)=>{
      console.log(object);

      if (object.name === "pizza") {
        model = object;
        console.log(object.material);
      }
    })

    // console.log(gltf);
    // console.log(model);

    // model.position.set(0, -1, 5);
    model.position.set(-10, -1, 15);
    model.scale.set(0.5, 0.5, 0.5);
    scene.add(model);

    // const pizzaBody = new CANNON.Body({
    //   type: CANNON.Body.STATIC,
    //   shape: new CANNON.Box(new CANNON.Vec3(5, 0.1, 5)),
    //   position: new CANNON.Vec3(0, -1.01, 5),
    // });

    // world.addBody(pizzaBody);

    // model.userData.physicsBody = pizzaBody;

	},
	function ( error ) {
		console.log( 'An error happened' );
	}
);


const loader = new THREE.TextureLoader()
const peperoniTexture = await loader.loadAsync('./assets/pizza/peperoni_final.png')
const burnpizzaTexture = await loader.loadAsync('./assets/pizza/models/pizza_dough/textures/initialShadingGroup_burnColor.png')
const basilicTexture = await loader.loadAsync('./assets/pizza/basilic_final.png')
const sauceTexture = await loader.loadAsync('./assets/pizza/tomato_sauce.png')
const sauceCremeTexture = await loader.loadAsync('./assets/pizza/creme_sauce.png')
const mushroomTexture = await loader.loadAsync('./assets/pizza/mushroom.png')
const oliveTexture = await loader.loadAsync('./assets/pizza/olive.png')
const cheeseTexture = await loader.loadAsync('./assets/pizza/cheese.png')
const kitchenTexture = await loader.loadAsync('./assets/pizza/kitchen3.webp')

// texture.wrapS = THREE.RepeatWrapping;
// texture.wrapT = THREE.RepeatWrapping;

// burnpizzaTexture.wrapS = THREE.RepeatWrapping;
// burnpizzaTexture.wrapT = THREE.RepeatWrapping;
burnpizzaTexture.repeat.x = - 1;
burnpizzaTexture.repeat.y = 1;


const planeGeo = new THREE.PlaneGeometry( 150, 100, 50, 50)
const planeMaterial = new THREE.ShaderMaterial({
  vertexShader : vertexShaderPlane,
  fragmentShader : fragmentShaderPlane,
  uniforms: {
    uAspectRatio : new THREE.Uniform(camera.aspect),
    uTime : new THREE.Uniform(performance.now()),
    uTexture : new THREE.Uniform(kitchenTexture),
  },
  wireframe: false
})
const plane = new THREE.Mesh( planeGeo, planeMaterial );
plane.position.z = -25;
scene.add( plane );


const geometry = new THREE.PlaneGeometry(3,3, 50, 50 );
const sauceGeometry = new THREE.PlaneGeometry(5.5, 7);

geometry.rotateX(- Math.PI * 0.5);

// const pateMaterial = new THREE.ShaderMaterial({
//   transparent: true,
//   vertexShader : vertexShader,
//   fragmentShader : pateFragmentShader,
//   uniforms : {
//     uColor : new THREE.Uniform(new THREE.Color(0xF0FFF0)),
//     uTexture : new THREE.Uniform(pateTexture),
//     uTime : new THREE.Uniform(performance.now())
//   },
//   wireframe: false,
// });

const peperoniMaterial = new THREE.ShaderMaterial({
  transparent: true,
  vertexShader : vertexShader,
  fragmentShader : peperoniFragmentShader,
  uniforms : {
    uColor : new THREE.Uniform(new THREE.Color(0xF0FFF0)),
    uTexture : new THREE.Uniform(peperoniTexture),
    uTime : new THREE.Uniform(performance.now())
  },
  wireframe: false,
})

const sauceMaterial = new THREE.ShaderMaterial({
  transparent: true,
  vertexShader : vertexShader,
  fragmentShader : sauceFragmentShader,
  uniforms : {
    uColor : new THREE.Uniform(new THREE.Color(0xF0FFF0)),
    uTexture : new THREE.Uniform(sauceTexture),
    uTime : new THREE.Uniform(performance.now()),
    uMaxTime : new THREE.Uniform(5.0)
  },
  wireframe: false,
})

const sauceCremeMaterial = new THREE.ShaderMaterial({
  transparent: true,
  vertexShader : vertexShader,
  fragmentShader : sauceFragmentShader,
  uniforms : {
    uColor : new THREE.Uniform(new THREE.Color(0xF0FFF0)),
    uTexture : new THREE.Uniform(sauceCremeTexture),
    uTime : new THREE.Uniform(performance.now()),
    uMaxTime : new THREE.Uniform(5.0)
  },
  wireframe: false,
})

const basilicMaterial = new THREE.ShaderMaterial({
  transparent: true,
  vertexShader : vertexShader,
  fragmentShader : basilicFragmentShader,
  side: THREE.DoubleSide,
  uniforms : {
    uColor : new THREE.Uniform(new THREE.Color(0xF0FFF0)),
    uTexture : new THREE.Uniform(basilicTexture),
    uTime : new THREE.Uniform(performance.now())
  },
  wireframe: false,
})

// const basilicMaterial = new CANNON.Material('basilicMaterial');
// const groundMaterial = new CANNON.Material('groundMaterial');

// const basilicContactMaterial = new CANNON.ContactMaterial(
//   basilicMaterial,
//   groundMaterial,
//   { friction: 0.5, restitution: 0.3 }
// );
// world.addContactMaterial(basilicContactMaterial);




const mushroomMaterial = new THREE.ShaderMaterial({
  transparent: true,
  vertexShader : vertexShader,
  fragmentShader : basilicFragmentShader,
  uniforms : {
    uColor : new THREE.Uniform(new THREE.Color(0xF0FFF0)),
    uTexture : new THREE.Uniform(mushroomTexture),
    uTime : new THREE.Uniform(performance.now())
  },
  wireframe: false,
})

const oliveMaterial = new THREE.ShaderMaterial({
  transparent: true,
  vertexShader : vertexShader,
  fragmentShader : basilicFragmentShader,
  uniforms : {
    uColor : new THREE.Uniform(new THREE.Color(0xF0FFF0)),
    uTexture : new THREE.Uniform(oliveTexture),
    uTime : new THREE.Uniform(performance.now())
  },
  wireframe: false,
})

const cheeseMaterial = new THREE.ShaderMaterial({
  transparent: true,
  vertexShader : vertexShader,
  fragmentShader : cheeseFragmentShader,
  uniforms : {
    uColor : new THREE.Uniform(new THREE.Color(0xF0FFF0)),
    uTexture : new THREE.Uniform(cheeseTexture),
    uTime : new THREE.Uniform(performance.now()),
    uBurnOpacity: new THREE.Uniform(0.)
  },
  wireframe: false,
})

//Lights

const light = new THREE.AmbientLight( 0xFFFFFF, 3);
scene.add( light );

const pointLight = new THREE.PointLight( 0xFF741F, 300, 10, 1 );
if (model) {
  pointLight.lookAt(model);
}
pointLight.position.set(-3, 2, 8);
scene.add( pointLight );

camera.position.y = 2;
camera.position.z = 15;

renderer.toneMappingExposure = 1.5;
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setAnimationLoop( animate );

function createPeperoni(x, z){
  const peperoni = new THREE.Mesh( geometry, peperoniMaterial );

  peperoni.scale.set(0.9, 0.9, 0.9);

  peperoni.position.y = 0.4 + Math.random() * 0.01;
  peperoni.position.x = x
  peperoni.position.z = z

  model.add( peperoni );
}

function createBasilic(x, z, scale = 0.5) {
  const basilic = new THREE.Mesh( geometry, basilicMaterial );

  basilic.scale.set(scale, scale, scale);

  basilic.position.y = 0.45 + Math.random() * 0.01;
  basilic.position.x = x
  basilic.position.z = z

  basilic.rotation.y = Math.random() * Math.PI * 2

  model.add( basilic );
}

// function createBasilic(x, z, scale = 0.5) {
//   const basilic = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), basilicMaterial);
//   basilic.scale.set(scale, scale, scale);
//   basilic.position.set(x, 10, z);

//   const basilicBody = new CANNON.Body({
//     mass: 0.001,
//     shape: new CANNON.Sphere(0.25),
//     material: new CANNON.Material('basilicMaterial'),
//     position: new CANNON.Vec3(x, 10, z),
//   });

//   world.addBody(basilicBody);

//   basilic.userData.physicsBody = basilicBody;
//   scene.add(basilic);

//   basilics.push(basilic);
// }

function createMushroom(x, z, scale = 0.5) {
  const mushroom = new THREE.Mesh( geometry, mushroomMaterial );

  mushroom.scale.set(scale, scale, scale);

  mushroom.position.y = 0.45 + Math.random() * 0.01;
  mushroom.position.x = x
  mushroom.position.z = z

  mushroom.rotation.y = Math.random() * Math.PI * 2

  model.add( mushroom );
}

function createOlive(x, z, scale = 0.5) {
  const olive = new THREE.Mesh( geometry, oliveMaterial );

  olive.scale.set(scale, scale, scale);

  olive.position.y = 0.53 + Math.random() * 0.01;
  olive.position.x = x
  olive.position.z = z

  olive.rotation.y = Math.random() * Math.PI * 2

  model.add( olive );
}

function createCheese(x, z, scale = 1.5) {
  const cheese = new THREE.Mesh( geometry, cheeseMaterial );

  cheese.scale.set(scale, scale, scale);

  cheese.position.y = 0.6 + Math.random() * 0.01;
  cheese.position.x = x
  cheese.position.z = z

  cheese.rotation.y = Math.random() * Math.PI * 2

  model.add( cheese );
  cheeses.push(cheese);
}

function createSauce(sauceMaterial) {
  const sauce = new THREE.Mesh(sauceGeometry, sauceMaterial);
  let y = 0.4;
  if (hasSauce) {
    y += 0.002;
  }

  sauce.position.set(0, y, 0);
  sauce.scale.setScalar(0);
  sauce.rotateX(-Math.PI * 0.5)

  model.add(sauce);

  dropsauce(sauce);
  hasSauce = true;
}


// function updatePhysics(deltaTime) {
//   world.step(1 / 60, deltaTime);

//   basilics.forEach((basilic) => {
//       const basilicBody = basilic.userData.physicsBody;
//       basilic.position.copy(basilicBody.position);
//       basilic.quaternion.copy(basilicBody.quaternion);
//   });
// }

let a = 0

document.querySelector('.js-create-peperoni').addEventListener('click', ()=>{
  a += Math.random()

  let radius = 4.5;

  if (Math.random() < 0.5) {
    radius = 1.5 + Math.random() * 4;
  }

  radius = 4 + Math.random() * 4;

  const x = Math.cos(a) * radius;
  const z = 1 + Math.sin(a) * radius;

  createPeperoni(x, z)
})

let basilicAngle = Math.PI / 2
document.querySelector('.js-create-basilic').addEventListener('click', ()=>{
  basilicAngle -= 1

  const radius = 3.5 + Math.random() * 3.5;

  const x = Math.cos(basilicAngle) * radius;
  const z = 2.5 + Math.sin(basilicAngle) * radius;

  createBasilic(x, z, 0.5 +Math.random() * 1.5)
})

let mushroomAngle = 0
document.querySelector('.js-create-mushroom').addEventListener('click', ()=>{
  mushroomAngle += 1

  const radius = 3 + Math.random() * 3;

  const x = Math.cos(mushroomAngle) * radius;
  const z = 1 + Math.sin(mushroomAngle) * radius;

  createMushroom(x, z, 0.5 +Math.random() * 1.5)
})

let oliveAngle = 0
document.querySelector('.js-create-olive').addEventListener('click', ()=>{
  oliveAngle += 1

  const radius = 1.5 + Math.random() * 1.5;

  const x = Math.cos(oliveAngle) * radius;
  const z = Math.sin(oliveAngle) * radius;

  createOlive(x, z)
})

let cheeseAngle = 0
document.querySelector('.js-create-cheese').addEventListener('click', ()=>{
  cheeseAngle += 1

  const radius = 4.4 + Math.random() * 4.4;

  const x = Math.cos(cheeseAngle) * radius;
  const z = 1 + Math.sin(cheeseAngle) * radius;

  createCheese(x, z)
})

document.querySelector('.js-drop-sauce').addEventListener('click', ()=>{
  createSauce(sauceMaterial);
})

document.querySelector('.js-drop-sauce-creme').addEventListener('click', ()=>{
  createSauce(sauceCremeMaterial);
})

document.querySelector('.js-play').addEventListener('click', ()=>{
  intro();
})

document.querySelector('.js-cookPizza').addEventListener('click', ()=>{
  cookPizza();
})

document.querySelector('.btn-switch').addEventListener('click', ()=>{
  vegan();
})

function dropsauce(sauce) {
  gsap.to(sauce.scale, {
    duration: 1,
    onUpdate: function() {
      sauce.scale.setScalar(gsap.getProperty(sauce.scale, "scale"));
    },
    onComplete: ()=>{
      turnOn = true
    },
    scale: 4.2,
    ease: "power2.inOut"
  });
}

function animate() {
  // updatePhysics(performance.now());


  basilics.forEach(basilicLeaf => {
    basilicLeaf.rotation.z = Math.sin(performance.now() * 0.002) * 0.05;
    basilicLeaf.position.y += Math.sin(performance.now() * 0.003) * 0.001;
  });


  if (turnOn) {
    model.rotation.y -= 0.01;
  }

  // model.rotation.x += 0.01;
	// model.rotation.y += 0.01;

  // pateMaterial.uniforms.uTime.value = performance.now() * 0.001;

	renderer.render( scene, camera );
}

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function intro() {

  const audio = document.getElementById('music');
  audio.volume = 0.3;
  audio.play();

  const tl = gsap.timeline();

  tl.to(".intro", {
    opacity: 0,
    ease: "power2.inOut",
  })
  .to(".intro", {
    display: "none",
    duration: 0,
  })
  .to(".action", {
    opacity: 1,
    duration: 0.3,
    ease: "power2.inOut",
  }, "<")
  .to(model.position, {
    duration: 0.6,
    x: 0,
    y: -1,
    z: 5,
    ease: "power2.inOut",
  }, "-=0.25")
  .to(model.rotation, {
    duration: 0.8,
    y: Math.PI * 2,
    ease: "power2.inOut",
  }, "-=0.6")
  .to(".oven-btn", {
    opacity: 1,
    scale: 1,
  }, "-=0.05")
  .to(".ticket", {
    opacity: 1,
    scale: 1,
  }, "-=0.45")
}


function cookPizza() {
  const timeline = gsap.timeline();

  timeline

    .to(model.position, {
      z: 15,
      duration: 1,
      ease: "power2.inOut",
      onUpdate: function() {
        model.position.z = gsap.getProperty(model.position, "z");
      }
    })

    .call(() => {
      cheeseMaterial.uniforms.uBurnOpacity.value = 0.5;
      cheeses.forEach(cheese => {
        cheese.scale.setScalar(2)
      });

      model.material.map = burnpizzaTexture;
    })

    .to(model.position, {
      z: 5,
      duration: 1,
      ease: "power2.inOut",
    });


}

function vegan() {
  const switchbtn = document.querySelector('.btn-switch');
  const patchs = document.querySelectorAll('.patch');

  switchbtn.classList.toggle('active');

  patchs.forEach(patch => {
    patch.classList.toggle('active');
  });
}
