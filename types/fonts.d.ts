type ExpoAssetReferenceNumber = number;

declare module "*.ttf" {
  const content: ExpoAssetReferenceNumber;
  export default content;
}
