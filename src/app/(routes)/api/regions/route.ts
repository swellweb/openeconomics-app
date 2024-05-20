import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_IUCN_API_KEY;
  const response = await fetch(`https://apiv3.iucnredlist.org/api/v3/region/list?token=${apiKey}`);
  const data = await response.json();
  return NextResponse.json(data.results);
}