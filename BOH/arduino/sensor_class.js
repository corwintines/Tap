module.exports = class Sensor {
  constructor(sensorID, pin) {
    this.id = sensorID;
    this.sensorpin = pin;
    this.sensorid = sensorID;
    this.pulseCount = 0;
    this.amountPoured = 0;
    this.kegSize = 55.00;
    this.amountLeft = 100.00;
  }
};
