export async function onRequestPost({ request }: { request: Request }): Promise<Response> {
  let body: any;
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  return new Response(JSON.stringify({
    status: 'SUCCESS',
    message: 'Feedback submitted successfully. Thank you for helping keep the web secure!'
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
