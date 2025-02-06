

import * as THREE from "three";
// function createCuboidGeometry(width, height, depth) {
//   const w = width / 2;
//   const h = height / 2;
//   const d = depth / 2;

//   const halfSize = width/2

//   // 8 вершин параллелепипеда
//   const vertices = new Float32Array([
// halfSize, halfSize, halfSize, -halfSize, halfSize, halfSize, -halfSize, -halfSize, halfSize, halfSize, -halfSize, halfSize, // 0-1-2-3 front 0 1 2 3
//         halfSize, -halfSize, halfSize, halfSize, -halfSize, -halfSize, halfSize, halfSize, -halfSize, halfSize, halfSize, halfSize, // 3-7-4-0 right 4 5 6 7
//         halfSize, halfSize, halfSize, halfSize, halfSize, -halfSize, -halfSize, halfSize, -halfSize, -halfSize, halfSize, halfSize, // 0-4-5-1 up 8 9 10 11
//         -halfSize, halfSize, halfSize, -halfSize, halfSize, -halfSize, -halfSize, -halfSize, -halfSize, -halfSize, -halfSize, halfSize, // 1-5-6-2 left 12 13 14 15
//         halfSize, -halfSize, halfSize, -halfSize, -halfSize, halfSize, -halfSize, -halfSize, -halfSize, halfSize, -halfSize, -halfSize, // 3-2-6-7 down 16 17 18 19
//         halfSize, halfSize, -halfSize, halfSize, -halfSize, -halfSize, -halfSize, -halfSize, -halfSize, -halfSize, halfSize, -halfSize // 4-7-6-5 back 20 21 22 23
//   ]);

//   // 12 треугольников (6 граней * 2 треугольника на грань)
//   const indices = new Uint16Array([
//     0, 1, 2, 0, 2, 3, // front
//     4, 7, 6, 4, 6, 5, // back
//     0, 4, 5, 0, 5, 1, // up
//     3, 2, 6, 3, 6, 7, // down
//     3, 7, 4, 3, 4, 0, // right
//     1, 5, 6, 1, 6, 2, // left
//   ]);


//   const normals = new Float32Array([
//     0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, // front
//     1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, // right
//     0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, // up
//     -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, // left
//     0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, // down
//     0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0 // back
//   ]);


//   return { vertices: vertices, indices: indices, normals: normals};
// }

// function createCuboidGeometry(width, height, depth) {
//   const widthHalf = width / 2;
//   const heightHalf = height / 2;
//   const depthHalf = depth / 2;

//    const vertices = new Float32Array([
// // Front face
//     -widthHalf, -heightHalf,  depthHalf,  // 0
//      widthHalf, -heightHalf,  depthHalf,  // 1
//      widthHalf,  heightHalf,  depthHalf,  // 2
//     -widthHalf,  heightHalf,  depthHalf,  // 3

//     // Back face
//     -widthHalf, -heightHalf, -depthHalf,  // 4
//      widthHalf, -heightHalf, -depthHalf,  // 5
//      widthHalf,  heightHalf, -depthHalf,  // 6
//     -widthHalf,  heightHalf, -depthHalf,  // 7

//     // Top face
//     -widthHalf,  heightHalf,  depthHalf,  // 3
//      widthHalf,  heightHalf,  depthHalf,  // 2
//      widthHalf,  heightHalf, -depthHalf,  // 6
//     -widthHalf,  heightHalf, -depthHalf,  // 7

//     // Bottom face
//     -widthHalf, -heightHalf,  depthHalf,  // 0
//      widthHalf, -heightHalf,  depthHalf,  // 1
//      widthHalf, -heightHalf, -depthHalf,  // 5
//     -widthHalf, -heightHalf, -depthHalf,  // 4

//     // Right face
//      widthHalf, -heightHalf,  depthHalf,  // 1
//      widthHalf, -heightHalf, -depthHalf,  // 5
//      widthHalf,  heightHalf, -depthHalf,  // 6
//      widthHalf,  heightHalf,  depthHalf,  // 2

//     // Left face
//     -widthHalf, -heightHalf,  depthHalf,  // 0
//     -widthHalf, -heightHalf, -depthHalf,  // 4
//     -widthHalf,  heightHalf, -depthHalf,  // 7
//     -widthHalf,  heightHalf,  depthHalf   // 3
//   ]);

//   // Индексы треугольников.  В каждом блоке по 6 индексов: 2 треугольника на одну грань.
//   const indices = new Uint16Array([
//    // Передняя грань
//     0, 1, 2,
//     2, 3, 0,

