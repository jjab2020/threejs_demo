import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

import  draw_shape from './draw_shape';



$( document ).ready(function() {
  console.log("test jabrane");
  draw_shape.init();
  draw_shape.animate();
  draw_shape.export_scene();

});