import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const region = searchParams.get('region');
  const apiKey = process.env.NEXT_PUBLIC_IUCN_API_KEY;
  const response = await fetch(`https://apiv3.iucnredlist.org/api/v3/species/region/${region}/page/0?token=${apiKey}`);
  const data = await response.json();
  return NextResponse.json(data.result);
}