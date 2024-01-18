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
// Função para aplicar o filtro de Mediana
function applyMedianFilter() {
    const previewImage = document.getElementById('previewImage');
    const kernelSizeId = 'kernel-size-modal-median';
    const filterType = 'mediana';

    // Verifique se a imagem de pré-visualização está visível
    if (previewImage.style.display === 'none') {
        alert('Por favor, arraste e solte uma imagem para visualização.');
        return;
    }

    const formData = new FormData();
    formData.append('image', document.getElementById('upload').files[0]);
    formData.append('filter', filterType);

    // Recupere o valor do tamanho do kernel a partir do modal de Mediana
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
            closeFilterModal('medianModal');
        })
        .catch(error => {
            alert(error.message);
        });
}

// Função para aplicar o filtro Bilateral
function applyBilateralFilter() {
    const previewImage = document.getElementById('previewImage');
    const diameterId = 'diameter-modal-bilateral';
    const sigmaColorId = 'sigma-color-modal-bilateral';
    const sigmaSpaceId = 'sigma-space-modal-bilateral';
    const filterType = 'bilateral';

    // Verifique se a imagem de pré-visualização está visível
    if (previewImage.style.display === 'none') {
        alert('Por favor, arraste e solte uma imagem para visualização.');
        return;
    }

    const formData = new FormData();
    formData.append('image', document.getElementById('upload').files[0]);
    formData.append('filter', filterType);

    // Recupere os valores do diâmetro, sigma_color e sigma_space a partir do modal de Bilateral
    const diameter = document.getElementById(diameterId).value;
    const sigmaColor = document.getElementById(sigmaColorId).value;
    const sigmaSpace = document.getElementById(sigmaSpaceId).value;

    formData.append('diameter', diameter);
    formData.append('sigma_color', sigmaColor);
    formData.append('sigma_space', sigmaSpace);

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
            closeFilterModal('bilateralModal');
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

// Função para aplicar o Filtro Laplaciano
function applyLaplacianFilter() {
    const previewImage = document.getElementById('previewImage');
    const kernelSizeId = 'kernel-size-modal-laplacian';
    const filterType = 'laplaciano';

    // Verifique se a imagem de pré-visualização está visível
    if (previewImage.style.display === 'none') {
        alert('Por favor, arraste e solte uma imagem para visualização.');
        return;
    }

    const formData = new FormData();
    formData.append('image', document.getElementById('upload').files[0]);
    formData.append('filter', filterType);

    // Recupere o valor do tamanho do kernel a partir do modal de Laplaciano
    const kernelSize = document.getElementById(kernelSizeId).value;
    formData.append('kernel_size', kernelSize);

    fetch('/aplicar-filtro', {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro ao aplicar o filtro. Status: ${response.status} - ${response.statusText}`);
        }
        return response.blob();
    })
    .then(blob => {
        const processedImage = document.getElementById('processedImage');
        processedImage.src = URL.createObjectURL(blob);
        closeFilterModal('laplacianModal');
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao aplicar o Filtro Laplaciano. Verifique o console para mais detalhes.');
    });
}

// Função para aplicar o Filtro de Canny
function applyCannyFilter() {
    const previewImage = document.getElementById('previewImage');
    const lowThresholdId = 'low-threshold-modal-canny';
    const highThresholdId = 'high-threshold-modal-canny';
    const filterType = 'canny';

    // Verifique se a imagem de pré-visualização está visível
    if (previewImage.style.display === 'none') {
        alert('Por favor, arraste e solte uma imagem para visualização.');
        return;
    }

    const formData = new FormData();
    formData.append('image', document.getElementById('upload').files[0]);
    formData.append('filter', filterType);

    // Recupere os valores dos limiares inferior e superior a partir do modal de Canny
    const lowThreshold = document.getElementById(lowThresholdId).value;
    const highThreshold = document.getElementById(highThresholdId).value;

    formData.append('low_threshold', lowThreshold);
    formData.append('high_threshold', highThreshold);

    fetch('/aplicar-filtro', {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro ao aplicar o filtro. Status: ${response.status} - ${response.statusText}`);
        }
        return response.blob();
    })
    .then(blob => {
        const processedImage = document.getElementById('processedImage');
        processedImage.src = URL.createObjectURL(blob);
        closeFilterModal('cannyModal');
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao aplicar o Filtro de Canny. Verifique o console para mais detalhes.');
    });
}

