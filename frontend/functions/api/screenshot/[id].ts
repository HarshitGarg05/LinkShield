export async function onRequestGet({ request }: { request: Request }): Promise<Response> {
  const url = new URL(request.url);
  const target = url.searchParams.get('target') || '';

  if (!target) {
    return new Response('Target parameter required', { status: 400 });
  }

  const cleanTarget = target.startsWith('http') ? target : `https://${target}`;
  const renderUrl = `https://image.thum.io/get/width/600/crop/800/${cleanTarget}`;

  try {
    const imgResp = await fetch(renderUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) LinkShield/1.0'
      }
    });

    if (imgResp.ok) {
      const buffer = await imgResp.arrayBuffer();
      return new Response(buffer, {
        status: 200,
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=3600',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
  } catch {}

  return new Response('Screenshot capture unavailable', { status: 404 });
}
