# backend/utils/process_geotiff.py

import rasterio
import geopandas as gpd
from shapely.geometry import Point
import sys

MAX_POINTS = 10000  # Giới hạn số lượng điểm

def process_geotiff(tif_file, output_shp):
    try:
        with rasterio.open(tif_file) as src:
            band = src.read(1)
            transform = src.transform

            rows, cols = band.shape
            data = []
            count = 0
            for row in range(rows):
                for col in range(cols):
                    value = band[row, col]
                    if value != src.nodata:  # Loại bỏ giá trị NoData
                        x, y = rasterio.transform.xy(transform, row, col)
                        data.append({'geometry': Point(x, y), 'value': value})
                        count += 1
                        if count >= MAX_POINTS:
                            break
                if count >= MAX_POINTS:
                    break

            if not data:
                raise ValueError("Không có dữ liệu hợp lệ trong tệp GeoTIFF.")

            gdf = gpd.GeoDataFrame(data, crs=src.crs)
            gdf.to_file(output_shp)
            print(f"Đã chuyển đổi {tif_file} thành {output_shp} thành công với {count} điểm.")

    except Exception as e:
        print(f"Lỗi trong quá trình xử lý GeoTIFF: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    if len(sys.argv) != 3:
        print("Sử dụng: python process_geotiff.py <input.tif> <output.shp>", file=sys.stderr)
        sys.exit(1)

    tif_file = sys.argv[1]
    output_shp = sys.argv[2]
    process_geotiff(tif_file, output_shp)
