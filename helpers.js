module.exports.calculateVelocity = acceleration => {
  let time = 1;
  let addVelocity = acceleration;
  return addVelocity;
};

/**
 * Creates a new Force.
 * @class
 * @param {number} magnitude
 * @returns {object}
 * @description creates a force object to calculate vel and acc
 */

class Force {
  constructor(amount) {
    this.magnitude = amount;
  }
}

module.exports.Force = Force;

module.exports.calculateAcceleration = (entity, direction) => {
  try {
    let objectString = "forces" + direction;
    let netForce = 0;
    let length = entity[objectString].length;
    for (let i = 0; i < length; i++) {
      netForce += entity[objectString][i].magnitude;
    }
    return netForce / entity.mass;
  } catch (e) {
    throw e;
  }
};

module.exports.calculateFrictionalForces = (f_n, surface) => {
  let coeff = surface.coeff;

  return f_n * coeff;
};
