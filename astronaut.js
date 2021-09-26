let earthAngle = 0
let earthTexture
const earth_radius = 6371;
let distance = 5000;
let SCALE = 0.02
let iss;
let camera;
let text;
let show_cone;
let orbit;

function calc_view_angle(){
    let a = Math.sqrt((distance+earth_radius)**2-earth_radius**2)//len of tangent
    let radius = a * earth_radius/(distance + earth_radius)
    let b = Math.sqrt(earth_radius**2 - radius**2)
    let h = -(distance + earth_radius - b)
    return ({
        b: b,
        h: h,
        radius: radius
    })
}

let s1 = function(sketch) {
    sketch.preload = function () {
        earthTexture = sketch.loadImage("earthtexture.jpg")
    }
    
    
    sketch.setup = function () {
        const canvas = sketch.createCanvas(300, 700, sketch.WEBGL)
        sketch.noStroke()
        slider = sketch.createSlider(0, 50000, 5000);
        show_cone = sketch.createCheckbox('Zeige Blickwinkel', false);
        orbit = sketch.createCheckbox('Bewegen', false);
        text = sketch.createP(distance);
        slider.position(10, 10);
        text.position(10, 50)
        show_cone.position(10, 100);
        orbit.position(10, 150);
        

    }

    sketch.draw = function () {
        
        distance = slider.value()
        text.html(distance)
        sketch.background(100)
        sketch.orbitControl()
        sketch.scale(SCALE)
        sketch.texture(earthTexture);
        sketch.sphere(earth_radius, 80, 80)
        sketch.noFill()
        sketch.stroke(0)
        sketch.strokeWeight(10)
        sketch.point(0, - (earth_radius + distance), 0)
        if (show_cone.checked()){

            let view_angle = calc_view_angle();
            sketch.translate(0, -(distance+earth_radius + view_angle.h/2), 0)
            sketch.strokeWeight(0.5)
            sketch.stroke("red")
            sketch.cone(view_angle.radius, view_angle.h, 16, 16)
            sketch.translate(0, +(distance+earth_radius), 0)
        }
    }
}

let s2 = function(sketch) {
    sketch.preload = function () {
        earthTexture = sketch.loadImage("earthtexture.jpg")
    }
    
    sketch.setup = function () {
        const canvas = sketch.createCanvas(1000, 700, sketch.WEBGL)

        // easycam2 = sketch.createEasyCam(
        //     {
        //         distance: SCALE*(distance+earth_radius),
                
        //     });

        sketch.strokeWeight(0.1)
        
    }

    sketch.draw = function () {
        // easycam2.setDistance(SCALE*(distance+earth_radius), 0);
        sketch.background(252)
        if (orbit.checked()){
            sketch.orbitControl()
        }
        else {
            sketch.camera(0, -SCALE*(distance+earth_radius), 0, 0, 0, 0, -1, 0, 0);
        }
        sketch.texture(earthTexture);
        sketch.scale(SCALE)
        sketch.sphere(earth_radius, 24, 24)
        sketch.stroke(0)
    }
}

const left = new p5(s2);
const right = new p5(s1);


