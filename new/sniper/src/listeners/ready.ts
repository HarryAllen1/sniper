import type { ListenerOptions, PieceContext } from '@sapphire/framework';
import { Listener, Store } from '@sapphire/framework';
import { gray, green, magenta, magentaBright, yellow } from 'colorette';

export class UserEvent extends Listener {
	private readonly style = yellow;

	public constructor(context: PieceContext, options?: ListenerOptions) {
		super(context, {
			...options,
			once: true
		});
	}

	public run() {
		this.printBanner();
		this.printStoreDebugInformation();
		this.container.client.user?.setActivity({
			name: 'test',
			type: 'WATCHING'
		});
		this.container.logger.info(this.container.client.user?.username);
	}

	private printBanner() {
		const success = green('+');

		const llc = magentaBright;
		const blc = magenta;

		const line01 = llc('');
		const line02 = llc('');
		const line03 = llc('');

		// Offset Pad
		const pad = ' '.repeat(7);

		console.log(
			String.raw`
${line01} ${pad}${blc('1.0.0')}
${line02} ${pad}[${success}] Gateway
${line03}${` ${pad}${blc('<')}${llc('/')}${blc('>')} ${llc('DEVELOPMENT MODE')}`}
		`.trim()
		);
	}

	private printStoreDebugInformation() {
		const { client, logger } = this.container;
		const stores = [...client.stores.values()];
		const last = stores.pop()!;

		for (const store of stores) logger.info(this.styleStore(store, false));
		logger.info(this.styleStore(last, true));
	}

	private styleStore(store: Store<any>, last: boolean) {
		return gray(`${last ? '└─' : '├─'} Loaded ${this.style(store.size.toString().padEnd(3, ' '))} ${store.name}.`);
	}
}
