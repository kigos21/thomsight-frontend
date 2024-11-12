import PaddedContainer from "../../components/layout/PaddedContainer";
import DiscussionForumItem from "../../components/ui/company/DiscussionForumItem";
import Button from "../../components/ui/Button";
import StyledBox from "../../components/layout/StyledBox";
import styles from "./UserCompanyDiscussionForum.module.scss";
import { Fragment, useEffect, useState } from "react";
import DiscussionAddPostForm from "../../components/ui/company/DiscussionAddPostForm";
import axiosInstance from "../../services/axiosInstance";
import { useParams } from "react-router-dom";
import ValidationError from "../../components/form/ValidationError";
import Spinner from "../../components/ui/Spinner";
import SuccessMessage from "../../components/form/SuccessMessage";
import { containsBadWords } from "../../badWordsFilter";
import FormField from "../../components/form/FormField";
import { IconFlagFilled, IconTrash, IconEdit } from "@tabler/icons-react";
import { IconSend, IconX } from "@tabler/icons-react";
import { useUser } from "../../contexts/UserContext";
import DisplayProfile from "../../components/ui/company/DisplayProfile";

interface Reply {
  id: number;
  username: string;
  comment: string;
  posted_at: string;
  posted_by: number;
}

interface Post {
  id: number;
  internName: string;
  date: string;
  description: string;
  posted_by: number;
  replies: Reply[];
  user_id: number;
}

type CommentSuccessType = {
  replyId?: number;
  action: "edit" | "delete" | "report" | "";
};

