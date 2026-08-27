import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/loaders/DRACOLoader.js';

const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/libs/draco/');
gltfLoader.setDRACOLoader(dracoLoader);

function frameModel(root, targetHeight = 26) {
  const box = new THREE.Box3().setFromObject(root);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const scale = targetHeight / Math.max(size.y, 0.001);

  root.scale.setScalar(scale);
  root.position.x -= center.x * scale;
  root.position.z -= center.z * scale;
  root.position.y -= box.min.y * scale;
  return root;
}

function optimizeMaterials(root) {
  root.traverse((node) => {
    if (!node.isMesh) return;
    node.castShadow = true;
    node.receiveShadow = true;
    if (node.material) {
      const materials = Array.isArray(node.material) ? node.material : [node.material];
      materials.forEach((material) => {
        if ('envMapIntensity' in material) material.envMapIntensity = 0.8;
        if ('roughness' in material && material.roughness < 0.08) material.roughness = 0.08;
      });
    }
  });
}

export async function loadProjectModel({ url, targetHeight = 26, position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const gltf = await gltfLoader.loadAsync(url);
  const root = gltf.scene;
  optimizeMaterials(root);
  frameModel(root, targetHeight);
  root.position.add(new THREE.Vector3(...position));
  root.rotation.set(...rotation);
  root.userData.animations = gltf.animations || [];
  return root;
}

export async function loadProjectModels(projects, onProgress = () => {}) {
  const models = new Map();
  let finished = 0;

  await Promise.all(projects.map(async (project) => {
    if (!project.model) return;
    try {
      const model = await loadProjectModel({ url: project.model });
      model.visible = false;
      model.userData.projectId = project.id;
      models.set(project.id, model);
    } catch (error) {
      console.warn(`Model unavailable for ${project.name}; procedural fallback can remain active.`, error);
    } finally {
      finished += 1;
      onProgress(finished / projects.length, project);
    }
  }));

  return models;
}

export function crossfadeProjects(models, activeId) {
  models.forEach((model, id) => {
    model.visible = id === activeId;
  });
}
