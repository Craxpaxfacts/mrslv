// src/components/Section.jsx

import React from 'react';
import ProjectCarousel from './ProjectCarousel';
import StreamerLoop from './StreamerLoop';
import { TitleByProject } from './titles/TitleByProject';

const Section = React.forwardRef(({ id, firstName, lastName, subtitle, description, tracks, links, className }, ref) => {
  return (
    <section ref={ref} className={`section ${className}`}>
      <div className="section-content">

        <TitleByProject id={id} firstName={firstName} lastName={lastName} />

        <h2 className="subtitle great-vibes-regular">{subtitle}</h2>
        <p className="description im-fell-great-primer-regular">{description}</p>
        
        <ProjectCarousel tracks={tracks} projectId={id} />
        
        <div className="links-container">
          <StreamerLoop links={links} />
        </div>

      </div>
    </section>
  );
});

export default Section;