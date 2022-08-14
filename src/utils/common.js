export function createPathname(route, id) {
	const pathname = route.split(':')?.[0] + id
	return pathname
}

export function sortByDate({ arr, order = 'asc', key }) {
	if (!Array.isArray(arr)) return arr

	if (order === 'asc') {
		arr.sort((a, b) => {
			if (key) return Date.parse(b[key]) - Date.parse(a[key])
			else return Date.parse(a) - Date.parse(b)
		})
	} else if (order === 'desc') {
		arr.sort((a, b) => {
			if (key) return Date.parse(a[key]) - Date.parse(b[key])
			else return Date.parse(b) - Date.parse(a)
		})
	}
	return arr
}
