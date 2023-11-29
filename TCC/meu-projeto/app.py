from flask import Flask, render_template, request, jsonify, send_file
import cv2
import numpy as np
import io
import os
import datetime
from werkzeug.utils import secure_filename

from abc import ABC, abstractmethod

class ImageFilter(ABC):
    @abstractmethod
    def apply(self, image):
        pass

class GaussianFilter(ImageFilter):
    def __init__(self, kernel_size=5):
        self.kernel_size = kernel_size

    def apply(self, image):
        try:
            return cv2.GaussianBlur(image, (self.kernel_size, self.kernel_size), 0)
        except Exception as e:
            raise Exception("Erro ao aplicar o filtro Gaussiano: " + str(e))
        
class AverageFilter(ImageFilter):
    def __init__(self, window_size=5):
        self.window_size = window_size

    def apply(self, image):
        try:
            return cv2.blur(image, (self.window_size, self.window_size))
        except Exception as e:
            raise Exception("Erro ao aplicar o filtro de Média: " + str(e))
        
class MedianFilter(ImageFilter):
    def __init__(self, kernel_size=5):
        self.kernel_size = kernel_size

    def apply(self, image):
        try:
            return cv2.medianBlur(image, self.kernel_size)
        except Exception as e:
            raise Exception("Erro ao aplicar o filtro de Mediana: " + str(e))

class BilateralFilter(ImageFilter):
    def __init__(self, diameter=9, sigma_color=75, sigma_space=75):
        self.diameter = diameter
        self.sigma_color = sigma_color
        self.sigma_space = sigma_space

    def apply(self, image):
        try:
            return cv2.bilateralFilter(image, self.diameter, self.sigma_color, self.sigma_space)
        except Exception as e:
            raise Exception("Erro ao aplicar o filtro Bilateral: " + str(e))


class GrayScaleFilter(ImageFilter):
    def apply(self, image):
        try:
            return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        except Exception as e:
            raise Exception("Erro ao converter para escala de cinza: " + str(e))



class SobelFilter(ImageFilter):
    def __init__(self, orientation='x'):
        self.orientation = orientation

    def apply(self, image):
        try:
            if self.orientation == 'x':
                return cv2.Sobel(image, cv2.CV_64F, 1, 0, ksize=5)
            elif self.orientation == 'y':
                return cv2.Sobel(image, cv2.CV_64F, 0, 1, ksize=5)
            else:
                raise Exception("Orientação do filtro Sobel não reconhecida.")
        except Exception as e:
            raise Exception("Erro ao aplicar o filtro Sobel: " + str(e))


#========================================#

app = Flask(__name__, static_folder='static')

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/aplicar-filtro', methods=['POST'])
def apply_filter():
    try:
        image_file = request.files['image']

        if image_file:
            filename = secure_filename(image_file.filename)
            image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            image_file.save(image_path)
            image_data = cv2.imread(image_path)

            filter_type = request.form.get('filter')

            if filter_type == 'gaussiano':
                kernel_size = int(request.form.get('kernel_size', 5))
                filter_obj = GaussianFilter(kernel_size)
            elif filter_type == 'escala-de-cinza':
                filter_obj = GrayScaleFilter()
            elif filter_type == 'media':
                window_size = int(request.form.get('window_size', 5))
                filter_obj = AverageFilter(window_size)
            elif filter_type == 'sobel':
                sobel_orientation = request.form.get('sobel_orientation', 'x')
                filter_obj = SobelFilter(sobel_orientation)
            elif filter_type == 'mediana':
                kernel_size = int(request.form.get('kernel_size', 5))
                filter_obj = MedianFilter(kernel_size)
            elif filter_type == 'bilateral':
                diameter = int(request.form.get('diameter', 9))
                sigma_color = int(request.form.get('sigma_color', 75))
                sigma_space = int(request.form.get('sigma_space', 75))
                filter_obj = BilateralFilter(diameter, sigma_color, sigma_space)
            else:
                return jsonify({'error': 'Filtro não reconhecido.'}), 400

            filtered_image = filter_obj.apply(image_data)
            cv2.imwrite(image_path, filtered_image)

            _, image_data = cv2.imencode('.jpg', filtered_image)
            image_bytes = image_data.tobytes()

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
