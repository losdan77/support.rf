import React from "react";
import "../styles/AuthorModal.css";
import { Link } from "react-router-dom";

const AuthorModal = ({ visiable, onClose, author }) => {
    if (!visiable) return null;

    return (
        <div className="author-modal-overlay" onClick={onClose}>
            <div 
                className="author-modal-content" 
                onClick={(e) => e.stopPropagation()} 
            >
                <button 
                    className="close-button" 
                    onClick={onClose}
                >
                    &times;
                </button>
                <h2>Информация об авторе</h2>
                {author ? (
                    <div>
                        <Link to={`/profile/${author.id_organization}`} style={{ textDecoration: "none" }}>
                            <div>
                            {author.prof_photo 
                                ?
                                <img src={author.prof_photo} alt="Фото"/>
                                : null
                            }
                            </div>
                        </Link>
                        <Link to={`/profile/${author.id_organization}`} style={{ textDecoration: "none" }}>
                            <p><strong>Имя:</strong> {author.FIO ? author.FIO : author.name_organization}</p>
                        </Link>
                        <p><strong>Электронная почта:</strong> {author.email}</p>
                        {author.phone_1
                            ?
                            <p><strong>Телефон:</strong> {author.phone_1}</p>
                            : null
                        }
                        {author.phone_2
                            ?
                            <p><strong>Дополнительный телефон:</strong> {author.phone_2}</p>
                            : null
                        }
                    </div>
                ) : (
                    <p>Загрузка информации об авторе...</p>
                )}
            </div>
        </div>
    );
};

export default AuthorModal;
