// a proxy to the assets server as it's not CORS enabled
// and CORS is needed during the capture process
export const GET = async ({ url }) => {
	const assetUrl = url.searchParams.get('assetUrl');
	if (!assetUrl) {
		return new Response('No asset URL provided', { status: 400 });
	}

	const response = await fetch(assetUrl);
	const blob = await response.blob();
	return new Response(blob);
};
