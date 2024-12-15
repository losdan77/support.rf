import CommentItem from "./CommentItem";

const CommentList = ({comments, title, mark}) => {
    return(
        <div className="Comments">
            <h1 className="titleComments">{title}</h1>
            <h1 className="markComments">Средняя оценка: {mark.avg_mark}&#9733; Количество комменатриев: {mark.count_mark}</h1>
            {comments.map(comment =>
                <CommentItem comment={comment} key={comment.id}/>
            )}
        </div>
    )
}

export default CommentList;