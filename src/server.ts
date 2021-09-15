import sirv from 'sirv';
import polka, {Middleware} from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

polka()
	.use(
		compression({ threshold: 0 }) as unknown as Middleware,
		sirv('static', { dev }),
		sapper.middleware()
	)
	.listen(PORT);
