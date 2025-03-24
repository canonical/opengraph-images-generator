export type FieldType = 'text' | 'image';

export interface Position {
	x: number;
	y: number;
	width?: number;
	height?: number;
	zIndex?: number;
	rotation?: number;
}

export interface BaseField {
	id: string;
	type: FieldType;
	position: Position;
	description?: string;
}

export interface TextField extends BaseField {
	type: 'text';
	fontSize?: number;
	fontFamily?: string;
	fontWeight?: string | number;
	color?: string;
	alignment?: 'left' | 'center' | 'right';
}

export interface ImageField extends BaseField {
	type: 'image';
	aspectRatio?: number;
}

export type Field = TextField | ImageField;

export interface Template {
	id: string;
	name: string;
	description?: string;
	width: number;
	height: number;
	backgroundColor?: string;
	backgroundImage?: string;
	fields: Field[];
	tags?: string[];
}

export interface TemplateCollection {
	templates: Template[];
}
