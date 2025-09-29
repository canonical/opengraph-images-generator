import type { Component } from 'svelte';
import type { Template } from '../types';
import { template1InputSchema } from './schema';
import Template1 from './Template1.svelte';

export const template1 = {
	id: 'template1',
	component: Template1 as Component,
	schema: template1InputSchema,
	width: 1024,
	height: 576
} as const satisfies Template;
