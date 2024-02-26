import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const title_url = new URL('assests/partyonthehill.com.glb', import.meta.url)
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// const cube = new THREE.Mesh(geometry, material)
// scene.add(cube)

camera.position.z = 5
const assestLoader = new GLTFLoader()

assestLoader.load(
  title_url.href,
  function (gtlf) {
    const model = gtlf.scene
    // model.material = material
    scene.add(model)
  },
  undefined,
  function (error) {
    console.error(error)
  }
)

function animate() {
  requestAnimationFrame(animate)

  renderer.render(scene, camera)
}
animate()
