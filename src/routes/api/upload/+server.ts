import { json } from '@sveltejs/kit';
import { session } from '$lib/server/oauth';
import type { RequestEvent } from '@sveltejs/kit';

export async function POST(event: RequestEvent): Promise<Response> {
	// Check if user is authenticated
	const s = await session.verify(event.cookies.get('session'));
	if (!s) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	// Parse the multipart form data
	const formData = await event.request.formData();
	const file = formData.get('file') as File;

	if (!file) {
		return json({ error: 'No file uploaded' }, { status: 400 });
	}

	// Check if the file is an image
	if (!file.type.startsWith('image/')) {
		return json({ error: 'File must be an image' }, { status: 400 });
	}

	// Generate a unique filename
	const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${file.name.split('.').pop()}`;
	
	// Convert file to base64 data URL
	const arrayBuffer = await file.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);
	const dataUrl = `data:${file.type};base64,${buffer.toString('base64')}`;

	// Return the data URL
	return json({ url: dataUrl });
} 