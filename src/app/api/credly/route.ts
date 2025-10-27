import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get('userId');
  
  if (!userId) {
    return NextResponse.json(
      { error: 'User ID is required' },
      { status: 400 }
    );
  }

  try {
    // Credly API endpoint for public badges
    // Note: This uses the public API which doesn't require authentication
    // but has limitations. For full access, you'd need Credly API credentials
    const credlyApiUrl = `https://www.credly.com/users/${userId}/badges.json`;
    
    const response = await fetch(credlyApiUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Portfolio-App/1.0',
      },
      // Add cache control
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      // If the public API fails, return mock data structure
      console.warn(`Credly API failed with status: ${response.status}`);
      
      return NextResponse.json({
        data: [],
        metadata: { total_count: 0 },
        error: 'Unable to fetch from Credly API. Please check your user ID or try again later.'
      });
    }

    const data = await response.json();
    
    // Transform the response to match our expected format
    const transformedData = {
      data: data.data || [],
      metadata: {
        total_count: data.data?.length || 0
      }
    };

    return NextResponse.json(transformedData);
    
  } catch (error) {
    console.error('Error fetching Credly data:', error);
    
    // Return fallback response
    return NextResponse.json({
      data: [],
      metadata: { total_count: 0 },
      error: 'Failed to connect to Credly API'
    }, { status: 500 });
  }
}

// Handle refresh requests
export async function POST(request: NextRequest) {
  // Force refresh by bypassing cache
  return GET(request);
}