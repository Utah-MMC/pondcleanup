import { NextResponse } from 'next/server';
import { submitToIndexNow } from '@/lib/indexnow';

/**
 * POST /api/indexnow
 * 
 * Submit URLs to IndexNow for instant search engine indexing
 * 
 * Body: { urls: string[] }
 * 
 * Example:
 * POST /api/indexnow
 * { "urls": ["https://pondcleanup.com/shop", "https://pondcleanup.com/shop/product-1"] }
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { urls } = body;

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { error: 'urls array is required and must not be empty' },
        { status: 400 }
      );
    }

    const success = await submitToIndexNow(urls);

    if (success) {
      return NextResponse.json({
        success: true,
        message: `Successfully submitted ${urls.length} URL(s) to IndexNow`,
        urls,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to submit URLs to IndexNow',
          urls,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('IndexNow API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/indexnow
 * 
 * Returns information about IndexNow setup
 */
export async function GET() {
  return NextResponse.json({
    key: '3c431b6cecfc4290ac5ef9671f6e489a',
    keyFile: 'https://pondcleanup.com/3c431b6cecfc4290ac5ef9671f6e489a.txt',
    apiEndpoint: 'https://api.indexnow.org/IndexNow',
    status: 'configured',
    usage: {
      method: 'POST',
      endpoint: '/api/indexnow',
      body: {
        urls: ['https://pondcleanup.com/example-page'],
      },
    },
  });
}

