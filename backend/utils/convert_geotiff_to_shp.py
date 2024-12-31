import shapefile

def get_forest_data_from_shp(shp_file_path):
    sf = shapefile.Reader(shp_file_path)
    fields = [field[0] for field in sf.fields[1:]]  # Lấy tên các field
    records = []

    for shape_rec in sf.shapeRecords():
        record = shape_rec.record.as_dict()
        record['geometry'] = shape_rec.shape.__geo_interface__
        records.append(record)

    return records
