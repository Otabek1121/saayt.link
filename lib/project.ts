import type {Spec} from './spec';export type Project={id:string;name:string;spec:Spec;revision:number;versions:{spec:Spec;at:string}[];published:boolean;publicSlug:string|null;publicEnabled:boolean;publicPath:string|null;archived:boolean;updated:string};

export type ProjectSummary=Omit<Project,'spec'|'versions'>&{niche:Spec['niche'];heroImage:string|null;itemCount:number;galleryCount:number;versionCount:number;phone:string};
