import { $ } from 'zx';

$`./node_modules/.bin/esbuild \`find . \\( -name '*.ts' -o -name '*.tsx' \\)\` --outdir=out --platform=node`;
