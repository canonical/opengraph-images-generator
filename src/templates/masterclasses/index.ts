import type { Component } from 'svelte';
import type { Template } from '../types';
import { masterclassesInputSchema } from './schema';
import Template1 from './Masterclasses.svelte';

export const masterclasses = {
	id: 'masterclasses',
	component: Template1 as Component,
	schema: masterclassesInputSchema,
	width: 1024,
	height: 576,
	example: {
		category: 'Web and design masterclasses',
		date: new Date('2025-01-01'),
		description: 'Customize your website with open graph images for a seamless social experience.',
		title: 'Open Graph Images',
		avatar: 'https://i.pravatar.cc/150?img=58'
	}
} as const satisfies Template<typeof masterclassesInputSchema>;
