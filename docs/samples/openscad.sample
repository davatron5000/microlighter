Logo(50);

module Logo(size=50, $fn=100) {
  hole = size/2;
  cylinderHeight = size * 1.25;

  difference() {
    sphere(d=size);

    cylinder(d=hole, h=cylinderHeight, center=true);
    #rotate([90, 0, 0]) cylinder(d=hole, h=cylinderHeight, center=true);
    rotate([0, 90, 0]) cylinder(d=hole, h=cylinderHeight, center=true);
  }
}

// From https://github.com/openscad/openscad/blob/6d8ff058743023a0e0013caa6954b57474be45ec/examples/Basics/logo.scad
