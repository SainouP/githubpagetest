// Crear la escena 3D con Three.js
const scene = new THREE.Scene();

// Configuración de la cámara
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 7.5;  // Posición de la cámara

// Configuración del renderizado
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Hacer el fondo transparente
renderer.setSize(window.innerWidth, window.innerHeight); // Ajustar el tamaño al 100% de la ventana
renderer.setClearColor(0x000000, 0);  // Fondo transparente (valor 0 en alpha)
document.getElementById('3d-model-container').appendChild(renderer.domElement);

// Cargador para modelos .glb (asegúrate de tener el archivo .glb en el lugar correcto)
const loader = new THREE.GLTFLoader();

// Cargar el modelo 3D del PC
loader.load('/PrimeraWebsite/RENDER/gaming_computer.glb', function(gltf) {
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

// Posicionamos la cámara
camera.position.z = 7.5;

// Lógica para el zoom usando la rueda del mouse
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

    // Animar el modelo 3D (rotarlo)
    scene.rotation.y += 0.001;

    renderer.render(scene, camera); // Renderizar la escena
}

// Iniciar animación
animate();

// Redirigir al hacer clic en el botón "Volver al Inicio"
document.getElementById('inicio-btn').addEventListener('click', function() {
    window.location.href = '/PrimeraWebsite/PAGE1/index.html';  // Redirige a la página principal
});

// Redirigir al hacer clic en el botón "Volver al Inicio"
document.getElementById('3d-btn').addEventListener('click', function() {
    window.location.href = '/PrimeraWebsite/PAGE2/HTML/exploracionFIJO.html';  // Redirige a la página principal
});
