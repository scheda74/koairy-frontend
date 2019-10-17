import React from 'react';
import './Overlay.css';
import SwitchesGroup from '../simulation-form/SwitchGroup';

class Overlay extends React.Component {
    render() {
        return (
            <div className="overlay-container">
               <SwitchesGroup>

               </SwitchesGroup>
            </div>
        );
    }
}

export default Overlay;