export default function UserCompanyDiscussionForum() {
  const [isAddingPost, setIsAddingPost] = useState<boolean>(false); // To control the form visibility
  const [postForm, setPostForm] = useState({
    description: "",
  });

  const [reply, setReply] = useState<string>("");
  const [activeReplyPostId, setActiveReplyPostId] = useState<number>(-1); // -1 if unset
  const [error, setError] = useState<string>("");
  const { slug } = useParams<{ slug: string }>();
  const [loading, setLoading] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [postData, setPostData] = useState<Post[]>([]);
  const { user } = useUser();
  const [activeEditReplyId, setActiveEditReplyId] = useState<number | null>(
    null
  );
  const [activeProfileUserId, setActiveProfileUserId] = useState<number | null>(
    null
  );
  const [editedReplyText, setEditedReplyText] = useState("");
  const [commentSuccess, setCommentSuccess] = useState<CommentSuccessType>({
    replyId: undefined,
    action: "",
  });

  const handleProfileClick = (userId: number) => {
    if (activeProfileUserId === userId) {
      setActiveProfileUserId(null);
    } else {
      setActiveProfileUserId(userId);
    }
  };

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        setLoading("Loading discussions...");
        const response = await axiosInstance.get(
          `/api/company/${slug}/discussions`
        );
        const discussions = response.data;
        setPostData(discussions);
      } catch (error) {
        console.error("Error fetching discussions:", error);
      } finally {
        setLoading("");
      }
    };

    fetchDiscussions();
  }, [slug]);

  const handleSave = async () => {
    if (postForm.description.trim() === "") {
      setError("Post description cannot be blank.");
      return;
    }
    if (containsBadWords(postForm.description)) {
      setError("Post description contains foul language");
      return;
    }

    const newPost = {
      description: postForm.description,
    };

    try {
      setLoading("Creating discussion...");
      const response = await axiosInstance.post(
        `/api/company/${slug}/discussions/create`,
        newPost
      );

      const savedPost = response.data;

      if (/(@rep)\b/i.test(postForm.description)) {
        notifyRepresentativeBySlug(postForm.description);
      }
      setPostData((prevPosts) => [...prevPosts, savedPost]);
      setIsAddingPost(false);
      setPostForm({ description: "" });
      setSuccess("Created discussion successfully");
    } catch (error) {
      console.error("Error saving post:", error);
      setError("An error occurred while saving the post.");
    } finally {
      setLoading("");
    }
  };

  const notifyRepresentativeBySlug = async (description: string) => {
    try {
      await axiosInstance.post(`/api/company/${slug}/mention`, {
        message: description,
      });
    } catch (error) {
      console.error("Error notifying representative:", error);
    }
  };

  const handleChange = (updatedPost: { description: string }) => {
    setPostForm(updatedPost);
  };

  const handleCancel = () => {
    setIsAddingPost(false);
    setPostForm({ description: "" });
  };

  const handleDescriptionChange = (id: number, updatedDescription: string) => {
    const newPosts = postData.map((post) => {
      if (post.id != id) {
        return post;
      }

      return {
        ...post,
        description: updatedDescription,
      };
    });

    setPostData(newPosts);
  };

  const handleDiscussionDelete = (id: number | undefined) => {
    setPostData((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  const handleReplyChange = (value: string) => {
    setReply(value);
  };

  const handleAddReply = async (discussionId: number) => {
    setSuccess("");
    setError("");
    setCommentSuccess({ replyId: undefined, action: "" });
    if (!reply.trim()) {
      setError("Reply cannot be blank.");
      return;
    }

    try {
      setLoading("Adding reply...");
      await axiosInstance.post(
        `/api/company/${slug}/discussions/${discussionId}/comments`,
        { comment: reply }
      );
      setLoading("Loading discussions...");
      const response = await axiosInstance.get(
        `/api/company/${slug}/discussions`
      );
      const discussions = response.data;
      setPostData(discussions);
      setReply("");
      setActiveReplyPostId(-1);
    } catch (error) {
      console.error("Error adding reply:", error);
      setError("An error occurred while adding the reply.");
    } finally {
      setLoading("");
    }
  };

  const handleReplyDelete = async (replyId: number, discussionId: number) => {
    setSuccess("");
    setError("");
    setCommentSuccess({ replyId: undefined, action: "" });
    try {
      setLoading("Deleting reply...");
      await axiosInstance.delete(
        `/api/company/${slug}/discussions/${discussionId}/comment/${replyId}/delete`
      );

      setLoading("Loading discussions...");
      const response = await axiosInstance.get(
        `/api/company/${slug}/discussions`
      );
      const discussions = response.data;
      setPostData(discussions);
      setSuccess("Reply deleted successfully.");
      setCommentSuccess({ replyId, action: "delete" });
    } catch (error) {
      console.error("Error deleting reply:", error);
      setError("An error occurred while deleting the reply.");
    } finally {
      setLoading("");
    }
  };

  const handleEditClick = (replyId: number, replyText: string) => {
    setError("");
    setSuccess("");
    setCommentSuccess({ replyId: undefined, action: "" });
    if (activeEditReplyId === replyId) {
      setActiveEditReplyId(null);
      setEditedReplyText("");
    } else {
      setActiveEditReplyId(replyId);
      setEditedReplyText(replyText);
    }
  };

  const handleSaveEdit = async (replyId: number) => {
    setSuccess("");
    setError("");
    setCommentSuccess({ replyId: undefined, action: "" });
    try {
      setLoading("Updating comment...");
      await axiosInstance.put(
        `/api/company/${slug}/comment/${replyId}/delete`,
        {
          comment: editedReplyText,
        }
      );
      setLoading("Loading discussions...");
      const response = await axiosInstance.get(
        `/api/company/${slug}/discussions`
      );
      const discussions = response.data;
      setPostData(discussions);
      setCommentSuccess({ replyId, action: "edit" });
      setActiveEditReplyId(null);
      setEditedReplyText("");
    } catch (error) {
      console.error("Failed to save the reply:", error);
      setError("Failed to update reply. Please try again.");
    } finally {
      setLoading("");
    }
  };

  return (
    <PaddedContainer classNames={styles.paddedContainer}>
      {loading && <Spinner message={loading} />}
      <div className={styles.container}>
        <div className={styles.leftcontainer}>
          <div className={styles.titleButtonContainer}>
            <h2>Discussion Forum</h2>
            <Button
              color="primary"
              roundness="rounded"
              classNames={styles.replyButton}
              onClick={() => {
                setIsAddingPost(true);
                setError("");
                setSuccess("");
              }} // Show form on button click
            >
              Add Post
            </Button>
          </div>
          <div className={styles.rightcontainerMobile}>
            <StyledBox paddedContainerClass={styles.styledBox}>
              <p className={styles.noteTitle}>Note</p>
              <p>
                No offensive and rude behavior is allowed. Please report them by
                clicking the report button on the post.
              </p>
              <p>
                If you need to mention the company, simply type "@rep" in your
                message.
              </p>
            </StyledBox>
          </div>
          {error && <ValidationError message={error} />}
          {success && <SuccessMessage message={success} />}

          {isAddingPost && (
            <DiscussionAddPostForm
              post={postForm}
              onSave={handleSave}
              onChange={handleChange}
              onCancel={handleCancel}
            />
          )}

          <div className={styles.discussionContainer}>
            {postData &&
              postData.map((post) => (
                <Fragment key={post.id}>
                  <DiscussionForumItem
                    id={post.id}
                    internName={post.internName}
                    date={post.date}
                    description={post.description}
                    onDescriptionChange={(updatedDescription: string) =>
                      handleDescriptionChange(post.id, updatedDescription)
                    }
                    setSuccess={setSuccess}
                    setLoading={setLoading}
                    setError={setError}
                    onDiscussionDelete={handleDiscussionDelete}
                    posted_by={post.posted_by}
                    handleReplyClick={() => {
                      setActiveReplyPostId(
                        activeReplyPostId === post.id ? -1 : post.id
                      );
                      setError("");
                      setSuccess("");
                    }}
                    user_id={post.user_id}
                  />
                  {
                    <div className={styles.repliesContainer}>
                      {post.replies &&
                        post.replies.map((reply) => (
                          <div
                            key={reply.id}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "0.25rem",
                            }}
                          >
                            {commentSuccess?.replyId === reply.id &&
                              commentSuccess.action === "edit" && (
                                <SuccessMessage message="Comment edited successfully!" />
                              )}
                            {commentSuccess?.replyId === reply.id &&
                              commentSuccess.action === "delete" && (
                                <SuccessMessage message="Comment deleted successfully!" />
                              )}
                            {commentSuccess?.replyId === reply.id &&
                              commentSuccess.action === "report" && (
                                <SuccessMessage message="Comment reported successfully!" />
                              )}
                            {activeProfileUserId === reply.posted_by && (
                              <DisplayProfile
                                onClose={() => setActiveProfileUserId(null)}
                                user_id={reply.posted_by}
                                isVisible={
                                  activeProfileUserId === reply.posted_by
                                }
                              />
                            )}
                            <div className={styles.repliesDetails}>
                              <strong
                                className={styles.replyInternName}
                                onClick={() =>
                                  handleProfileClick(reply.posted_by)
                                }
                              >
                                {reply.username}
                              </strong>
                              <span className={styles.separator}> · </span>
                              {reply.posted_at}
                            </div>

                            {activeEditReplyId === reply.id ? (
                              <div className={styles.editDescriptionSection}>
                                <textarea
                                  className={styles.descriptionTextarea}
                                  rows={5}
                                  value={editedReplyText}
                                  onChange={(e) =>
                                    setEditedReplyText(e.target.value)
                                  }
                                />
                                <div className={styles.editButtons}>
                                  <button
                                    className={styles.cancelButton}
                                    onClick={() => setActiveEditReplyId(null)}
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    className={styles.saveButton}
                                    onClick={() => handleSaveEdit(reply.id)}
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div>{reply.comment}</div>
                            )}

                            <div className={styles.iconContainer}>
                              {user?.id === reply.posted_by && (
                                <button
                                  onClick={() =>
                                    handleEditClick(reply.id, reply.comment)
                                  }
                                >
                                  <IconEdit
                                    size={25}
                                    stroke={1.5}
                                    className={styles.iconEdit}
                                  />
                                </button>
                              )}

                              {user?.id === reply.posted_by && (
                                <button
                                  onClick={() =>
                                    handleReplyDelete(reply.id, post.id)
                                  }
                                >
                                  <IconTrash
                                    size={25}
                                    stroke={1.5}
                                    className={styles.iconDelete}
                                  />
                                </button>
                              )}

                              {user?.id !== reply.posted_by && (
                                <button>
                                  <IconFlagFilled
                                    size={25}
                                    stroke={1.5}
                                    className={styles.iconReport}
                                  />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  }
                  {activeReplyPostId === post.id && (
                    <div className={styles.replyFormFieldContainer}>
                      <FormField
                        type={"text"}
                        placeholder={"Add your reply..."}
                        classNames={styles.replyFormField}
                        parentDivClassnames={styles.formFieldParent}
                        value={reply}
                        onChange={(e) => handleReplyChange(e.target.value)}
                      />
                      <Button
                        color={"black"}
                        roundness={"sm-rounded"}
                        classNames={styles.cancelReplyButton}
                        onClick={() => setActiveReplyPostId(-1)}
                      >
                        <IconX />
                      </Button>
                      <Button
                        color={"primary"}
                        roundness={"sm-rounded"}
                        classNames={styles.sendReplyButton}
                        onClick={() => handleAddReply(post.id)}
                      >
                        <IconSend />
                      </Button>
                    </div>
                  )}
                </Fragment>
              ))}
          </div>
        </div>
        <div className={styles.rightcontainer}>
          <StyledBox paddedContainerClass={styles.styledBox}>
            <p className={styles.noteTitle}>Note</p>
            <p>
              No offensive and rude behavior is allowed. Please report them by
              clicking the report button on the post.
            </p>
            <p>
              If you need to mention the company, simply type "@rep" in your
              message.
            </p>
          </StyledBox>
        </div>
      </div>
    </PaddedContainer>
  );
}
