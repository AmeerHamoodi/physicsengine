const helpers = require("./helpers.js");

module.exports.constants = {
  gravity: 0.5
};

module.exports.calculateVelocity = helpers.calculateVelocity;

module.exports.calculateFrictionalForces = helpers.calculateFrictionalForces;

module.exports.applyPhysicsTo = entity => {
  entity.forcesX = [];
  entity.forcesY = [];
  entity.accelerationX = 0;
  entity.accelerationY = 0;
  entity.f_n = entity.mass * module.exports.constants.gravity;
  entity.equilibrium = true;

  entity.applyForceX = mag => {
    entity.forcesX.push(new helpers.Force(mag));
    entity.equilibrium = mag != 0 ? false : true;
  };
  entity.clearForcesX = () => {
    entity.forcesX = [];
  };
  entity.applyForceY = mag => {
    entity.forcesY.push(new helpers.Force(mag));
    entity.equilibrium = mag != 0 ? false : true;
  };
  entity.clearForcesY = () => {
    entity.forcesY = [];
  };
  entity.updateAcceleration = () => {
    entity.accelerationX = 0;
    entity.accelerationY = 0;

    entity.accelerationX = helpers.calculateAcceleration(entity, "X");
    entity.accelerationY = helpers.calculateAcceleration(entity, "Y");
  };
  entity.getVelocity = () => {
    if (
      helpers.calculateVelocity(entity.accelerationX) > 0 &&
      entity.spdX < entity.maxSpd
    ) {
      entity.spdX += helpers.calculateVelocity(entity.accelerationX);
    } else if (
      helpers.calculateVelocity(entity.accelerationX) < 0 &&
      entity.spdX > -entity.maxSpd
    ) {
      entity.spdX += helpers.calculateVelocity(entity.accelerationX);
    } else {
      if (entity.spdX > 0) {
        entity.spdX = entity.maxSpd;
      } else if (entity.spdX < 0) {
        entity.spdX = -entity.maxSpd;
      } else {
        entity.spdX = 0;
      }

      if (entity.forcesX.length == 0 && entity.forcesY.length == 0) {
        entity.equilibrium = true;
      } else {
        entity.equilibrium = false;
      }
    }

    if (
      helpers.calculateVelocity(entity.accelerationY) > 0 &&
      entity.spdY < entity.maxSpd
    ) {
      entity.spdY += helpers.calculateVelocity(entity.accelerationY);
    } else if (
      helpers.calculateVelocity(entity.accelerationY) < 0 &&
      entity.spdY > -entity.maxSpd
    ) {
      entity.spdY += helpers.calculateVelocity(entity.accelerationY);
    } else {
      if (entity.spdY > 0) {
        entity.spdY = entity.maxSpd;
      } else if (entity.spdY < 0) {
        entity.spdY = -entity.maxSpd;
      } else {
        entity.spdY = 0;
      }
    }
  };
  entity.calculateFriction = surface => {
    let returnObject = {};
    let netForceY = 0;
    let netForceX = 0;
    let lenx = entity.forcesX.length;
    let leny = entity.forcesY.length;

    for (let i = 0; i < lenx; i++) {
      netForceX += entity.forcesX[i].magnitude;
    }
    for (let i = 0; i < leny; i++) {
      netForceY += entity.forcesY[i].magnitude;
    }
    if (entity.spdX != 0) {
      entity.applyForceX(
        entity.spdX > 0
          ? -helpers.calculateFrictionalForces(entity.f_n, surface)
          : helpers.calculateFrictionalForces(entity.f_n, surface)
      );
    } else {
      entity.applyForceX(0);
    }
    if (entity.spdY != 0) {
      entity.applyForceY(
        entity.spdY > 0
          ? -helpers.calculateFrictionalForces(entity.f_n, surface)
          : helpers.calculateFrictionalForces(entity.f_n, surface)
      );
    } else {
      entity.applyForceY(0);
    }

    if (entity.equilibrium) {
      if (entity.spdX > 0 && entity.spdX - 0.3 <= 0.2) {
        entity.spdX = 0;
      } else if (entity.spdX < 0 && entity.spdX + 0.3 >= -0.2) {
        entity.spdX = 0;
      }
      if (entity.spdY > 0 && entity.spdY - 0.3 <= 0.2) {
        entity.spdY = 0;
      } else if (entity.spdY < 0 && entity.spdY + 0.3 >= -0.2) {
        entity.spdY = 0;
      }
    }
  };
};
