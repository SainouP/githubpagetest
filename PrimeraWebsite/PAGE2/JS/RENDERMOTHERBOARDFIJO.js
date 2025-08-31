// Crear la escena 3D con Three.js
const scene = new THREE.Scene();

// Configuración de la cámara
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 7.5;  // Posición de la cámara

// Configuración del renderizado
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Hacer el fondo transparente
renderer.setSize(window.innerWidth, window.innerHeight); // Ajustar el tamaño al 100% de la ventana
renderer.setClearColor(0x000000, 0);  // Fondo completamente transparente
document.getElementById('3d-model-container').appendChild(renderer.domElement);

// Cargador para modelos .glb
const loader = new THREE.GLTFLoader();

// Cargar el modelo 3D del PC
loader.load('/PrimeraWebsite/RENDER/motherboard.glb', function(gltf) {
    scene.add(gltf.scene); // Añadir el modelo a la escena
    gltf.scene.scale.set(1, 1, 1); // Escalar el modelo
    gltf.scene.position.set(-1, -1.5, 0); // Posicionar el modelo
});

// Iluminación de la escena
const light = new THREE.AmbientLight(0x404040); // Luz ambiental suave
scene.add(light);

// Luz direccional
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// Variables para controlar la rotación
let isMouseDown = false;
let mouseX = 0;
let mouseY = 0;

// Función para manejar el movimiento del mouse (rotación)
function onMouseMove(event) {
    if (isMouseDown) {
        // Calcular la diferencia en la posición del mouse
        const deltaX = event.clientX - mouseX;
        const deltaY = event.clientY - mouseY;

        // Rotar el modelo basado en la diferencia del movimiento del mouse
        scene.rotation.y += deltaX * 0.005; // Rotar en el eje Y
        scene.rotation.x += deltaY * 0.005; // Rotar en el eje X

        // Limitar la rotación en el eje X (para evitar que el modelo gire completamente)
        scene.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, scene.rotation.x));
    }

    // Actualizar la posición del mouse
    mouseX = event.clientX;
    mouseY = event.clientY;
}

// Función para manejar cuando el mouse es presionado
function onMouseDown(event) {
    isMouseDown = true;
}

// Función para manejar cuando el mouse es soltado
function onMouseUp() {
    isMouseDown = false;
}

// Event listeners para capturar el movimiento y los clics del mouse
window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('mousedown', onMouseDown, false);
window.addEventListener('mouseup', onMouseUp, false);

// Función para manejar el zoom con la rueda del mouse
function onWheel(event) {
    // Ajustar el zoom de la cámara en el eje Z
    if (event.deltaY > 0) {
        // Alejar la cámara (mueve la cámara más lejos)
        camera.position.z += 0.5;
    } else {
        // Acercar la cámara (mueve la cámara más cerca)
        camera.position.z -= 0.5;
    }

    // Limitar el rango del zoom (evitar que se acerque demasiado o se aleje demasiado)
    camera.position.z = Math.max(2, Math.min(15, camera.position.z));

    // Prevenir el comportamiento por defecto del scroll (desplazamiento de la página)
    event.preventDefault();
}

// Agregar el listener para la rueda del mouse
window.addEventListener('wheel', onWheel, false);

// Función de animación
function animate() {
    requestAnimationFrame(animate);

    // Renderizar la escena
    renderer.render(scene, camera);
}

// Iniciar animación
animate();
