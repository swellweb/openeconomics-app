import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const speciesName = searchParams.get('speciename');
    if (!speciesName) {
      return NextResponse.json({ error: 'Species name is required' }, { status: 400 });
    }

    const apiKey = process.env.NEXT_PUBLIC_IUCN_API_KEY;
    const response = await fetch(`https://apiv3.iucnredlist.org/api/v3/measures/species/name/${speciesName}?token=${apiKey}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch conservation measures:', error);
    return NextResponse.json({ error: 'Failed to fetch conservation measures' }, { status: 500 });
  }
}