//     // Задняя грань
//     4, 5, 6,
//     6, 7, 4,

//     // Верхняя грань
//     8, 9, 10,
//     10, 11, 8,

//     // Нижняя грань
//     12, 13, 14,
//     14, 15, 12,

//     // Правая грань
//     16, 17, 18,
//     18, 19, 16,

//     // Левая грань
//     20, 21, 22,
//     22, 23, 20
//   ]);

//   // Нормали для каждой грани. Важно правильно сопоставить с вершинами.
//   const normals = new Float32Array([
//         0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, // front
//         -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, // right
//         0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, // up
//         1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, // left
//         0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, // down
//         0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0 // back
//   ]);
//   return { vertices: vertices, indices: indices, normals: normals};
// }



function createCuboidGeometry( width = 1, height = 1, depth = 1, widthSegments = 1, heightSegments = 1, depthSegments = 1 )
{

		widthSegments = Math.floor( widthSegments );
		heightSegments = Math.floor( heightSegments );
		depthSegments = Math.floor( depthSegments );

		let numberOfVertices = 0;
		let groupStart = 0;

		const indices = [];
		const vertices = [];
		const normals = [];
		const uvs = [];
		// build each side of the box geometry

		buildPlane( 'z', 'y', 'x', - 1, - 1, depth, height, width, depthSegments, heightSegments, 0 ); // px
		buildPlane( 'z', 'y', 'x', 1, - 1, depth, height, - width, depthSegments, heightSegments, 1 ); // nx
		buildPlane( 'x', 'z', 'y', 1, 1, width, depth, height, widthSegments, depthSegments, 2 ); // py
		buildPlane( 'x', 'z', 'y', 1, - 1, width, depth, - height, widthSegments, depthSegments, 3 ); // ny
		buildPlane( 'x', 'y', 'z', 1, - 1, width, height, depth, widthSegments, heightSegments, 4 ); // pz
		buildPlane( 'x', 'y', 'z', - 1, - 1, width, height, - depth, widthSegments, heightSegments, 5 ); // nz

		function buildPlane( u, v, w, udir, vdir, width, height, depth, gridX, gridY, materialIndex ) {
			const segmentWidth = width / gridX;
			const segmentHeight = height / gridY;

			const widthHalf = width / 2;
			const heightHalf = height / 2;
			const depthHalf = depth / 2;

			const gridX1 = gridX + 1;
			const gridY1 = gridY + 1;

			let vertexCounter = 0;
			let groupCount = 0;

			const vector = new THREE.Vector3();

			// generate vertices, normals and uvs

			for ( let iy = 0; iy < gridY1; iy ++ ) {

				const y = iy * segmentHeight - heightHalf;

				for ( let ix = 0; ix < gridX1; ix ++ ) {

					const x = ix * segmentWidth - widthHalf;

					// set values to correct vector component

					vector[ u ] = x * udir;
					vector[ v ] = y * vdir;
					vector[ w ] = depthHalf;

					// now apply vector to vertex buffer

					vertices.push( vector.x, vector.y, vector.z );

					// set values to correct vector component

					vector[ u ] = 0;
					vector[ v ] = 0;
					vector[ w ] = depth > 0 ? 1 : - 1;

					// now apply vector to normal buffer

					normals.push( vector.x, vector.y, vector.z );

					// uvs

					uvs.push( ix / gridX );
					uvs.push( 1 - ( iy / gridY ) );

					// counters

					vertexCounter += 1;

				}

			}

			// indices

			// 1. you need three indices to draw a single face
			// 2. a single segment consists of two faces
			// 3. so we need to generate six (2*3) indices per segment

			for ( let iy = 0; iy < gridY; iy ++ ) {

				for ( let ix = 0; ix < gridX; ix ++ ) {

					const a = numberOfVertices + ix + gridX1 * iy;
					const b = numberOfVertices + ix + gridX1 * ( iy + 1 );
					const c = numberOfVertices + ( ix + 1 ) + gridX1 * ( iy + 1 );
					const d = numberOfVertices + ( ix + 1 ) + gridX1 * iy;

					// faces

					indices.push( a, b, d );
					indices.push( b, c, d );

					// increase counter

					groupCount += 6;

				}

			}

			// add a group to the geometry. this will ensure multi material support



			// calculate new start value for groups

			groupStart += groupCount;

			// update total number of vertices

			numberOfVertices += vertexCounter;
		}

    return { vertices: new Float32Array(vertices), indices: new Uint16Array(indices), normals: new Float32Array(normals)};
  }

  export default createCuboidGeometry;
