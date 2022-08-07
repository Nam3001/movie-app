import { useEffect } from 'react'
import thumbnailPlaceholder from '@/assets/img/placeholder.png'

function useLazyLoadingImg(isLoading, containerElement) {
    useEffect(() => {
        if (isLoading || !containerElement) return

        const lazyImages = containerElement.querySelectorAll('[lazy-src]')

        const getFallback = (imgEl) => {
            imgEl.src = thumbnailPlaceholder
        }

        const callback = (entries, observe) => {
            for (const entry of entries) {
                if (!entry.isIntersecting) return

                const lazyImg = entry.target
                const src = lazyImg.getAttribute('lazy-src')

                // set img src from lazy-src
                if (lazyImg.tagName.toLowerCase() === 'img') {
                    lazyImg.src = src
                    lazyImg.addEventListener('error', () => {
                        getFallback(lazyImg)
                    })
                } else {
                    lazyImg.style.backgroundImage = `url("${src}"), url(${thumbnailPlaceholder})`
                }

                // eliminate not necessary attr
                lazyImg.removeAttribute('lazy-src')
                observer.unobserve(lazyImg)
            }
        }
        const observer = new IntersectionObserver(callback, { threshold: 0.1 })

        for (const img of lazyImages) {
            observer.observe(img)
        }
    }, [isLoading])

    return null
}

export default useLazyLoadingImg
