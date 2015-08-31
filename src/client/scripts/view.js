import React from 'react';

class View extends React.Component {
    getViewClass(isVisible) {
      let classString = "View";
      if (isVisible) {
        classString += " u-visible"
      } else {
        classString += " u-hidden"
      }

      return classString;
    }
}

export default View;
