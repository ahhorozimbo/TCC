// Função para abrir o modal de configuração do filtro
function openFilterModal(filter) {
    const modalId = `${filter}`;
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
}

// Função para fechar o modal
function closeFilterModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
}

// Função para aplicar o filtro Gaussiano
function applyGaussianFilter() {
    const previewImage = document.getElementById('previewImage');
    const kernelSizeId = 'kernel-size-modal-gauss';
    const filterType = 'gaussiano';

    // Verifique se a imagem de pré-visualização está visível
    if (previewImage.style.display === 'none') {
        alert('Por favor, arraste e solte uma imagem para visualização.');
        return;
    }

    const formData = new FormData();
    formData.append('image', document.getElementById('upload').files[0]);
    formData.append('filter', filterType);

    // Recupere o valor do tamanho do kernel a partir do modal de cada filtro
    const kernelSize = document.getElementById(kernelSizeId).value;
    formData.append('kernel_size', kernelSize);

    fetch('/aplicar-filtro', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao aplicar o filtro.');
            }
            return response.blob();
        })
        .then(blob => {
            const processedImage = document.getElementById('processedImage');
            processedImage.src = URL.createObjectURL(blob);
            closeFilterModal('gaussModal');
        })
        .catch(error => {
            alert(error.message);
        });
}

// Função para aplicar o filtro de Escala de Cinza
function applyGrayFilter() {
    const previewImage = document.getElementById('previewImage');
    const filterType = 'escala-de-cinza';

    // Verifique se a imagem de pré-visualização está visível
    if (previewImage.style.display === 'none') {
        alert('Por favor, arraste e solte uma imagem para visualização.');
        return;
    }

    const formData = new FormData();
    formData.append('image', document.getElementById('upload').files[0]);
    formData.append('filter', filterType);

    fetch('/aplicar-filtro', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao aplicar o filtro.');
            }
            return response.blob();
        })
        .then(blob => {
            const processedImage = document.getElementById('processedImage');
            processedImage.src = URL.createObjectURL(blob);
            closeFilterModal('grayModal');
        })
        .catch(error => {
            alert(error.message);
        });
}

// Função para aplicar o filtro de Média
function applyAverageFilter() {
    const previewImage = document.getElementById('previewImage');
    const windowSizeId = 'window-size-modal-average';
    const filterType = 'media';

    // Verifique se a imagem de pré-visualização está visível
    if (previewImage.style.display === 'none') {
        alert('Por favor, arraste e solte uma imagem para visualização.');
        return;
    }

    const formData = new FormData();
    formData.append('image', document.getElementById('upload').files[0]);
    formData.append('filter', filterType);

    // Recupere o valor do tamanho da janela de média a partir do modal de Média
    const windowSize = document.getElementById(windowSizeId).value;
    formData.append('window_size', windowSize);

    fetch('/aplicar-filtro', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao aplicar o filtro.');
            }
            return response.blob();
        })
        .then(blob => {
            const processedImage = document.getElementById('processedImage');
            processedImage.src = URL.createObjectURL(blob);
            closeFilterModal('averageModal');
        })
        .catch(error => {
            alert(error.message);
        });
}

// Função para aplicar o filtro Sobel
function applySobelFilter() {
    const previewImage = document.getElementById('previewImage');
    const filterType = 'sobel';

    // Verifique se a imagem de pré-visualização está visível
    if (previewImage.style.display === 'none') {
        alert('Por favor, arraste e solte uma imagem para visualização.');
        return;
    }

    const formData = new FormData();
    formData.append('image', document.getElementById('upload').files[0]);
    formData.append('filter', filterType);

    // Recupere a orientação do Filtro Sobel selecionada
    const sobelOrientation = document.querySelector('input[name="sobel-orientation"]:checked');
    if (!sobelOrientation) {
        alert('Por favor, escolha a orientação do Filtro Sobel.');
        return;
    }
    formData.append('sobel_orientation', sobelOrientation.value);

    fetch('/aplicar-filtro', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao aplicar o filtro.');
            }
            return response.blob();
        })
        .then(blob => {
            const processedImage = document.getElementById('processedImage');
            processedImage.src = URL.createObjectURL(blob);
            closeFilterModal('sobelModal');
        })
        .catch(error => {
            alert(error.message);
        });

}

// Após o upload da imagem, defina o atributo src da imagem original
document.getElementById('upload').addEventListener('change', function() {
    const originalImage = document.getElementById('originalImage');
    originalImage.src = URL.createObjectURL(this.files[0]);
});

// Função para alternar as informações do filtro
function toggleInfo(infoId) {
    const info = document.getElementById(infoId);
    info.style.display = info.style.display === 'none' ? 'block' : 'none';
}
