import { useEffect, useRef, useState } from 'react'

function useDebounce(term, duration = 100) {
	const [debounced, setDebounced] = useState('')

    const timeoutId = useRef(null)

    useEffect(() => {
        if (term === debounced) return
        
        timeoutId.current = setTimeout(() => {
            setDebounced(term)
        }, duration)

        return () => clearTimeout(timeoutId.current)
    }, [term])
    return debounced
}

export default useDebounce