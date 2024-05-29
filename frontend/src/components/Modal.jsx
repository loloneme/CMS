import React from "react";
import "../styles/Modal.css"

const Modal = ({ isOpen, onClose, style, children }) => {
    const onWrapperClick = (event) => {
        if (event.target.classList.contains("modal-wrapper")) {
            onClose()
            document.body.style.overflow = "auto"

        };
    };

    if (isOpen) {
        document.body.style.overflow = "hidden"

        return (
            <div className="modal">
                <div className="modal-wrapper" onClick={onWrapperClick}>
                    <div className="modal-content" style={style}>


                        <button className="modal-close-button"
                            onClick={() => {
                                onClose()
                                document.body.style.overflow = "auto"

                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
                                <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                            </svg>
                        </button>
                        {children}
                    </div>

                </div>

            </div>
        )
    }
}

export default Modal