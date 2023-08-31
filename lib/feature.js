export default class Feature {
  #feature;

  constructor(feature) {
    this.#feature = feature;
  }

  getFeature() {
    return this.#feature;
  }

  getGeoType() {
    return this.#feature.geometry.type;
  }

  getCoordinates() {
    return this.#feature.geometry.coordinates;
  }

  getName() {
    return this.#feature.properties.name;
  }

  cloneAndReplace(newCoordinates, nameSuffix = null) {
    const cloneFeature = structuredClone(this.#feature);
    cloneFeature.geometry.coordinates = newCoordinates;
    if (nameSuffix) {
      const newName = `${this.getName()} ${nameSuffix}`;
      cloneFeature.properties.name = newName;
    }
    return cloneFeature;
  }
}
