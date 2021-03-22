function lazyload() {
	const observe = new IntersectionObserver(enteris => {
		enteris.forEach(entry => {
			const lazyImage = entry.target
			if (entry.isIntersecting && lazyImage.getAttribute('src') == 'loading.gif') {
				lazyImage.src = lazyImage.dataset.src
				observe.unobserve(lazyImage)
			}
		})
	})
	
	for (let i = 0; i < imgs.length; i++) {
		observe.observer(imgs[i])
	}
}
