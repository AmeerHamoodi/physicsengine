# Physics Engine
Basic physics engine with dynamics and kinematics

# Features

  - Application of forces in x and y directions
  - Kinematics calculations from force applications
  - Friction calculations (only requires coefficient of friction)
  - More to come


# Usage

### Initalization:

```JavaScript
const physics = require("./cheezphysics.js");

const player = {
    x: 50,
    y: 50,
    spdX: 0,
    spdY: 0,
    maxSpd: 4
};

physics.applyPhysicsTo(player);
```

### Applying/Clearing Forces

```JavaScript
//x direction
player.applyForceX(5);

//y direction
player.applyForceY(5);

//clear forces x 
player.clearForcesX();

//clear forces y
player.clearForcesX();
```

### The kinematics (speed etc)
These updates happen to both the x and y direction.

```JavaScript
//before calculating velocity you HAVE to calculate acceleration
player.updateAcceleration();

//now update the velcotiy
player.getVelocity();
```


### Calculating Friction
The parameter requires an object which represents the surface, the object must contain a property `coeff` representing the frictional coefficent.
```JavaScript
player.calculateFriction({coeff:0.45});
```

### Putting it together
So to put this all together, you first need to clear all forces on the object, then apply forces depending on the situation. After, call the calculate friction method then calculate acceleration and update velocity. THEN, calculate the new positions using the new spdX and spdY.

