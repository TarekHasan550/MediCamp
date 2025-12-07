import s3Client from '@/lib/s3Client';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { fileKey } = await request.json();

    if (!fileKey) {
      return NextResponse.json(
        { error: 'fileKey is required' },
        { status: 400 }
      );
    }

    const object = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
    });
    const url = await getSignedUrl(s3Client, object, {
      expiresIn: 3600,
    });

    const extractImageUrl = await fetch(url, {
      method: 'GET',
    });

    return NextResponse.json(
      {
        message: 'File deleted successfully',
        imageUrl: extractImageUrl.url,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to generate presigned URL: ${error}` },
      { status: 500 }
    );
  }
}
