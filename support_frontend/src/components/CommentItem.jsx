const CommentItem = (props) => {
    
    return (
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-4">
                <img src={`/images/${props.comment.photo_url}`} className="img-fluid rounded-start" alt="Фото" style={{maxHeight: "15vw"}}/>
                </div>
                <div className="col-md-8">
                <div className="card-body">
                    <h5 className="card-title">{props.comment.FIO ? props.comment.FIO : props.comment.name_organization}</h5>
                    <p className="card-text">{props.comment.text}</p>
                    <p className="card-text"><strong className="text-body-info">Оценка: {props.comment.mark} &#9733;</strong></p> {/*Придумать с звездами*/}
                    { (props.profileId === props.comment.id_from) 
                        ? 
                        <button className="close-button" onClick={() => props.deleteComment(props.comment.id)}>
                            	&#128465;
                        </button> 
                        : null
                    }
                </div>
                </div>
            </div>
        </div>
    );
}

export default CommentItem;