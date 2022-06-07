/// --- Set up a system ---
let t = 0;
class CircleHoverSystem implements ISystem {
  // this group will contain every entity that has a Transform component
  group = engine.getComponentGroup(Transform)

  update(dt: number) {
    t +=  Math.PI * dt * 0.5
    // iterate over the entities of the group
    for (let entity of this.group.entities) {
      // get the Transform component of the entity
      const transform = entity.getComponent(Transform);

      // mutate the rotation
      transform.position.y = Math.cos(t + Math.sqrt(Math.pow(transform.position.x - 8, 2) + Math.pow(transform.position.z - 8, 2)) / Math.PI) * 2 + 2;
      
      //entity.getComponent(Material).albedoColor.set(transform.position.x / 16, transform.position.y / 16, transform.position.z / 4);
    }
  }
}

// Add a new instance of the system to the engine
//engine.addSystem(new CircleHoverSystem())

/// --- Spawner function ---
let hoverSystem = new CircleHoverSystem();

function spawnCube(x: number, y: number, z: number) {
  // create the entity
  const cube = new Entity()

  // add a transform to the entity
  cube.addComponent(new Transform({ position: new Vector3(x, y, z), scale: new Vector3(0.5, 0.5, 0.5
	) }))

  // add a shape to the entity
  cube.addComponent(new BoxShape());

  cube.getComponent(BoxShape).withCollisions = false
  
//   let col = new Material();
//   col.albedoColor = new Color3(x / 16, y / 16, z / 4);
//   cube.addComponent(col);
  
//   cube.addComponent(new OnClick(() => {
//     if (!started) {
//       engine.addSystem(hoverSystem);
//       started = true;
//     }
//     else {
//       engine.removeSystem(hoverSystem);
//       started = false;
//     }
//   }))

  // add the entity to the engine
  engine.addEntity(cube)

  return cube
}

/// --- Spawn a cube ---
// let box = new BoxShape();
for (var x = 0.25; x < 16; x+=0.5) {
  for (var y = 0.25; y < 16; y+=0.5) {
    spawnCube(x, 0, y);
  }
}

let started = true;
engine.addSystem(hoverSystem);