import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import DeletePopupModal from './DeletePopupModal';
import CommentForm from './CommentForm';


const Comment = ({
    comment,
    logginedUser,
    affectedComment,
    setAffectedComment,
    addComment,
    updateComment,
    deleteComment,
    likeComment,
    replies,
    parentId = null }) => {
    const isUserLoggined = Boolean(logginedUser.userId);
    const isCommentBelongsToUser = logginedUser.userId === comment.user._id;
    const isReplying = affectedComment && affectedComment.type === 'replying' && affectedComment._id === comment._id;
    const isEditing = affectedComment && affectedComment.type === 'editing' && affectedComment._id === comment._id;
    const repliedCommentId = parentId ? parentId : comment._id;
    const replyOnUserId = comment.user._id;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState("");

    const openModal = (comment) => {
        setCommentToDelete(comment);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setCommentToDelete("");
        setIsModalOpen(false);
    };

    const handleDelete = () => {
        if (commentToDelete !== "") deleteComment(comment._id);
        closeModal();
    };


    return (
        <React.Fragment>
            {isModalOpen && (
                <DeletePopupModal
                    comment={commentToDelete}
                    onClose={closeModal}
                    onDelete={handleDelete}
                />
            )}
            <div className="flex flex-row gap-x-3 bg-[#ECECEC] p-3 rounded-xl">
                {!isEditing && (
                    <div className="rounded-full w-14 h-14 aspect-square mr-5"
                        style={{ backgroundImage: `url(${comment.user.avatar})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}
                    />
                )}
                <div className="flex-1 flex flex-col text-start">

                    {!isEditing && (
                        <>
                            <h5 className="font-bold text-dark-hard text-xs">
                                {comment.user.name}
                            </h5>
                            <span className="text-xs text-dark-light">
                                {new Date(comment.createdAt).toLocaleDateString("vi-VN", {
                                    weekday: "short",
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                    second: "numeric",
                                })}
                            </span>
                            <p className="font-roboto mt-[10px] text-dark-light">
                                {comment.desc}
                            </p>
                        </>
                    )}

                    {isEditing && (
                        <CommentForm btnLabel={<FiSend />}
                            logginedUser={logginedUser}
                            formSubmitHandler={(value) => updateComment(value, comment._id)}
                            formCancelHandler={() => setAffectedComment(null)}
                            initialText={comment.desc}>

                        </CommentForm>
                    )}
                    <div className="flex items-center gap-x-3 text-dark-light be-viet-nam-pro-regular text-sm my-3">
                        {isUserLoggined && (
                            <button className="flex items-center space-x-2 hover:font-bold cursor-pointer"
                                type="submit"
                                onClick={() => setAffectedComment({ type: 'replying', _id: comment._id })}>
                                {/* <FiMessageSquare className="w-4 h-auto" /> */}
                                <span>Phản hồi</span>
                            </button>
                        )}
                        {isCommentBelongsToUser && (
                            <>
                                <button className="flex items-center space-x-2 hover:font-bold cursor-pointer"
                                    type="submit"
                                    onClick={() => setAffectedComment({ type: 'editing', _id: comment._id })}>
                                    {/* <FiEdit2 className="w-4 h-auto" /> */}
                                    <span>Chỉnh sửa</span>
                                </button>
                                <button className="flex items-center space-x-2 text-[#F10000] hover:font-bold cursor-pointer"
                                    type="submit"
                                    onClick={(comment) => { openModal(comment) }}>
                                    {/* <FiTrash className="w-4 h-auto" /> */}
                                    <span>Xóa</span>
                                </button>
                            </>
                        )}
                        
                        <div className="bg-white w-auto rounded-full flex flex-row">
                                <button className="text-[#CC3333] ml-1 cursor-pointer" 
                                        onClick={() => likeComment(comment._id)}>
                                    {comment.like_status ? (
                                        <span><FaHeart></FaHeart></span>
                                    ): (<span><FaRegHeart></FaRegHeart></span>)}
                                </button>
                                <p className="text-black my-1 mx-1 text-xs md:text-xs lg:text-sm">{comment.like}</p>
                        </div>
                    </div>
                    {isReplying && (
                        <CommentForm btnLabel={<FiSend />}
                            logginedUser={logginedUser}
                            formSubmitHandler={(value) => addComment(value, repliedCommentId, replyOnUserId)}
                            formCancelHandler={() => setAffectedComment(null)} />
                    )}
                    {replies.length > 0 && (
                        <div>
                            {replies.map((reply) => (
                                <Comment key={reply._id}
                                    addComment={addComment}
                                    comment={reply}
                                    deleteComment={deleteComment}
                                    updateComment={updateComment}
                                    affectedComment={affectedComment}
                                    setAffectedComment={setAffectedComment}
                                    likeComment={likeComment}
                                    logginedUser={logginedUser}
                                    parentId={comment._id}
                                    replies={[]} />
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </React.Fragment>
    )
}

export default Comment;