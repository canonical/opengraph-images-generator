import type { Component } from 'svelte';
import type z from 'zod';

export type Template = {
	id: string;
	component: Component;
	schema: z.ZodSchema;
	width: number;
	height: number;
};
