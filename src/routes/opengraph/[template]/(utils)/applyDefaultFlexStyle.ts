type VNode = {
	type: string;
	props: {
		style?: Record<string, unknown>;
		children?: string | VNode | VNode[];
		[prop: string]: unknown;
	};
};

function isVNode(node: unknown): node is VNode {
	return typeof node === 'object' && node !== null && 'type' in node && 'props' in node;
}

function isVNodeArray(node: unknown): node is VNode[] {
	return Array.isArray(node) && node.every(isVNode);
}

const tagsToApplyDefaultFlexStyle = ['div', 'footer', 'main', 'article'];
export function applyDefaultFlexStyle(reactLike: VNode) {
	if (isVNode(reactLike) && tagsToApplyDefaultFlexStyle.includes(reactLike.type)) {
		reactLike.props.style = {
			...reactLike.props.style,
			display: 'flex'
		};
	}
	if (reactLike.props.children) {
		if (isVNode(reactLike.props.children)) {
			applyDefaultFlexStyle(reactLike.props.children);
		} else if (isVNodeArray(reactLike.props.children)) {
			reactLike.props.children.forEach(applyDefaultFlexStyle);
		}
	}
	return reactLike;
}
