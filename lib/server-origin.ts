import {env} from 'cloudflare:workers';
import {validatedOrigin} from './publication';
export function serverOrigin(){return validatedOrigin(env.PUBLIC_SITE_ORIGIN)}
