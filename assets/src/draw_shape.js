import { Scene } from 'three';
import { PerspectiveCamera } from 'three';
import {BoxGeometry} from 'three';
import {MeshPhongMaterial} from 'three';
import {Mesh} from 'three';
import {WebGLRenderer} from 'three';
import {AmbientLight} from 'three';
import {DirectionalLight} from 'three';
import DragControls from 'three-dragcontrols';
import GLTFExporter from 'three-gltf-exporter';


let scene,camera,geometry,material,mesh,renderer,light,directionalLight,objects=[],controls;

let init = function () { 

    renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Add renderer to page
    //document.body.appendChild(renderer.domElement);
    $("#shape_a").append(renderer.domElement);

    // Create camera.
    camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;

    // Create scene.
    scene = new Scene();

    // Create material
    material = new MeshPhongMaterial();

    // Create cube and add to scene.
    geometry = new BoxGeometry(100, 100, 100);
    mesh = new Mesh(geometry, material);
    scene.add(mesh);

    objects.push(mesh);

    // Create ambient light and add to scene.
    light = new AmbientLight(0x404040); // soft white light
    scene.add(light);

    // Create directional light and add to scene.
    directionalLight = new DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);
   

    // Add listener for window resize.
    window.addEventListener('resize', onWindowResize, false);

    controls = new DragControls( objects, camera, renderer.domElement );
    controls.addEventListener( 'dragstart', function ( event ) {

        //event.object.material.emissive.set( 0xFF0000 );
        event.object.material.color.setHex(0xFF0000);
    
    } );
    controls.addEventListener( 'dragend', function ( event ) {

        //event.object.material.emissive.set( 0xFF0000 );
        event.object.material.color.setHex(0xFF0000);
        //event.object.material.color.setHex(0xFF0000);
    
    } );

} 

let animate = function () { 
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
    
   
}

let onWindowResize = function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

let export_scene = function(){
    var exporter = new GLTFExporter();
// Parse the input and generate the glTF output
exporter.parse( scene, function ( gltf ) {
	if ( gltf instanceof ArrayBuffer ) {
        saveArrayBuffer( result, 'scene.glb' );
    } else {
        var output = JSON.stringify( gltf, null, 2 );
        console.log( output );
        saveString( output, 'scene.json' );
    }
}, {} );
}

let  saveString = function ( text, filename ) {
    save( new Blob( [ text ], { type: 'text/plain' } ), filename );
}

let saveArrayBuffer = function ( buffer, filename ) {
    save( new Blob( [ buffer ], { type: 'application/octet-stream' } ), filename );
}

let  save = function( blob, filename ) {
    var link = document.createElement( 'a' );
			link.style.display = 'none';
			document.body.appendChild( link ); // Firefox workaround, see #6594
    link.href = URL.createObjectURL( blob );
    link.download = filename;
    link.click();
    // URL.revokeObjectURL( url ); breaks Firefox...
}

  
const drawApi = {
    init,
    animate,
    export_scene
  }
  export default drawApi;
