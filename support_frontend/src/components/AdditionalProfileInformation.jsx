import EventList from "./EventList";
import { useState } from "react";
import axios from "axios";
import { useFetching } from "../hooks/useFetching";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CommentList from "./CommentList";
import AdditionalProfileInformationHeader from "./AdditionalProfileInformationHeader";
import Spiner from "./Spiner"


const AdditionalProfileInformation = ({eventButtonVisible, setEventButtonVisible, accessToken, profileId}) => {
    const [updateComment, setUpdateComment] = useState(false)
    const params = useParams();
    const [events, setEvents] = useState([]);
    const [comments, setComments] = useState([]);
    const [mark, setMark] = useState({});
    const [fetchProfileEvents, isEventsLoading, eventsEror] = useFetching( async () => { 
        const response = await getProfileEvents();
        setEvents(response.data);
    })
    const [fetchProfileComments, isCommentsLoading, commentsError] = useFetching( async () => {
        const response = await getProfileComments();
        setComments(response.data);
    })
    const [fetchProfileMark, isMarkLoading, markError] = useFetching( async () => { // load and error
        const response = await getProfileMark();
        setMark(response.data);
    })
    const [commentData, setCommentData] = useState({mark: 5, text: ''});
    const [successAddCommentAlert, setSuccessAddCommentAlert] = useState(false); 
    const [successDelCommentAlert, setSuccessDelCommentAlert] = useState(false); 

    async function getProfileEvents() {
        const response = await axios.get(`http://localhost:8000/events/get_event_by_id_organization?id_organization=${params.id}`);
        return response;
    }

    async function getProfileComments() {
        const response = await axios.get(`http://localhost:8000/comments/get_comments_by_id_organization?id_organization=${params.id}`);
        return response;
    }

    async function getProfileMark() {
        const response = await axios.get(`http://localhost:8000/comments/get_avg_and_count_mark?id_organization=${params.id}`);
        return response;
    }

    async function addComment(e) { 
        e.preventDefault()
        const mark = commentData.mark
        const text = commentData.text
        const id_for = params.id
        const access_token = accessToken
        try {
            const response = await axios.post("http://localhost:8000/comments/add_comment",
                {mark, text, id_for, access_token}
            );
            showSuccessAddCommentAlert();
            setUpdateComment(!updateComment);
            return response; 
        }
        catch(error) {
            (error.status === 401) ? alert('Необходимо авторизоваться') : alert(`Ошибка сервера ${error}`)        
        }
        finally {
            setCommentData({mark: 5, text: ''});
        }
    }

    async function deleteComment(id_comment) {
        try {
            const response = await axios.delete(`http://localhost:8000/comments/delete_comment_by_id?id_comment=${id_comment}&access_token=${accessToken}`)
            showSuccessDelCommentAlert();
            setUpdateComment(!updateComment); //
        }
        catch(error) {
            alert("Ошибка сервера");
        }
    }

    function showSuccessAddCommentAlert() {
        setSuccessAddCommentAlert(true);
        setTimeout(() => {
            setSuccessAddCommentAlert(false);
        }, 4000);
    }

    function showSuccessDelCommentAlert() {
        setSuccessDelCommentAlert(true);
        setTimeout(() => {
            setSuccessDelCommentAlert(false);
        }, 4000);
    }

    useEffect( () => {
        fetchProfileEvents(); 
        fetchProfileComments();
        fetchProfileMark();
    }, [eventButtonVisible, params])

    useEffect( () => {
        fetchProfileComments();
        fetchProfileMark();
    }, [updateComment]) 

    return(
        <div className="card">
            <AdditionalProfileInformationHeader 
                eventButtonVisible={eventButtonVisible}
                setEventButtonVisible={setEventButtonVisible}
            />
            { eventButtonVisible
                ?
            <div className="card-body">
                {eventsEror ? <h1 className="errorEvents">Ошибка {eventsEror}</h1> :
                 isEventsLoading
                    ?
                    <Spiner/>
                    :
                    (events.length === 0)
                        ? <h1 className="titleEvents">Событий нет</h1> :
                <EventList events={events} title="Список событий этого пользователя:" profileId={profileId}/>
                }
            </div>
                :
            <div className="card-body">
                <form>
                    <h1 className="titleAddComment">Добавить комментарий:</h1>
                    <div className="row g-3">
                        <div className="col-md-10">
                            <label htmlFor="inputComment" className="form-label">Комментарий</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="inputComment"
                                value={commentData.text}
                                onChange={e => setCommentData({...commentData, text: e.target.value})}
                            />
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="inputMark" className="form-label">Оценка</label>
                            <select 
                                id="inputMark" 
                                className="form-select"
                                value={commentData.mark}
                                onChange={e => setCommentData({...commentData, mark: e.target.value})}
                            >
                                <option defaultValue={5}>5</option>
                                <option>4</option>
                                <option>3</option>
                                <option>2</option>
                                <option>1</option>
                            </select>
                        </div>
                        <div className="col-12">
                            <button 
                                type="submit" 
                                className="btn btn-primary"
                                onClick={addComment}
                            >
                                Добавить
                            </button>
                        </div>
                        { successAddCommentAlert 
                            ?
                        <div className="alert alert-success" role="alert">
                            Коментарий успешно добавлен
                        </div>
                            : null
                        }
                        { successDelCommentAlert 
                            ?
                        <div className="alert alert-success" role="alert">
                            Коментарий успешно удален
                        </div>
                            : null
                        }
                    </div>
                </form>
                <hr/>
                {commentsError ? <h1 className="errorComments">Ошибка {commentsError}</h1> :
                 isCommentsLoading
                    ?
                    <Spiner/>
                    :
                    (comments.length === 0)
                        ? <h1 className="titleComments">Комментариев нет</h1> :
                <CommentList comments={comments} title="Комментарии:" mark={mark} profileId={profileId} accessToken={accessToken} deleteComment={deleteComment}/> 
                }
            </div>
            }
        </div>
    );
}

export default AdditionalProfileInformation;