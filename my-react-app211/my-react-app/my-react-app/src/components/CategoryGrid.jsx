import React from 'react';

const categories = [
    { id: 'general', icon: 'fas fa-globe', title: 'General Knowledge', description: 'Test your overall knowledge' },
    { id: 'science', icon: 'fas fa-flask', title: 'Science', description: 'Explore scientific facts' },
    { id: 'history', icon: 'fas fa-landmark', title: 'History', description: 'Journey through time' },
    { id: 'sports', icon: 'fas fa-futbol', title: 'Sports', description: 'Athletic knowledge test' },
    { id: 'technology', icon: 'fas fa-laptop-code', title: 'Technology', description: 'Digital world insights' },
    { id: 'entertainment', icon: 'fas fa-film', title: 'Entertainment', description: 'Movies, music & more' },
];

const CategoryGrid = ({ onCategorySelect }) => {
    return (
        <div className="category-grid">
            {categories.map(category => (
                <div 
                    key={category.id} 
                    className="category-card" 
                    onClick={() => onCategorySelect(category.id)}
                    data-category={category.id}
                >
                    <i className={category.icon}></i>
                    <h3>{category.title}</h3>
                    <p>{category.description}</p>
                </div>
            ))}
        </div>
    );
};

export default CategoryGrid;