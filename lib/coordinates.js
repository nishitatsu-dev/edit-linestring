import PointsRelation from "./points_relation.js";

export default class Coordinates {
  #coordinates;

  constructor(coordinates) {
    this.#coordinates = coordinates;
  }

  #searchPickupPoint(index) {
    const residualLength = this.#coordinates.length - (index + 1);
    //NOTE - This value of pointStep was set depending on the distance of desimation and the number of points.
    //NOTE - The value seems reasonable at freehand line on the map "Vector" produced by Geospatial Information Authority of Japan.
    const pointStep = 63;
    let start = index;
    let end =
      residualLength > pointStep
        ? index + pointStep + 1
        : this.#coordinates.length;
    let nextIndex = 0;
    for (let i = end - start; i > 1; i = end - start) {
      let half = Math.floor((start + end) / 2);
      const searchPoints = new PointsRelation(
        this.#coordinates[start],
        this.#coordinates[half]
      );
      if (searchPoints.includesDistance()) {
        start = half;
      } else {
        end = half;
      }
      nextIndex = start;
    }
    return nextIndex;
  }

  #searchIndex(coordinates, splitPoint) {
    let n = 0;
    const step = 1;
    let searchCondition = true;
    while (searchCondition) {
      const searchPoint1 = coordinates[n];
      const searchPoint2 = coordinates[n + step];
      const s1ToS2 = new PointsRelation(searchPoint1, searchPoint2);
      const s1ToSp = new PointsRelation(searchPoint1, splitPoint);
      const distanceS1S2 = s1ToS2.calcDistance();
      const distanceS1Sp = s1ToSp.calcDistance();

      if (distanceS1S2 < distanceS1Sp || s1ToS2.differentDirection(s1ToSp)) {
        searchCondition = true;
      } else {
        searchCondition = false;
      }
      n = n + step;
    }
    return n;
  }

  decimatePoints() {
    let pickupPoints = [this.#coordinates[0]];
    for (let index = 0; index < this.#coordinates.length - 1; ) {
      const neighborPoints = new PointsRelation(
        this.#coordinates[index],
        this.#coordinates[index + 1]
      );
      if (neighborPoints.includesDistance()) {
        index = this.#searchPickupPoint(index);
      } else {
        ++index;
      }
      pickupPoints.push(this.#coordinates[index]);
    }
    return pickupPoints;
  }

  splitLine(splitPoint) {
    const startPoint = this.#coordinates[0];
    const endPoint = this.#coordinates[this.#coordinates.length - 1];
    const startToSplit = new PointsRelation(startPoint, splitPoint);
    const endToSplit = new PointsRelation(endPoint, splitPoint);
    const closerToEnd = startToSplit.calcDistance() > endToSplit.calcDistance();
    const coordinates = closerToEnd
      ? this.#coordinates.reverse()
      : this.#coordinates;

    const splitIndex = this.#searchIndex(coordinates, splitPoint);

    const firstCoordinates = closerToEnd
      ? coordinates.slice(splitIndex, coordinates.length).reverse()
      : coordinates.slice(0, splitIndex);
    const secondCoordinates = closerToEnd
      ? coordinates.slice(0, splitIndex).reverse()
      : coordinates.slice(splitIndex, coordinates.length);
    return [firstCoordinates, secondCoordinates];
  }
}
