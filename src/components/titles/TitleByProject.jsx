// src/components/titles/TitleByProject.jsx
import React from 'react';
import BlurText from '../BlurText';
import CircularText from '../CircularText';
import { asset } from '../../lib/utils';
import FuzzyText from '../FuzzyText';

export const TitleByProject = ({ id, firstName, lastName }) => {
  if (id === 'miroslav') {
    return (
      <div className="title-container">
        <BlurText text={firstName} delay={250} stepDuration={0.6} className="title-name" />
        {lastName && (
          <BlurText text={lastName} delay={250} stepDuration={0.6} className="title-lastname" />
        )}
      </div>
    );
  }

  if (id === 'cognesthetic') {
    return (
      <div className="title-container">
        <CircularText
          text={'COGNESTHETIC • COGNESTHETIC • '}
          spinDuration={25}
          onHover={'goBonkers'}
          className="cognesthetic-circular-title"
          logoSrc={asset('/assets/cognesthetic-logo.png')}
        />
      </div>
    );
  }

  if (id === 'mrslv') {
    return (
      <div className="title-container">
        <FuzzyText fontFamily="'Space Grotesk', sans-serif" fontWeight={700} baseIntensity={0.1} hoverIntensity={0.3}>
          {firstName}
        </FuzzyText>
      </div>
    );
  }

  return (
    <div className="title-container">
      <p className="title-name">{firstName}</p>
      {lastName && <p className="title-lastname">{lastName}</p>}
    </div>
  );
};

export default TitleByProject;




