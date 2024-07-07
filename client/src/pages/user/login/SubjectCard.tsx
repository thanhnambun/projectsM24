import React from 'react';
import './SubjectCard.css';

function SubjectCard({ title, description, imageUrl }) {
  return (
    <div className='full'>
        <div className="subject-card">
            <img src={imageUrl} alt={title} className="subject-image" />
            <div className="subject-info">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        </div>
    </div>
  );
}

export default SubjectCard;