export type Session = {
	id: string;
	name: string;
	token: string;
	device: string;
	server: string;
	administrator: boolean;
};

export type Locals = {
	session: {
		data: Session,
		destroy: () => {},
	},
}