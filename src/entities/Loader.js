const loader = new THREE.BufferGeometryLoader();

// load a resource
loader.load(
	// resource URL
	'models/json/pressure.json',

	// onLoad callback
	function ( geometry ) {
		const material = new THREE.MeshLambertMaterial( { color: 0xF5F5F5 } );
		const object = new THREE.Mesh( geometry, material );
		scene.add( object );
	},

	// onProgress callback
	function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	},

	// onError callback
	function ( err ) {
		console.log( 'An error happened' );
	}
);