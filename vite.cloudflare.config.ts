import vinext from 'vinext';
import {defineConfig} from 'vite';
import {cloudflare} from '@cloudflare/vite-plugin';

// Independent hosting: no Sites auth mocks, connector proxy or injected bindings.
export default defineConfig({server:{allowedHosts:['terminal.local']},plugins:[vinext(),cloudflare({
  configPath:'wrangler.jsonc',
  viteEnvironment:{name:'rsc',childEnvironments:['ssr']},
  inspectorPort:false,
})]});
