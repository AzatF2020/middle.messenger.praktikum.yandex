interface AnyObject {
  [key: string]: any;
}

const deepMergeObjects = (...objects: any) => {
  const deepCopyObjects: AnyObject[] = objects.map((object: AnyObject) => JSON.parse(JSON.stringify(object)));
  return deepCopyObjects.reduce((merged, current) => ({ ...merged, ...current }), {});
};

export default deepMergeObjects;
