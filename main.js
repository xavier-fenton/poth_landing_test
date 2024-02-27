import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import obj_url from './public/assests/partyonthehill.com.glb'

const title_url = new URL(
  'public/assests/partyonthehill.com.glb',
  import.meta.url
)

// let title_url =toString(obj_url)
// const title_url = obj_url
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

const renderer = new THREE.WebGLRenderer({ alpha: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

renderer.domElement.style.height = '100dvh'

camera.position.z = 5
camera.position.y = 0.3

const assestLoader = new GLTFLoader()

let mixer

let model

assestLoader.load(
  title_url.href,
  function (gtlf) {
    model = gtlf.scene

    mixer = new THREE.AnimationMixer(model)
    const clips = gtlf.animations
    // console.log(clips)

    const clip = THREE.AnimationClip.findByName(clips, 'title_pulse')

    const action = mixer.clipAction(clip)
    action.play()

    scene.add(model)
  },
  undefined,
  function (error) {
    console.error(error)
  }
)

let clock = new THREE.Clock()

function changeCanvasSize() {
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
  })
}

function animate() {
  requestAnimationFrame(animate)
  changeCanvasSize()
  if (model) {
    model.rotation.y -= 0.005
  }
  renderer.render(scene, camera)
  if (mixer != null || undefined) {
    setInterval(() => {
      mixer.update(clock.getDelta())
    }, 7000)
  }
}
animate()
