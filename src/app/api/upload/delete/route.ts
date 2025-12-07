import s3Client from '@/lib/s3Client';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest) {
  try {
    const { fileKey } = await request.json();

    if (!fileKey) {
      return NextResponse.json(
        { error: 'fileKey is required' },
        { status: 400 }
      );
    }

    const deleteCommand = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME as string,
      Key: fileKey,
    });

    await s3Client.send(deleteCommand);

    return NextResponse.json(
      {
        message: 'File deleted successfully',
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
