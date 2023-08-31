import assert from "node:assert";
import test from "node:test";

import PointsRelation from "../lib/points_relation.js";

test("calcdistance(): 100m at Japan National Stadium", () => {
  const point1 = [139.7143105610211, 35.67846381519006];
  const point2 = [139.71389951249114, 35.67762716469312];
  const point1ToPoint2 = new PointsRelation(point1, point2);
  const distance = point1ToPoint2.calcDistance();
  assert.strictEqual(Math.round(distance), 100);
});

test("sameDirection(): smaller than 15 degrees", () => {
  const corner = [139.72351450002412, 35.55905963544666];
  const point1 = [139.72364123439718, 35.55899417478201];
  const point2 = [139.72360368347185, 35.558986537700974];
  const cornerToPoint1 = new PointsRelation(corner, point1);
  const cornerToPoint2 = new PointsRelation(corner, point2);
  const sameDirection = cornerToPoint1.sameDirection(cornerToPoint2);
  assert.strictEqual(sameDirection, true);
});

test("sameDirection(): larger than 15 degrees", () => {
  const corner = [139.72351450002412, 35.55905963544666];
  const point1 = [139.72364123439718, 35.55899417478201];
  const point2 = [139.72359764849924, 35.55898544669064];
  const cornerToPoint1 = new PointsRelation(corner, point1);
  const cornerToPoint2 = new PointsRelation(corner, point2);
  const sameDirection = cornerToPoint1.sameDirection(cornerToPoint2);
  assert.strictEqual(sameDirection, false);
});
