# backend/app.py

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import requests
import os
import zipfile
import shutil
import subprocess
import geopandas as gpd
import uuid
import logging
from urllib.parse import urlparse

# Khởi tạo Flask App
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})  # Chỉ cho phép frontend

# Cấu hình logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Đường dẫn thư mục lưu trữ tạm thời và public
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
UTILS_DIR = os.path.join(BASE_DIR, "utils")
PUBLIC_DIR = os.path.join(BASE_DIR, "public", "geotiffs")

# Tạo thư mục nếu chưa tồn tại
os.makedirs(DATA_DIR, exist_ok=True)
os.makedirs(PUBLIC_DIR, exist_ok=True)

# Giới hạn kích thước file ZIP (50 MB)
MAX_ZIP_SIZE = 50 * 1024 * 1024  # 50 MB

def is_valid_url(url):
    """
    Kiểm tra xem URL có hợp lệ và thuộc domain được phép hay không.
    """
    try:
        result = urlparse(url)
        return all([result.scheme, result.netloc])
    except:
        return False

@app.route('/download', methods=['POST'])
def download_file():
    temp_dir = None
    try:
        # Lấy dữ liệu từ request
        data = request.get_json()
        if not data or 'url' not in data:
            logger.warning("URL không hợp lệ trong request.")
            return jsonify({'error': 'URL không hợp lệ.'}), 400
        url = data['url']

        # Xác thực URL
        if not is_valid_url(url):
            logger.warning(f"URL không hợp lệ: {url}")
            return jsonify({'error': 'URL không hợp lệ.'}), 400

        # Tạo ID request duy nhất và thư mục tạm
        request_id = str(uuid.uuid4())
        temp_dir = os.path.join(DATA_DIR, request_id)
        os.makedirs(temp_dir, exist_ok=True)
        logger.info(f"Tạo thư mục tạm: {temp_dir}")

        # Tạo đường dẫn file ZIP tạm thời
        zip_path = os.path.join(temp_dir, "temp.zip")

        # Tải file ZIP từ URL
        with requests.get(url, stream=True, timeout=30) as r:
            r.raise_for_status()
            total_size = int(r.headers.get('Content-Length', 0))
            if total_size > MAX_ZIP_SIZE:
                logger.warning(f"File ZIP quá lớn: {total_size} bytes.")
                return jsonify({'error': 'File ZIP quá lớn. Giới hạn tối đa là 50MB.'}), 400

            with open(zip_path, 'wb') as f:
                shutil.copyfileobj(r.raw, f)
            logger.info(f"Tải xuống file ZIP thành công: {zip_path}")

        # Giải nén file ZIP
        extracted_dir = os.path.join(temp_dir, "extracted")
        os.makedirs(extracted_dir, exist_ok=True)
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            zip_ref.extractall(extracted_dir)
        logger.info(f"Giải nén file ZIP vào: {extracted_dir}")

        # Tìm file .tif trong thư mục đã giải nén
        tif_files = [
            os.path.join(root, file)
            for root, _, files in os.walk(extracted_dir)
            for file in files if file.lower().endswith(".tif")
        ]

        if not tif_files:
            logger.warning("Không tìm thấy file .tif trong file ZIP.")
            return jsonify({'error': 'Không tìm thấy file .tif trong file ZIP.'}), 400

        # Xử lý chỉ một tệp .tif
        tif_file = tif_files[0]
        shp_file = os.path.join(temp_dir, "forest_data.shp")

        # Chuyển đổi GeoTIFF sang SHP
        process_geotiff(tif_file, shp_file)

        # Đọc dữ liệu từ file SHP
        geo_data = read_shp_data(shp_file)
        logger.info("Đã chuyển đổi và đọc dữ liệu từ SHP thành công.")

        # Tạo tên tệp GeoTIFF duy nhất và sao chép vào thư mục public
        geo_tiff_filename = f"{uuid.uuid4()}.tif"
        public_geo_tiff_path = os.path.join(PUBLIC_DIR, geo_tiff_filename)
        shutil.copy2(tif_file, public_geo_tiff_path)
        logger.info(f"GeoTIFF file saved to: {public_geo_tiff_path}")

        # Tạo URL cho GeoTIFF
        geo_tiff_url = f"http://localhost:5000/geotiffs/{geo_tiff_filename}"

        # Trả về URL GeoTIFF cùng với dữ liệu SHP
        return jsonify({
            'message': 'File đã được tải và chuyển đổi thành công.',
            'data': geo_data,
            'geoTiffUrl': geo_tiff_url
        }), 200

    except requests.exceptions.RequestException as req_err:
        logger.error(f"Lỗi khi tải file từ URL: {req_err}")
        return jsonify({'error': 'Không thể tải file từ URL.'}), 400
    except zipfile.BadZipFile:
        logger.error("File tải xuống không phải là file ZIP hợp lệ.")
        return jsonify({'error': 'File tải xuống không phải là file ZIP hợp lệ.'}), 400
    except Exception as e:
        logger.exception("Lỗi hệ thống:")
        return jsonify({'error': f'Lỗi hệ thống: {str(e)}'}), 500
    finally:
        # Xóa thư mục tạm
        if temp_dir and os.path.exists(temp_dir):
            try:
                shutil.rmtree(temp_dir)
                logger.info(f"Đã xóa thư mục tạm: {temp_dir}")
            except Exception as cleanup_error:
                logger.error(f"Lỗi khi dọn dẹp thư mục tạm: {cleanup_error}")

@app.route('/geotiffs/<path:filename>', methods=['GET'])
def serve_geotiff(filename):
    """
    Cung cấp file GeoTIFF qua API.
    """
    try:
        return send_from_directory(os.path.join(BASE_DIR, "public", "geotiffs"), filename)
    except FileNotFoundError:
        logger.error(f"GeoTIFF file không tồn tại: {filename}")
        return jsonify({'error': 'GeoTIFF file không tồn tại.'}), 404

@app.route('/data/<path:filename>', methods=['GET'])
def serve_file(filename):
    """
    Cung cấp file dữ liệu qua API.
    """
    try:
        return send_from_directory(DATA_DIR, filename)
    except FileNotFoundError:
        logger.error(f"File không tồn tại: {filename}")
        return jsonify({'error': 'File không tồn tại.'}), 404

def process_geotiff(tif_file, shp_file):
    """
    Chuyển đổi file GeoTIFF (.tif) sang file SHP bằng script Python.
    """
    script_path = os.path.join(UTILS_DIR, "process_geotiff.py")
    if not os.path.exists(script_path):
        logger.error(f"Script {script_path} không tồn tại.")
        raise FileNotFoundError(f"Script {script_path} không tồn tại.")
    
    cmd = ["python3", script_path, tif_file, shp_file]
    logger.info(f"Chạy lệnh: {' '.join(cmd)}")
    result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

    if result.returncode != 0:
        logger.error(f"GeoTIFF processing failed: {result.stderr}")
        raise Exception(result.stderr)

def read_shp_data(shp_file):
    """
    Đọc dữ liệu từ file SHP và chuyển đổi thành danh sách JSON.
    """
    try:
        gdf = gpd.read_file(shp_file)
        features = []
        for _, row in gdf.iterrows():
            feature = row.to_dict()
            feature['geometry'] = row.geometry.__geo_interface__
            features.append(feature)
        logger.info(f"Số lượng điểm dữ liệu được đọc từ SHP: {len(features)}")
        return features
    except Exception as e:
        logger.error(f"Lỗi khi đọc file SHP: {e}")
        raise

if __name__ == '__main__':
    app.run(debug=True, port=5000)
