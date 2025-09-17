<script lang="ts">
	import { T, useTask, useThrelte } from "@threlte/core";
	import { interactivity } from "@threlte/extras";
	import { onDestroy, onMount } from "svelte";
	import { Clock, Color, GLSL3, Vector2 } from "three";
	import fragmentShader from "./shaders/fragment.glsl?raw";
	import vertexShader from "./shaders/vertex.glsl?raw";

	interactivity();

	// Uniforms
	const MAX_CLICKS = 10;
	const { size } = useThrelte();
	$inspect(size);
	export const uniforms = {
		uResolution: {
			value: new Vector2(size.current.width, size.current.height),
		},
		uTime: { value: 0 },
		uColor: { value: new Color("#39bc47") },
		uClickPos: {
			value: Array.from({ length: MAX_CLICKS }, () => new Vector2(-1, -1)),
		},
		uClickTimes: { value: new Float32Array(MAX_CLICKS) },
		uShapeType: { value: 0 },
		uPixelSize: { value: 4 },
	};

	// Click ripple effect
	const { canvas } = useThrelte();
	let clickIndex = 0;
	export function onPointerDown(event: PointerEvent) {
		const rect = canvas?.getBoundingClientRect();
		if (!rect) return;
		const fx = (event.clientX - rect.left) * (canvas.width / rect.width);
		const fy =
			canvas.height -
			(event.clientY - rect.top) * (canvas.height / rect.height);

		uniforms.uClickPos.value[clickIndex].set(fx, fy);
		uniforms.uClickTimes.value[clickIndex] = uniforms.uTime.value;
		clickIndex = (clickIndex + 1) % MAX_CLICKS;
	}

	// Camera frustum
	const frustumSize = 50;
	const camRight = frustumSize / 2;
	const camLeft = -camRight;
	const camTop = frustumSize / 2;
	const camBottom = -camTop;

	// Main loop
	const clock = new Clock();
	useTask(() => {
		uniforms.uTime.value = clock.getElapsedTime();
	});

	const gridHelperSize = 100;
	const gridHelperDivisions = 10;

	// Deggugging
	const { camera } = useThrelte();
	onMount(() => {
		// Optional: カメラの位置や向きを変更する場合
		// @ts-expect-error: manualy manupulate camera object
		camera.current.right = camRight;
		// @ts-expect-error: manualy manupulate camera object
		camera.current.left = camLeft;
		// @ts-expect-error: manualy manupulate camera object
		camera.current.top = camTop;
		// @ts-expect-error: manualy manupulate camera object
		camera.current.bottom = camBottom;
		camera.current.lookAt(0, 0, 0);
		// @ts-expect-error: manualy manupulate camera object
		camera.current.zoom = 1;
		// @ts-expect-error: manualy manupulate camera object
		camera.current.updateProjectionMatrix();

		// Canvasにクリックイベントを登録
		canvas.addEventListener("pointerdown", onPointerDown);
	});

	onDestroy(() => {
		// Canvasからクリックイベントを解除
		canvas.removeEventListener("pointerdown", onPointerDown);
	});
</script>

<T.GridHelper
	args={[gridHelperSize, gridHelperDivisions]}
	position={[0, 0, 0]}
/>
<T.OrthographicCamera makeDefault position={[0, 1, 0]} />

<T.Mesh>
	<T.PlaneGeometry args={[2, 2]} />
	<T.ShaderMaterial
		{fragmentShader}
		{vertexShader}
		{uniforms}
		glslVersion={GLSL3}
		transparent={true}
	/>
</T.Mesh>
