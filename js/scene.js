let camera, controls, scene, renderer;
let container = document.getElementById('container');
init();
animate();

function init() {
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z = 4;
    camera.position.y = 1;
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xfafafa );
	light = new THREE.PointLight( 0xcccccc, 1, 50 );
	light.position.set( 0, 1, 4 );
	camera.add( light );
	light = new THREE.AmbientLight( 0x666666 );
	scene.add( light );
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.enableDamping = true;
    controls.dampingFactor = 0.20;
    controls.enableZoom = true;
    container.appendChild( renderer.domElement );
    window.addEventListener( 'resize', onWindowResize, false );
    container.addEventListener('mouseup', mouseClick, false);
    scene.add(camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
    requestAnimationFrame( animate );
    controls.update(); // required if controls.enableDamping = true, or if controls.autoRotate = true
    var mesh = scene.getObjectByName('dieObj');
    mesh.rotation.x += 0.002;
    mesh.rotation.y += 0.002;
    render();
}
function render() {
    renderer.render( scene, camera );
}

function mouseClick() {
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    mouse.x = ( event.clientX / container.clientWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / container.clientHeight ) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObjects(scene.children, true);
    const gif = document.querySelector('#gif');
    const background = document.querySelector('#background');
    gif.src = images[intersects[0].faceIndex];
    gif.className = "show";
    background.className = "show";
    gif.addEventListener('click', (evt) => {
        gif.className = "hide";
        background.className = "hide";
        window.setTimeout(() => {
            gif.className = '';
            background.className = '';
        }, 1000);
    });
}
