export function createPathname(route, id) {
	const pathname = route.split(':')?.[0] + id
	return pathname
}