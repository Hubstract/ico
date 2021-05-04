import React from 'react';
import './commingSoon.scss';

import commingSoon from '../../assets/images/commingSoonText.png'

const CommingSoon = ({ show, handleClose }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    return (
        <div className={showHideClassName}> 
            <section className="modal-main comming-soon-popup">
                <div className="modal fade" >
                    <div className="modal-dialog comming-dialog">
                   
                        <div className="modal-content comming-content">
                        <button type="button" className="close" data-dismiss="modal" onClick={handleClose}>&times;</button>
                         <div className="modal-body comming-body">
                             <img className="comming" src={commingSoon}></img>
                             {/* <div className="modal-body-inner" style={{ display: "block"}}>
                                 <div style={{ textAlign: "center"}}>
                                    <h3>Launching Soon</h3>
                                 </div>
                             </div> */}
                             <div className="popup-btn-img"></div>
                         </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}
export default CommingSoon;