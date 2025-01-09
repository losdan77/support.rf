import CommentItem from "./CommentItem";

const CommentList = ({comments, title, mark, profileId, accessToken, deleteComment}) => {
    return(
        <div className="Comments">
            <p className="text-start fs-2 mt-2">{title}</p>
            <p className="text-start fs-3">Средняя оценка: {mark.avg_mark}&#9733; Количество комменатриев: {mark.count_mark}</p>
            {comments.map(comment =>
                <CommentItem comment={comment} key={comment.id} profileId={profileId} accessToken={accessToken} deleteComment={deleteComment}/>
            )}
        </div>
    )
}

export default CommentList;