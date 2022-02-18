let scene, camera, renderer, light;
let background, sun, saturn, saturnInRing, saturnOutRing, rhea, iapetus, dione, tethys, enceladus, mimas, titan;
var controls;

init();
animate();

function init() {
  // create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x141312 );

  //camera
  camera = new THREE.PerspectiveCamera(
    7,
    window.innerWidth / window.innerHeight,
    5,
    1000
    );
  camera.position.x = -60
  camera.position.y = 0
  camera.position.z = 110
      
  //object rotate function
  function rotateObject(object, degreeX = 0, degreeY = 0, degreeZ = 0) {
    object.rotateX(THREE.Math.degToRad(degreeX));
    object.rotateY(THREE.Math.degToRad(degreeY));
    object.rotateZ(THREE.Math.degToRad(degreeZ));
  }
  
  //texture loader
  const textureLoader = new THREE.TextureLoader();
    
  // starfield geometry spec
  const starfieldGeo = new THREE.SphereGeometry(550, 30, 30 );
  const starfieldMat = new THREE.MeshBasicMaterial({ 
    side: THREE.BackSide,
    emissive: 0xffffff, 
    emissiveIntensity: 0.001,
    map: textureLoader.load("textures/starBoxMaster.png", 
      function (starfieldMat) {
        starfieldMat.wrapS = starfieldMat.wrapT = THREE.RepeatWrapping;
        starfieldMat.offset.set( 0, 1 );
        starfieldMat.repeat.set( 30, 30 );
      })
  });
  background = new THREE.Mesh(starfieldGeo, starfieldMat);
  background.rotateY(45);
  background.castShadow = false;
  background.receiveShadow = false;
  scene.add(background);
  
  //sun
  const sunGeo = new THREE.SphereGeometry(0.5, 32, 18);
  const sunMat = new THREE.MeshStandardMaterial({ 
    color: 0xFAF8E0, 
    emissive: 0xFAF8E0, 
    emissiveIntensity: 1 
  });
  sun = new THREE.Mesh(sunGeo, sunMat);
  sun.transparent = true;
  sun.position.set(200, 0, 200);
  sun.rotation.x = Math.PI * 0.2;
  sun.castShadow = false;
  sun.receiveShadow = false;
  scene.add(sun);
  
  //saturn body 
  const saturnGeo = new THREE.SphereGeometry(3.8820, 32, 18);
  const saturnMat = new THREE.MeshLambertMaterial({ 
    map: textureLoader.load("textures/Saturn.png"),
    normalMap: textureLoader.load("textures/saturn_clouds_texture.png")
  });
  saturn = new THREE.Mesh(saturnGeo, saturnMat);
  saturn.transparent = true;
  saturn.rotation.x = Math.PI * 0.2;
  saturn.castShadow = true;
  saturn.receiveShadow = false;
  scene.add(saturn);
  
  //saturn inner ring
  const saturnRingGeo = new THREE.RingGeometry(4.5, 5.5, 30, 30);
  const saturnInRingMat = new THREE.MeshLambertMaterial({ 
    side: THREE.DoubleSide, 
    map: textureLoader.load("textures/saturn_ring_texture.png") 
  });
  saturnInRing = new THREE.Mesh(saturnRingGeo, saturnInRingMat);
  saturnInRing.transparent = true;
  rotateObject(saturnInRing, 90, 0, 0);
  saturnInRing.castShadow = false;
  saturnInRing.receiveShadow = true;
  saturn.add(saturnInRing);

  //saturn outer ring
  const saturnOutRingGeo = new THREE.RingGeometry(5.6, 9, 30, 30);
  const saturnOutRingMat = new THREE.MeshLambertMaterial({ 
    side: THREE.DoubleSide,
    map: textureLoader.load("textures/saturn_ring_texture.png")
  });
  saturnOutRing = new THREE.Mesh(saturnOutRingGeo, saturnOutRingMat);
  saturnOutRing.transparent = true;
  rotateObject(saturnOutRing, 90, 0, 0);
  saturnOutRing.castShadow = false;
  saturnOutRing.receiveShadow = true;
  saturn.add(saturnOutRing);

  //Rhea body
  const rheaGeo = new THREE.SphereGeometry(0.509, 16, 16);
  const rheaMat = new THREE.MeshLambertMaterial({ 
    map: textureLoader.load("textures/Rhea_texture.png")
  });
  rhea = new THREE.Mesh(rheaGeo, rheaMat);
  rheaObj = new THREE.Object3D();
  rheaObj.add(rhea);
  scene.add(rheaObj);
  rhea.position.x = 19;

  //Iapetus body
  const iapetusGeo = new THREE.SphereGeometry(0.49, 16, 16);
  const iapetusMat = new THREE.MeshLambertMaterial({ 
    map: textureLoader.load("textures/iapetus_texture.png") 
  });
  iapetus = new THREE.Mesh(iapetusGeo, iapetusMat);
  iapetusObj = new THREE.Object3D();
  iapetusObj.add(iapetus);
  scene.add(iapetusObj);
  iapetus.position.x = 28;

  //Dione body
  const dioneGeo = new THREE.SphereGeometry(0.37433, 16, 16);
  const dioneMat = new THREE.MeshLambertMaterial({
     map: textureLoader.load("textures/dione_texture.png") 
  });
  dione = new THREE.Mesh(dioneGeo, dioneMat);
  dioneObj = new THREE.Object3D();
  dioneObj.add(dione);
  scene.add(dioneObj);
  dione.position.x = 17.5;

  //Tethys body
  const tethysGeo = new THREE.SphereGeometry(0.354, 16, 16);
  const tethysMat = new THREE.MeshLambertMaterial({ 
    map: textureLoader.load("textures/tethys_texture.png") 
  });
  tethys = new THREE.Mesh(tethysGeo, tethysMat);
  tethysObj = new THREE.Object3D();
  tethysObj.add(tethys);
  scene.add(tethysObj);
  tethys.position.x = 14.8;

  //Enceladus body
  const enceladusGeo = new THREE.SphereGeometry(0.168, 16, 16);
  const enceladusMat = new THREE.MeshLambertMaterial({
     map: textureLoader.load("textures/enceladus_texture.png") 
  });
  enceladus = new THREE.Mesh(enceladusGeo, enceladusMat);
  enceladusObj = new THREE.Object3D();
  enceladusObj.add(enceladus);
  scene.add(enceladusObj);
  enceladus.position.x = 12.9;

  //Mimas body
  const mimasGeo = new THREE.SphereGeometry(0.132, 16, 16);
  const mimasMat = new THREE.MeshLambertMaterial({
    map: textureLoader.load("textures/mimas_texture.png") 
  });
  mimas = new THREE.Mesh(mimasGeo, mimasMat);
  mimasObj = new THREE.Object3D();
  mimasObj.add(mimas);
  scene.add(mimasObj);
  mimas.position.x = 11.1;
  
  //Titan body
  const titanGeo = new THREE.SphereGeometry(0.716, 16, 16);
  const titanMat = new THREE.MeshLambertMaterial({
    map: textureLoader.load("textures/titan_texture.png") 
  });
  titan = new THREE.Mesh(titanGeo, titanMat);
  titanObj = new THREE.Object3D();
  titanObj.add(titan);
  scene.add(titanObj);
  titan.position.x = 23;

  //renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  //lighting + shadow
  scene.add(new THREE.AmbientLight(0xFAF8E0, 0.02));
  light = new THREE.DirectionalLight(0xfdfdfd, 0.7, 100);
  light.position.set(200, -50, 190);
  light.castShadow = true;
  scene.add(light);
  
  light.shadow.mapSize.width = 4096;
  light.shadow.mapSize.height = 4096;
  light.shadow.camera.near = 0.5;
  light.shadow.camera.far = 500;
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  //orbit controls
  controls = new THREE.OrbitControls (camera);
  controls.addEventListener( 'change', renderer );
  controls.minPolarAngle = Math.PI * 0.25;
  controls.maxPolarAngle =  Math.PI * 0.78;
  controls.minDistance = 10;
  controls.maxDistance = 450;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
  
function animate() {
  saturn.rotation.y += 0.00050;
  saturnInRing.rotation.z += -0.0001;
  rheaObj.rotateY (0.00030666);
    rhea.rotateY (0.00030666);
  iapetusObj.rotateY (0.00011800);
    iapetus.rotateY (0.0011800);
  dioneObj.rotateY (0.00036593);
    dione.rotateY (0.0036593);
  tethysObj.rotateY (0.00040595);
    tethys.rotateY (0.0040595);
  enceladusObj.rotateY (0.00044496);
    enceladus.rotateY (0.0044496);
  mimasObj.rotateY (0.00053971);
    mimas.rotateY (0.0053971);
  titanObj.rotateY (0.00019992);
    titan.rotateY (0.0019992);
  
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  controls.update();
}

window.addEventListener('resize', onWindowResize, false);

