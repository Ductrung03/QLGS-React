import React from 'react';

const XuLyAnh = () => {
    return (
        <div className="iframe-container">
            <iframe 
                src="https://ee-phathiensommatrung.projects.earthengine.app/view/xulyanh"
                width={1530}
                height={650}
                frameBorder="0" 
                allowFullScreen
                title="Xử lý ảnh"
            />
        </div>
    );
};

export default XuLyAnh;