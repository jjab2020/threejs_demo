import { Scene } from 'three';
import { PerspectiveCamera } from 'three';
import {BoxGeometry} from 'three';
import {MeshPhongMaterial} from 'three';
import {Mesh} from 'three';
import {WebGLRenderer} from 'three';
import {AmbientLight} from 'three';
import {DirectionalLight} from 'three';
import DragControls from 'three-dragcontrols';


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

        event.object.material.emissive.set( 0xaaaaaa );
    
    } );
    controls.addEventListener( 'dragend', function ( event ) {

        event.object.material.emissive.set( 0x000000 );
    
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

  
const drawApi = {
    init,
    animate
  }
  export default drawApi;
