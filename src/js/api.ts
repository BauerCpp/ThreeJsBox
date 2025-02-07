import * as THREE from "three";

interface CuboidGeometryData {
  vertices: Float32Array;
  indices: Uint16Array;
  normals: Float32Array;
}

interface CuboidGeometryRequest {
  width?: number;
  height?: number;
  length?: number;
  widthSegments?: number;
  heightSegments?: number;
  lengthSegments?: number;
}


// Simulate an API request
async function fetchCuboidGeometry(request: CuboidGeometryRequest): Promise<CuboidGeometryData> {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Default values
  const width = request.width !== undefined ? request.width : 1;
  const height = request.height !== undefined ? request.height : 1;
  const length = request.length !== undefined ? request.length : 1;
  const widthSegments = request.widthSegments !== undefined ? request.widthSegments : 1;
  const heightSegments = request.heightSegments !== undefined ? request.heightSegments : 1;
  const lengthSegments = request.lengthSegments !== undefined ? request.lengthSegments : 1;

  return createCuboidGeometry(width, height, length, widthSegments, heightSegments, lengthSegments);
}


function createCuboidGeometry(
  width: number = 1,
  height: number = 1,
  length: number = 1,
  widthSegments: number = 1,
  heightSegments: number = 1,
  lengthSegments: number = 1
): CuboidGeometryData {
  const _widthSegments = Math.floor(widthSegments);
  const _heightSegments = Math.floor(heightSegments);
  const _lengthSegments = Math.floor(lengthSegments);

  let numberOfVertices = 0;
  let groupStart = 0;

  const indices: number[] = [];
  const vertices: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];

  // build each side of the box geometry

  buildPlane("z", "y", "x", -1, -1, length, height, width, _lengthSegments, _heightSegments, 0); // px
  buildPlane("z", "y", "x", 1, -1, length, height, -width, _lengthSegments, _heightSegments, 1); // nx
  buildPlane("x", "z", "y", 1, 1, width, length, height, _widthSegments, _lengthSegments, 2); // py
  buildPlane("x", "z", "y", 1, -1, width, length, -height, _widthSegments, _lengthSegments, 3); // ny
  buildPlane("x", "y", "z", 1, -1, width, height, length, _widthSegments, _heightSegments, 4); // pz
  buildPlane("x", "y", "z", -1, -1, width, height, -length, _widthSegments, _heightSegments, 5); // nz

  function buildPlane(
    u: "x" | "y" | "z",
    v: "x" | "y" | "z",
    w: "x" | "y" | "z",
    udir: number,
    vdir: number,
    width: number,
    height: number,
    length: number,
    gridX: number,
    gridY: number,
    materialIndex: number
  ) {
    const segmentWidth = width / gridX;
    const segmentHeight = height / gridY;

    const widthHalf = width / 2;
    const heightHalf = height / 2;
    const lengthHalf = length / 2;

    const gridX1 = gridX + 1;
    const gridY1 = gridY + 1;

    let vertexCounter = 0;
    let groupCount = 0;

    const vector = new THREE.Vector3();

    // generate vertices, normals and uvs

    for (let iy = 0; iy < gridY1; iy++) {
      const y = iy * segmentHeight - heightHalf;

      for (let ix = 0; ix < gridX1; ix++) {
        const x = ix * segmentWidth - widthHalf;

        // set values to correct vector component

        vector[u] = x * udir;
        vector[v] = y * vdir;
        vector[w] = lengthHalf;

        // now apply vector to vertex buffer

        vertices.push(vector.x, vector.y, vector.z);

        // set values to correct vector component

        vector[u] = 0;
        vector[v] = 0;
        vector[w] = length > 0 ? 1 : -1;

        // now apply vector to normal buffer

        normals.push(vector.x, vector.y, vector.z);

        // uvs

        uvs.push(ix / gridX);
        uvs.push(1 - iy / gridY);

        // counters

        vertexCounter += 1;
      }
    }

    // indices

    // 1. you need three indices to draw a single face
    // 2. a single segment consists of two faces
    // 3. so we need to generate six (2*3) indices per segment

    for (let iy = 0; iy < gridY; iy++) {
      for (let ix = 0; ix < gridX; ix++) {
        const a = numberOfVertices + ix + gridX1 * iy;
        const b = numberOfVertices + ix + gridX1 * (iy + 1);
        const c = numberOfVertices + (ix + 1) + gridX1 * (iy + 1);
        const d = numberOfVertices + (ix + 1) + gridX1 * iy;

        // faces

        indices.push(a, b, d);
        indices.push(b, c, d);

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

  return {
    vertices: new Float32Array(vertices),
    indices: new Uint16Array(indices),
    normals: new Float32Array(normals),
  };
}

export default fetchCuboidGeometry;