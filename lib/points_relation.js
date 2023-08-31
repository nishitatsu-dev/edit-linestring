export default class PointsRelation {
  #tailPoint;
  #headPoint;

  constructor(tailPoint, headPoint) {
    this.#tailPoint = tailPoint;
    this.#headPoint = headPoint;
  }

  #toRadian(degree) {
    return (degree * Math.PI) / 180;
  }

  #calcDeltaCoordinates() {
    const deltaLongitude = this.#headPoint[0] - this.#tailPoint[0];
    const deltaLatitude = this.#headPoint[1] - this.#tailPoint[1];
    return [deltaLongitude, deltaLatitude];
  }

  #calcUnitVector() {
    const correction = Math.cos(this.#toRadian(this.#tailPoint[1]));
    const vector = [
      this.#toRadian(this.#calcDeltaCoordinates()[0]) * correction,
      this.#toRadian(this.#calcDeltaCoordinates()[1]),
    ];
    const vectorLength = Math.hypot(vector[0], vector[1]);
    const unitVector = vector.map((component) => component / vectorLength);
    return unitVector;
  }

  calcDistance() {
    const radius = 6371000;
    const deltaCoordinates = this.#calcDeltaCoordinates();
    const deltaLongitude = this.#toRadian(deltaCoordinates[0]);
    const deltaLatitude = this.#toRadian(deltaCoordinates[1]);
    const firstTerm = Math.sin(deltaLatitude / 2) ** 2;
    const secondTerm =
      Math.cos(this.#toRadian(this.#headPoint[1])) *
      Math.cos(this.#toRadian(this.#tailPoint[1])) *
      Math.sin(deltaLongitude / 2) ** 2;
    const sqrt = Math.sqrt(firstTerm + secondTerm);
    const deltaSigma = 2 * Math.asin(sqrt);
    return radius * deltaSigma;
  }

  includesDistance() {
    const setDistance = 10; //NOTE - This seemed to remain original line in decimating.
    return this.calcDistance() < setDistance;
  }

  sameDirection(anotherPoints) {
    const unitVector1 = this.#calcUnitVector();
    const unitVector2 = anotherPoints.#calcUnitVector();
    const innerProduct =
      unitVector1[0] * unitVector2[0] + unitVector1[1] * unitVector2[1];
    const setDirection = this.#toRadian(15); //NOTE - Up to this angle on each side is considered the same direction.
    return innerProduct > Math.cos(setDirection);
  }
}
