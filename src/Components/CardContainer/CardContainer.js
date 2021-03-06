import React from 'react';
import classes from './CardContainer.module.scss';

const CardContainer = props => {
  return (
    <div className={classes.cardContainer}>
      <div className={classes.cardContainer__header}>{props.title}</div>
      <div className={classes.cardContainer__content}>{props.content}</div>
    </div>
  );
};

export default CardContainer;
