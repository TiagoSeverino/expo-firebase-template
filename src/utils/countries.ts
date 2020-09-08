export const countryCodeToFlag = (code: string) =>
	(code.length <= 2 ? code : code.split('-')[1])
		.toUpperCase()
		.replace(/./g, (c) => String.fromCodePoint(c.charCodeAt(0) + 127397));
