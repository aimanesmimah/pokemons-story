import React from 'react';
import './styles.scss';

function TypeCard({ name, move_damage_class }) {
  return (
      <div className="type--card" >
          <div className="type--card__content" >
              <div>{name}</div>
              <div className="type--card__content--infos" >
                  <p>Move damage class, <br/><span>{move_damage_class || '-'}</span></p>
              </div>
          </div>
      </div>
  );
}

export default TypeCard;
