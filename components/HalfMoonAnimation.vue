<template>
    <div ref="container"></div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';

export default {
    setup() {
        const container = ref(null);
        let scene, camera, renderer, halfMoon1, halfMoon2;
        let animationId = null;
        const animationDuration = 3000; // 動畫持續時間（毫秒）
        let startTime;

        const createHalfMoon = (colorSmooth, colorRough) => {
            const shape = new THREE.Shape();
            shape.moveTo(0, -0.5);
            shape.absarc(0, 0, 0.5, -Math.PI / 2, Math.PI / 2, false);
            shape.lineTo(0, -0.5);

            const extrudeSettings = {
                steps: 1,
                depth: 0.2,
                bevelEnabled: true,
                bevelThickness: 0.05,
                bevelSize: 0.05,
                bevelSegments: 16
            };

            const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

            const smoothMaterial = new THREE.MeshPhongMaterial({
                color: colorSmooth,
                shininess: 200,
                side: THREE.DoubleSide,
            });
            const roughMaterial = new THREE.MeshStandardMaterial({
                color: colorRough,
                roughness: 0.8,
                metalness: 0.2,
                side: THREE.DoubleSide,
            });

            const mesh = new THREE.Mesh(geometry, [smoothMaterial, roughMaterial]);

            return mesh;
        };

        const init = () => {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            container.value.appendChild(renderer.domElement);

            halfMoon1 = createHalfMoon(0xff0000, 0xff0000);
            halfMoon2 = createHalfMoon(0x0000ff, 0x0000ff);

            halfMoon1.position.x = -0.7;
            halfMoon2.position.x = 0.7;

            scene.add(halfMoon1);
            scene.add(halfMoon2);

            const light = new THREE.PointLight(0xffffff, 1, 100);
            light.position.set(0, 5, 5);
            scene.add(light);

            const ambientLight = new THREE.AmbientLight(0x404040);
            scene.add(ambientLight);

            camera.position.z = 5;
        };

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsedTime = timestamp - startTime;
            const progress = Math.min(elapsedTime / animationDuration, 1);

            // 動畫邏輯
            const height = Math.sin(progress * Math.PI) * 1.5; // 拋物線運動
            const rotation = progress * Math.PI * 4; // 旋轉

            halfMoon1.position.y = height;
            halfMoon2.position.y = height;

            // 重新引入翻轉效果
            halfMoon1.rotation.x = rotation;
            halfMoon2.rotation.x = -rotation; // 反向翻轉

            // 保留原有的Y軸旋轉
            halfMoon1.rotation.y = rotation / 2;
            halfMoon2.rotation.y = -rotation / 2;

            renderer.render(scene, camera);

            if (progress < 1) {
                animationId = requestAnimationFrame(animate);
            } else {
                // 重新開始動畫
                startTime = null;
                animationId = requestAnimationFrame(animate);
            }
        };

        onMounted(() => {
            init();
            animationId = requestAnimationFrame(animate);
        });

        onBeforeUnmount(() => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            if (renderer) {
                renderer.dispose();
            }
        });

        return { container };
    }
};
</script>