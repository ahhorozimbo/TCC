#factory e abstract factory
from flask import Flask, render_template, request, jsonify, send_file
import cv2
import numpy as np
import io
import os
import datetime
from werkzeug.utils import secure_filename

app = Flask(__name__, static_folder='static')

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def index():
    return render_template('index.html')

# Função para aplicar o filtro Gaussiano
def apply_gaussian_filter(image, kernel_size=5):
    try:
        # Aplica o filtro de desfoque (Gaussiano)
        return cv2.GaussianBlur(image, (kernel_size, kernel_size), 0)
    except Exception as e:
        raise Exception("Erro ao aplicar o filtro Gaussiano: " + str(e))

# Função para converter a imagem para escala de cinza
def convert_to_gray_scale(image):
    try:
        # Converte a imagem para escala de cinza
        return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    except Exception as e:
        raise Exception("Erro ao converter para escala de cinza: " + str(e))

# Função para aplicar o filtro de Média
def apply_average_filter(image, window_size=5):
    try:
        # Aplica o filtro de Média
        return cv2.blur(image, (window_size, window_size))
    except Exception as e:
        raise Exception("Erro ao aplicar o filtro de Média: " + str(e))

# Função para aplicar o filtro Sobel
def apply_sobel_filter(image, orientation='x'):
    try:
        # Aplica o filtro Sobel na orientação especificada (X ou Y)
        if orientation == 'x':
            return cv2.Sobel(image, cv2.CV_64F, 1, 0, ksize=5)
        elif orientation == 'y':
            return cv2.Sobel(image, cv2.CV_64F, 0, 1, ksize=5)
        else:
            raise Exception("Orientação do filtro Sobel não reconhecida.")
    except Exception as e:
        raise Exception("Erro ao aplicar o filtro Sobel: " + str(e))

@app.route('/aplicar-filtro', methods=['POST'])
def apply_filter():
    try:
        # Recebe a imagem do formulário
        image_file = request.files['image']

        if image_file:
            # Salva a imagem no diretório de uploads com o mesmo nome
            filename = secure_filename(image_file.filename)
            image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            image_file.save(image_path)

            # Lê a imagem em formato de array
            image_data = cv2.imread(image_path)

            # Aplica o filtro escolhido
            filter_type = request.form.get('filter')

            if filter_type == 'gaussiano':
                # Recupera o tamanho do kernel do formulário
                kernel_size = int(request.form.get('kernel_size', 5))  # Valor padrão de 5 se não for fornecido
                filtered_image = apply_gaussian_filter(image_data, kernel_size)
            elif filter_type == 'escala-de-cinza':
                filtered_image = convert_to_gray_scale(image_data)
            elif filter_type == 'media':
                # Recupera o tamanho da janela de média do formulário
                window_size = int(request.form.get('window_size', 5))  # Valor padrão de 5 se não for fornecido
                filtered_image = apply_average_filter(image_data, window_size)
            elif filter_type == 'sobel':
                # Recupera a orientação do Filtro Sobel do formulário
                sobel_orientation = request.form.get('sobel_orientation', 'x')  # Valor padrão de 'x' se não for fornecido
                filtered_image = apply_sobel_filter(image_data, sobel_orientation)
            else:
                return jsonify({'error': 'Filtro não reconhecido.'}), 400

            # Salva a imagem processada como a nova imagem original
            cv2.imwrite(image_path, filtered_image)

            # Converte a imagem resultante de volta para bytes
            _, image_data = cv2.imencode('.jpg', filtered_image)
            image_bytes = image_data.tobytes()

            # Retorna a imagem processada
            return send_file(
                io.BytesIO(image_bytes),
                mimetype='image/jpeg'
            )
        else:
            return jsonify({'error': 'Nenhuma imagem enviada.'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