// Função para aplicar o Filtro de Realce de Contraste
function applyContrastEnhancementFilter() {
    const previewImage = document.getElementById('previewImage');
    const filterType = 'realce-de-contraste';

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
            throw new Error(`Erro ao aplicar o filtro. Status: ${response.status} - ${response.statusText}`);
        }
        return response.blob();
    })
    .then(blob => {
        const processedImage = document.getElementById('processedImage');
        processedImage.src = URL.createObjectURL(blob);
        closeFilterModal('contrastEnhancementModal');
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao aplicar o Filtro de Realce de Contraste. Verifique o console para mais detalhes.');
    });
}

// Função para aplicar o Filtro de Nitidez
function applySharpeningFilter() {
    const previewImage = document.getElementById('previewImage');
    const filterType = 'nitidez';

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
            throw new Error(`Erro ao aplicar o filtro. Status: ${response.status} - ${response.statusText}`);
        }
        return response.blob();
    })
    .then(blob => {
        const processedImage = document.getElementById('processedImage');
        processedImage.src = URL.createObjectURL(blob);
        closeFilterModal('sharpeningModal');
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao aplicar o Filtro de Nitidez. Verifique o console para mais detalhes.');
    });
}

// Função para aplicar o Filtro Unsharp Mask
function applyUnsharpMaskFilter() {
    const previewImage = document.getElementById('previewImage');
    const kernelSizeId = 'kernel-size-modal-unsharp-mask';
    const filterType = 'unsharp-mask';

    // Verifique se a imagem de pré-visualização está visível
    if (previewImage.style.display === 'none') {
        alert('Por favor, arraste e solte uma imagem para visualização.');
        return;
    }

    const formData = new FormData();
    formData.append('image', document.getElementById('upload').files[0]);
    formData.append('filter', filterType);

    // Recupere o valor do tamanho do kernel a partir do modal de Unsharp Mask
    const kernelSize = document.getElementById(kernelSizeId).value;
    formData.append('kernel_size', kernelSize);

    fetch('/aplicar-filtro', {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro ao aplicar o filtro. Status: ${response.status} - ${response.statusText}`);
        }
        return response.blob();
    })
    .then(blob => {
        const processedImage = document.getElementById('processedImage');
        processedImage.src = URL.createObjectURL(blob);
        closeFilterModal('unsharpMaskModal');
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao aplicar o Filtro Unsharp Mask. Verifique o console para mais detalhes.');
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

// Função para aplicar o filtro HSV
function applyHSVFilter() {
    const previewImage = document.getElementById('previewImage');
    const hueId = 'hue-modal-hsv';
    const saturationId = 'saturation-modal-hsv';
    const valueId = 'value-modal-hsv';
    const filterType = 'hsv';

    // Verifique se a imagem de pré-visualização está visível
    if (previewImage.style.display === 'none') {
        alert('Por favor, arraste e solte uma imagem para visualização.');
        return;
    }

    const formData = new FormData();
    formData.append('image', document.getElementById('upload').files[0]);
    formData.append('filter', filterType);

    // Recupere os valores de matiz, saturação e valor do modal HSV
    const hue = document.getElementById(hueId).value;
    const saturation = document.getElementById(saturationId).value;
    const value = document.getElementById(valueId).value;

    formData.append('hue', hue);
    formData.append('saturation', saturation);
    formData.append('value', value);

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
            closeFilterModal('hsvModal');
        })
        .catch(error => {
            alert(error.message);
        });
}

// Função para aplicar o filtro LAB
function applyLABFilter() {
    const previewImage = document.getElementById('previewImage');
    const luminosityId = 'luminosity-modal-lab';
    const aId = 'a-modal-lab';
    const bId = 'b-modal-lab';
    const filterType = 'lab';

    // Verifique se a imagem de pré-visualização está visível
    if (previewImage.style.display === 'none') {
        alert('Por favor, arraste e solte uma imagem para visualização.');
        return;
    }

    const formData = new FormData();
    formData.append('image', document.getElementById('upload').files[0]);
    formData.append('filter', filterType);

    // Recupere os valores de luminosidade, A e B do modal LAB
    const luminosity = document.getElementById(luminosityId).value;
    const a = document.getElementById(aId).value;
    const b = document.getElementById(bId).value;

    formData.append('luminosity', luminosity);
    formData.append('a', a);
    formData.append('b', b);

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
            closeFilterModal('labModal');
        })
        .catch(error => {
            alert(error.message);
        });
}

// Função para aplicar o filtro de Limiarização Binária
function applyBinaryThresholdFilter() {
    const previewImage = document.getElementById('previewImage');
    const thresholdValueId = 'threshold-value-modal-binary';
    const filterType = 'limiarizacao-binaria';

    // Verifique se a imagem de pré-visualização está visível
    if (previewImage.style.display === 'none') {
        alert('Por favor, arraste e solte uma imagem para visualização.');
        return;
    }

    const formData = new FormData();
    formData.append('image', document.getElementById('upload').files[0]);
    formData.append('filter', filterType);

    // Recupere o valor do limiar do modal de Limiarização Binária
    const thresholdValue = document.getElementById(thresholdValueId).value;
    formData.append('threshold_value', thresholdValue);

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
            closeFilterModal('binaryThresholdModal');
        })
        .catch(error => {
            alert(error.message);
        });
}

// Função para aplicar o filtro de Limiarização Adaptativa
function applyAdaptiveThresholdFilter() {
    const previewImage = document.getElementById('previewImage');
    const blockSizeId = 'block-size-modal-adaptive';
    const constantId = 'constant-modal-adaptive';
    const filterType = 'limiarizacao-adaptativa';

    // Verifique se a imagem de pré-visualização está visível
    if (previewImage.style.display === 'none') {
        alert('Por favor, arraste e solte uma imagem para visualização.');
        return;
    }

    const formData = new FormData();
    formData.append('image', document.getElementById('upload').files[0]);
    formData.append('filter', filterType);

    // Recupere os valores do tamanho do bloco e constante do modal de Limiarização Adaptativa
    const blockSize = document.getElementById(blockSizeId).value;
    const constant = document.getElementById(constantId).value;

    formData.append('block_size', blockSize);
    formData.append('constant', constant);

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
            closeFilterModal('adaptiveThresholdModal');
        })
        .catch(error => {
            alert(error.message);
        });
}

// Função para aplicar o filtro de Segmentação Watershed
function applyWatershedSegmentationFilter() {
    const previewImage = document.getElementById('previewImage');
    const filterType = 'segmentacao-watershed';

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
            closeFilterModal('watershedSegmentationModal');
        })
        .catch(error => {
            alert(error.message);
        });
}

// Função para aplicar o filtro de Segmentação por Região
function applyRegionSegmentationFilter() {
    const previewImage = document.getElementById('previewImage');
    const minSizeId = 'min-size-modal-region';
    const filterType = 'segmentacao-por-regiao';

    // Verifique se a imagem de pré-visualização está visível
    if (previewImage.style.display === 'none') {
        alert('Por favor, arraste e solte uma imagem para visualização.');
        return;
    }

    const formData = new FormData();
    formData.append('image', document.getElementById('upload').files[0]);
    formData.append('filter', filterType);

    // Recupere o valor do tamanho mínimo do modal de Segmentação por Região
    const minSize = document.getElementById(minSizeId).value;
    formData.append('min_size', minSize);

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
            closeFilterModal('regionSegmentationModal');
        })
        .catch(error => {
            alert(error.message);
        });
}





// Função para alternar as informações do filtro
function toggleInfo(infoId) {
    const info = document.getElementById(infoId);
    info.style.display = info.style.display === 'none' ? 'block' : 'none';
}

