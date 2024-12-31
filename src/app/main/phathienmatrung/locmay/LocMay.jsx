import React from 'react';


const LocMay = () => {
    return (
        <div className="iframe-container">
            <iframe 
                src="https://ee-phathiensommatrung.projects.earthengine.app/view/locmay"
                width={1530}
                height={650}
                frameBorder="0" 
                allowFullScreen
                title="Lọc mây"
            />
        </div>
    );
};

export default LocMay;