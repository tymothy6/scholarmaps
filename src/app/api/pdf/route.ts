import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const pdfUrl = req.nextUrl.searchParams.get('url') || '';
  
    if (!pdfUrl) {
      return new Response('Open access PDF URL is required', { status: 400 });
    }
  
    try {
      const response = await fetch(pdfUrl, {
        headers: {
            credentials: 'include',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch the requested file at ${pdfUrl}, status: ${response.status}`);
      }
  
      // Stream the PDF file back to the client
      return new NextResponse(response.body, {
        headers: {
          'Content-Type': 'application/pdf',
          // 'Content-Disposition': 'inline; filename="filename.pdf"',
        },
      });
    } catch (error) {
      console.error(error);
      return new NextResponse('Error fetching the requested file', { status: 500 });
    }
  }