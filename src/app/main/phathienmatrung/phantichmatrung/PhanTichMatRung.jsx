import React from 'react';

const PhanTichMatRung = () => {
    return (
        <div className="iframe-container">
            <iframe 
                src="https://ee-phathiensommatrung.projects.earthengine.app/view/phantichmatrung"
                width={1530}
                height={650}
                frameBorder="0" 
                allowFullScreen
                title="Phân tích mất rừng"
            />
        </div>
    );
};

export default PhanTichMatRung;