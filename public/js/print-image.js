let printing = false;

document.addEventListener('click', async event => {
	if (event.defaultPrevented || printing) return;

	const button = event.target.closest('button[data-print-image]');
	if (!button) return;

	const target = document.getElementById(button.dataset.printImage);
	const preview = target instanceof HTMLImageElement ? target : target?.querySelector('img');
	if (!preview) return;

	printing = true;
	button.disabled = true;
	const image = new Image();
	image.className = 'print-image';
	image.alt = preview.alt;
	image.src = preview.currentSrc || preview.src;
	if (button.dataset.printFormat) image.dataset.printFormat = button.dataset.printFormat;

	const cleanup = () => {
		image.remove();
		button.disabled = false;
		printing = false;
	};

	try {
		await image.decode();
		if (!button.isConnected) {
			cleanup();
			return;
		}

		document.body.append(image);
		window.addEventListener('afterprint', cleanup, { once: true });
		window.print();
	} catch {
		window.removeEventListener('afterprint', cleanup);
		cleanup();
		const message = 'Nie udało się przygotować obrazu do wydruku.';
		try {
			const { showToast } = await import(`${document.body.dataset.cdn}/js/meshcore/toast.js`);
			showToast(message, 'error');
		} catch (err) {
			console.error('Nie udało się wyświetlić powiadomienia:', err);
			window.alert(message);
		}
	}
});
