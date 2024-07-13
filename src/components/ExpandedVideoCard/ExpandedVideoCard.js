// src/components/ExpandedVideoCard/ExpandedVideoCard.js
import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChevronDown, faChevronUp, faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import ReactMarkdown from 'react-markdown';
import './ExpandedVideoCard.css';

const RecipeCard = ({ title, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showShadow, setShowShadow] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const contentRef = useRef(null);

  const checkScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      setShowShadow(scrollTop + clientHeight < scrollHeight - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [content]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className={`recipe-card ${isExpanded ? 'expanded' : ''}`}>
      <div className="recipe-card-header">
        <h4>{title}</h4>
        <button className={`copy-button ${isCopied ? 'copied' : ''}`} onClick={handleCopy}>
          <FontAwesomeIcon icon={faCopy} className="fa-copy" />
          <FontAwesomeIcon icon={faCheck} className="fa-check" />
        </button>
      </div>
      <div 
        className="recipe-content" 
        ref={contentRef} 
        onScroll={checkScroll}
      >
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
      <div className={`button-container ${showShadow && !isExpanded ? 'show-shadow' : ''}`}>
        <button className="expand-button" onClick={() => setIsExpanded(!isExpanded)}>
          <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} />
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
      </div>
    </div>
  );
};

const ExpandedVideoCard = ({ video }) => {
  const recipe = video.recipe;
  const sections = recipe.split('**Steps:**');
  const [topSection, stepsAndNotes] = sections;
  const [shoppingList, ingredients] = topSection.split('**Ingredients:**');

  // Remove the redundant title and "Shopping list:" text
  const formattedShoppingList = shoppingList
    .replace(/^[\s\S]*?\n\*\s/m, '* ') // Remove everything up to the first list item
    .trim();

  return (
    <div className="expanded-video-card">
      <div className="expanded-header">
        <h2 className="expanded-title">{video.video_name}</h2>
        <div className="expanded-creator">
          <FontAwesomeIcon icon={faUser} style={{ marginRight: '7px' }}/>
          {video.creator}
        </div>
        <div className="expanded-category">
          <strong>Food Category:</strong> {video.food_category.join(', ')}
        </div>
      </div>
      <div className="expanded-description">
        <h3>Description</h3>
        <p>{video.personalized_description}</p>
      </div>
      <div className="expanded-recipe">
        <h3>Recipe</h3>
        <div className="recipe-cards-container">
          <RecipeCard title="Shopping List" content={formattedShoppingList} />
          <RecipeCard title="Ingredients" content={ingredients} />
          <RecipeCard title="Steps & Notes" content={`**Steps:**${stepsAndNotes}`} />
        </div>
      </div>
    </div>
  );
};

export default ExpandedVideoCard;