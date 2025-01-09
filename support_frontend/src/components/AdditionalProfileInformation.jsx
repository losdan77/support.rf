import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import CommentList from "./CommentList";
import AdditionalProfileInformationHeader from "./AdditionalProfileInformationHeader";
import Spiner from "./Spiner"
import EventList from "./EventList";
import { getPageCount, getPagesArray } from "../utils/pages";
import Paginator from "./Paginator";

const AdditionalProfileInformation = ({eventButtonVisible, setEventButtonVisible, accessToken, profileId}) => {
    const API_URL = process.env.REACT_APP_API_URL; 
    const [updateComment, setUpdateComment] = useState(false)
    const params = useParams();
    
    const [events, setEvents] = useState([]);
    const [totalEventPages, setTotalEventPages] = useState(0);
    const [limitEvent, setLimitEvent] = useState(5);
    const [pageEvent, setPageEvent] = useState(1);
    let eventPagesArray = getPagesArray(totalEventPages);

    const [comments, setComments] = useState([]);
    const [totalCommentPages, setTotalCommentPages] = useState(0);
    const [limitComment, setLimitComment] = useState(5);
    const [pageComment, setPageComment] = useState(1);
    let commentPagesArray = getPagesArray(totalCommentPages);

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
        try {
            const response = await axios.get(`${API_URL}/events/get_event_by_id_organization?id_organization=${params.id}&limit=${limitEvent}&page=${pageEvent}`);
            return response;
        }
        catch(error) {
            alert("Ошибка сервера");
        }
    }

    async function getEventPages() {
        try {
            const response = await axios.get(`${API_URL}/events/get_count_event_by_id_organization?id_organization=${params.id}`);
            setTotalEventPages(getPageCount(response.data.count, limitEvent));
        }
        catch(error) {
            alert("Ошибка сервера");
        }
    }

    async function getProfileComments() {
        try {
            const response = await axios.get(`${API_URL}/comments/get_comments_by_id_organization?id_organization=${params.id}&limit=${limitComment}&page=${pageComment}`);
            return response;
        }
        catch(error) {
            alert("Ошибка сервера");
        }
    }

    async function getCommentPages() {
        try {
            const response = await axios.get(`${API_URL}/comments/get_comments_count_by_id_organization?id_organization=${params.id}`);
            setTotalCommentPages(getPageCount(response.data.count, limitComment));
        }
        catch(error) {
            alert("Ошибка сервера");
        }
    }

    async function getProfileMark() {
        try {
            const response = await axios.get(`${API_URL}/comments/get_avg_and_count_mark?id_organization=${params.id}`);
            return response;
        }
        catch(error) {
            alert("Ошибка сервера");
        }
    }

    async function addComment(e) { 
        e.preventDefault()
        const mark = commentData.mark
        const text = commentData.text
        const id_for = params.id
        const access_token = accessToken
        try {
            const response = await axios.post(`${API_URL}/comments/add_comment`,
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
            const response = await axios.delete(`${API_URL}/comments/delete_comment_by_id?id_comment=${id_comment}&access_token=${accessToken}`)
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
        getEventPages();
        fetchProfileEvents(); 
    }, [pageEvent])

    useEffect( () => {
        getCommentPages();
        fetchProfileComments();
    }, [pageComment]) 

    useEffect( () => {
        fetchProfileEvents(); 
        //fetchProfileComments();
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
                <Paginator page={pageEvent} pagesArray={eventPagesArray} totalPages={totalEventPages} setPage={setPageEvent}/>
            </div>
                :
            <div className="card-body">
                <form>
                    <h1 className="text-start fs-2">Добавить комментарий:</h1>
                    <div className="row g-3">
                        <div className="col-md-10">
                            <label htmlFor="inputComment" className="form-label">Комментарий</label>
                            <textarea 
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
                <Paginator page={pageComment} pagesArray={commentPagesArray} totalPages={totalCommentPages} setPage={setPageComment}/>
            </div>
            }
        </div>
    );
}

export default AdditionalProfileInformation;