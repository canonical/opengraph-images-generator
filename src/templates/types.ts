import type { Component } from 'svelte';
import type z from 'zod';

export type Template<S extends z.ZodSchema> = {
	id: string;
	component: Component;
	schema: S;
	width: number;
	height: number;
	example: z.infer<S>;
};
