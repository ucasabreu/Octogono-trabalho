var canvas;
var gl;

var thetaZ = 0.0; // Ângulo de rotação para o eixo Z
var thetaZLoc;    // Localização da uniform no shader

var translation = [0, 0, 0]; // Posição do objeto
var translationLoc;          // Localização da uniform no shader

var scale = 1.0; // Fator de escala
var scaleLoc;    // Localização da uniform no shader

var rotationSpeed = 1.0; // Velocidade de rotação inicial
var isTranslating = false; // Controle da translação (inicia desativada)

var isDragging = false;
var previousMousePosition = {
    x: 0,
    y: 0
};

// Definição dos vértices do octógono, incluindo o centro
var vertices = [
    vec2( 0.0,  0.0), // Centro
    vec2( 0.5,  0.0),
    vec2( 0.35,  0.35),
    vec2( 0.0,  0.5),
    vec2(-0.35,  0.35),
    vec2(-0.5,  0.0),
    vec2(-0.35, -0.35),
    vec2( 0.0, -0.5),
    vec2( 0.35, -0.35),
    vec2( 0.5,  0.0) // Fechar o octógono
];

// Definição das cores para cada vértice do octógono, começando pelo centro
var colors = [
    vec4( 1.0, 1.0, 1.0, 1.0 ),  // white (centro)
    vec4( 1.0, 0.0, 0.0, 1.0 ),  // red
    vec4( 1.0, 0.5, 0.0, 1.0 ),  // orange
    vec4( 1.0, 1.0, 0.0, 1.0 ),  // yellow
    vec4( 0.0, 1.0, 0.0, 1.0 ),  // green
    vec4( 0.0, 0.0, 1.0, 1.0 ),  // blue
    vec4( 0.29, 0.0, 0.51, 1.0 ), // indigo
    vec4( 0.56, 0.0, 1.0, 1.0 ),  // violet
    vec4( 1.0, 0.0, 1.0, 1.0 ),  // magenta
    vec4( 1.0, 0.0, 0.0, 1.0 )   // red (fechar o octógono)
];

window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.8, 0.8, 0.8, 1.0 ); // Alterado para branco

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    if (!program) {
        console.error("Failed to initialize shaders.");
        return;
    }
    gl.useProgram( program );
    
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
    
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    
    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);
    
    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    thetaZLoc = gl.getUniformLocation(program, "thetaZ");
    translationLoc = gl.getUniformLocation(program, "translation");
    scaleLoc = gl.getUniformLocation(program, "scale");

    document.getElementById("rotate-button").onclick = function() {
        thetaZ += rotationSpeed; // Rotacionar em torno do eixo Z
        render();
    };

    document.getElementById("scale-slider").oninput = function(event) {
        scale = parseFloat(event.target.value); // Atualizar a escala com base no valor do slider
        render(); // Chamar render para aplicar a nova escala
    };

    document.getElementById("toggle-translation").onclick = function() {
        isTranslating = !isTranslating; // Alternar entre ativar e desativar a translação
        document.getElementById("toggle-translation").innerText = isTranslating ? "Translação/Ligada" : "Translação/Desligada";
    };

    canvas.addEventListener('mousedown', function(e) {
        if (isTranslating) {
            isDragging = true;
            previousMousePosition = {
                x: e.clientX,
                y: e.clientY
            };
        }
    });

    canvas.addEventListener('mouseup', function(e) {
        isDragging = false;
    });

    canvas.addEventListener('mousemove', function(e) {
        if (isDragging) {
            var deltaX = e.clientX - previousMousePosition.x;
            var deltaY = e.clientY - previousMousePosition.y;

            translation[0] += deltaX * 0.01;
            translation[1] -= deltaY * 0.01; // Inverter para mover na direção correta

            previousMousePosition = {
                x: e.clientX,
                y: e.clientY
            };

            render(); // Chamar render para aplicar a nova translação
        }
    });

    function render() {
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.uniform1f(thetaZLoc, thetaZ);
        gl.uniform3fv(translationLoc, translation);
        gl.uniform1f(scaleLoc, scale);

        gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices.length);
    }

    render();
};