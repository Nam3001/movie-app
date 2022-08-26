import { useCallback } from 'react'

const useYupVaidationResolver = (validationSchema) => {
	return useCallback(async (data) => {
		try {
			const values = await validationSchema.validate(data, {
				abortEarly: false
			})
			return {
				values,
				errors: {}
			}
		} catch(error) {
			return {
				values: {},
				errors: error.inner.reduce((acc, cur) => ({
					...acc,
					[cur.path]: {
						type: cur.type ?? "validation",
						message: cur.message
					}
				}), {})
			}
		}
	})
}

export default useYupVaidationResolver