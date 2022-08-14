import thumbnailPlaceholder from '@/assets/img/placeholder.png'
import { useEffect } from 'react'

const useLazyLoadImage = (containerRef, isLoading, threshold = 0.1) => {
	useEffect(() => {
		if (isLoading) return

		const lazyImages = containerRef.current.querySelectorAll('[lazy-src]')
		const getFallback = (imgEl) => {
			imgEl.src = thumbnailPlaceholder
		}

		const callback = (entries, observe) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) return

				const lazyImg = entry.target
				const src = lazyImg.getAttribute('lazy-src')
				if (!src) return

				// set img src from lazy-src
				if (lazyImg.tagName.toLowerCase() === 'img') {
					lazyImg.src = src
					lazyImg.addEventListener('error', () => {
						getFallback(lazyImg)
					})
				} else {
					lazyImg.style.backgroundImage = `url("${src}"), url(${thumbnailPlaceholder})`
				}

				lazyImg.style.visibility = 'visible'

				// eliminate not necessary attr
				lazyImg.removeAttribute('lazy-src')
				observer.unobserve(lazyImg)
			}
		}
		const observer = new IntersectionObserver(callback, { threshold })

		for (const img of lazyImages) {
			observer.observe(img)
		}
	}, [isLoading, containerRef.current])

	return null
}

export default useLazyLoadImage
