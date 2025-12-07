import s3Client from '@/lib/s3Client';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { fileName, fileType } = await request.json();

    if (!fileName || !fileType) {
      return NextResponse.json(
        { error: 'fileName and fileType are required' },
        { status: 400 }
      );
    }

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME as string,
      Key: `uploads/${Date.now()}-${fileName}`,
      ContentType: fileType,
      ACL: 'public-read',
    });

    const presignedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });

    return NextResponse.json(
      {
        presignedUrl,
        key: command.input.Key,
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
