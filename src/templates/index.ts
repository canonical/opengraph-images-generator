import { masterclasses } from './masterclasses/index.js';
import { lpMergeProposal } from './launchpad-merge-proposal/index.js';
const templates = [masterclasses, lpMergeProposal] as const;

export default templates;
