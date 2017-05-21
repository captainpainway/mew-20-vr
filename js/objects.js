getKittens();
let images = [];

function getKittens() {
    fetch('http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC&limit=100')
    .then((response) => {
        response.json().then((json) => {
            dieObj(json);
        });
    })
}

function dieObj(data) {
    let geometry = new THREE.IcosahedronGeometry(2.3);
    geometry.faceVertexUvs[0] = [];
    for(let i = 0; i < geometry.faces.length; i++) {
        geometry.faceVertexUvs[0].push([
            new THREE.Vector2(0,0),
            new THREE.Vector2(0.5,1),
            new THREE.Vector2(1,0),
        ]);
        geometry.faces[i].materialIndex = i;
    }
    let material = [];
    while(images.length < 21) {
        let random = Math.floor(Math.random() * 101);
        if(data.data[random] === undefined) {
            let random = Math.floor(Math.random() * 101);
        } else {
            images.push(data.data[random].images.original.url);
            let texture = new THREE.TextureLoader().load(data.data[random].images.original.url);
            texture.wrapS = THREE.RepeatWrapping;
            texture.repeat.x = -1;
            material.push(new THREE.MeshPhongMaterial( { map: texture, shading: THREE.FlatShading }))
        }
    }
    geometry.computeFaceNormals();
    var mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(material));
    mesh.name = "dieObj";
    scene.add(mesh);
}
