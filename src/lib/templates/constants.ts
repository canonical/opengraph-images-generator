import type { Template } from './types';

export const EXAMPLE_TEMPLATES: Template[] = [
	{
		id: 'social-media-post',
		name: 'Social Media Post',
		description: 'Standard template for social media posts',
		width: 1584,
		height: 396,
		backgroundImage: 'https://assets.ubuntu.com/v1/a8bd9e98-newsletter-suru-light.png',
		fields: [
			{
				id: 'header',
				type: 'text',
				position: { x: 100, y: 100, width: 1000, height: 100, zIndex: 2 },
				fontSize: 48,
				fontWeight: 'bold',
				lineHeight: 1.2,
				color: '#333333',
				alignment: 'center',
				description: 'Post headline'
			},
			{
				id: 'featured-image',
				type: 'image',
				position: { x: 200, y: 220, width: 800, height: 350, zIndex: 1 },
				description: 'Featured image'
			}
		],
		tags: ['social', 'marketing']
	},
	{
		id: 'business-card',
		name: 'Business Card',
		description: 'Professional business card layout',
		width: 1050,
		height: 600,
		backgroundColor: '#f5f5f5',
		fields: [
			{
				id: 'logo',
				type: 'image',
				position: { x: 50, y: 50, width: 200, height: 150, zIndex: 1 },
				description: 'Company logo'
			},
			{
				id: 'name',
				type: 'text',
				position: { x: 300, y: 100, width: 700, height: 80, zIndex: 2 },
				fontSize: 36,
				fontWeight: 'bold',
				color: '#1a1a1a',
				alignment: 'left',
				description: 'Full name'
			},
			{
				id: 'title',
				type: 'text',
				position: { x: 300, y: 200, width: 700, height: 50, zIndex: 2 },
				fontSize: 24,
				fontWeight: 'normal',
				color: '#555555',
				alignment: 'left',
				description: 'Job title'
			},
			{
				id: 'contact',
				type: 'text',
				position: { x: 300, y: 300, width: 700, height: 150, zIndex: 2 },
				fontSize: 18,
				fontWeight: 'normal',
				color: '#777777',
				alignment: 'left',
				description: 'Contact information'
			}
		],
		tags: ['business', 'professional']
	},
	{
		id: 'event-banner',
		name: 'Event Banner',
		description: 'Banner for promoting events',
		width: 1500,
		height: 500,
		backgroundColor: '#2c3e50',
		fields: [
			{
				id: 'event-title',
				type: 'text',
				position: { x: 50, y: 50, width: 1400, height: 120, zIndex: 3 },
				fontSize: 64,
				fontWeight: 700,
				color: '#ffffff',
				alignment: 'center',
				description: 'Event title'
			},
			{
				id: 'event-date',
				type: 'text',
				position: { x: 50, y: 190, width: 1400, height: 80, zIndex: 3 },
				fontSize: 32,
				fontWeight: 500,
				color: '#ecf0f1',
				alignment: 'center',
				description: 'Event date and time'
			},
			{
				id: 'background-image',
				type: 'image',
				position: { x: 0, y: 0, width: 1500, height: 500, zIndex: 1 },
				description: 'Background image'
			}
		],
		tags: ['event', 'promotional']
	}
];
