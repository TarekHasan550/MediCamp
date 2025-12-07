export default function ImageExtract(key: string) {
  return `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES}.fly.storage.tigris.dev/${key}`;
}
