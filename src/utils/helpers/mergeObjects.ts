interface GenericObject {
  [key: string]: unknown;
}

const deepMergeObjects = (...objects: GenericObject[]) => {
  const deepCopyObjects: GenericObject[] = objects.map((object: GenericObject) => JSON.parse(JSON.stringify(object)));
  return deepCopyObjects.reduce((merged, current) => ({ ...merged, ...current }), {});
};

export default deepMergeObjects;
