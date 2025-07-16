import { read } from '$app/server';
import { templateInputSchema } from '$lib/templates/inputs';
import Template1 from '$lib/templates/template1/Template1.svelte';
import { Resvg } from '@resvg/resvg-js';
import type { RequestHandler } from '@sveltejs/kit';
import satori from 'satori';
import { html } from 'satori-html';
import { render } from 'svelte/server';
const fontData = read(UbuntuSansVariable).arrayBuffer();

import UbuntuSansVariable from '$lib/server/fonts/Ubuntu-Sans.ttf';

const templates = [
	{
		id: 'template1',
		component: Template1,
		width: 1024,
		height: 576
	}
];

export const GET: RequestHandler = async (event) => {
	const templateId = event.url.searchParams.get('templateId');
	const {
		success,
		data: inputProps,
		error
	} = templateInputSchema.safeParse(Object.fromEntries(event.url.searchParams));
	const template = templates.find((t) => t.id === templateId);

	if (!template) {
		return new Response(
			'Template not found, available templates: ' + templates.map((t) => t.id).join(', '),
			{ status: 404 }
		);
	}

	if (!success) {
		return new Response(`Invalid template input: ${error.message}`, { status: 400 });
	}

	const renderedComponent = render(template.component, {
		props: inputProps
	});

	const reactLike = html(renderedComponent.head + renderedComponent.body);

	const svg = await satori(reactLike as React.ReactNode, {
		width: template.width,
		height: template.height,
		fonts: [
			{
				name: 'Ubuntu variable',
				data: await fontData
			}
		]
	});

	const png = new Resvg(svg, {
		fitTo: { mode: 'original' }
	})
		.render()
		.asPng();

	return new Response(png, {
		headers: {
			'Content-Type': 'image/png'
		}
	});
};
