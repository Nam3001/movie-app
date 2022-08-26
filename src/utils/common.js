export function createPathname(route, id) {
	const pathname = route.split(':')?.[0] + id
	return pathname
}

export function sortByDate({ arr, order = 'ascending', key }) {
	if (!Array.isArray(arr)) return arr

	order = order.toLowerCase()

	if (order === 'ascending') {
		arr.sort((a, b) => {
			if (key) return Date.parse(b[key]) - Date.parse(a[key])
			else return Date.parse(a) - Date.parse(b)
		})
	} else if (order === 'descending') {
		arr.sort((a, b) => {
			if (key) return Date.parse(a[key]) - Date.parse(b[key])
			else return Date.parse(b) - Date.parse(a)
		})
	}
	return arr
}

export const uniqBy = (arr, key) => {
	if (!arr) return []
	if (!key) return arr

	const tmp = {}
	return arr.reduce((agg, cur) => {
		if (!tmp[cur[key]]) {
			tmp[cur[key]] = cur[key]
			agg.push(cur)
		}
		return agg
	}, [])
}

export const toCapitalize = (str) => {
	const strArr = str.split('')
	strArr.forEach((item, i) => {
		if (i === 0) strArr[i] = item.toUpperCase()
		else if (strArr[i - 1] === ' ') strArr[i] = item.toUpperCase()
	})
	return strArr.join('')
}