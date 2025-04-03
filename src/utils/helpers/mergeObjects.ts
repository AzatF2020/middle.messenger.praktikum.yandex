const deepMergeObjects = (...objects: any) => {
  const deepCopyObjects = objects.map((object) => JSON.parse(JSON.stringify(object)));
  return deepCopyObjects.reduce((merged, current) => ({ ...merged, ...current }), {});
};

export default deepMergeObjects;
