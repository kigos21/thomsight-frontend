import PaddedContainer from "../../components/layout/PaddedContainer";
import DiscussionForumItem from "../../components/ui/company/DiscussionForumItem";
import Button from "../../components/ui/Button";
import StyledBox from "../../components/layout/StyledBox";
import styles from "./UserCompanyDiscussionForum.module.scss";
import { Fragment, useEffect, useState } from "react";
import DiscussionAddPostForm from "../../components/ui/company/DiscussionAddPostForm";
import axiosInstance from "../../services/axiosInstance";
import { useParams } from "react-router-dom";
import Spinner from "../../components/ui/Spinner";
import { containsBadWords } from "../../badWordsFilter";
import FormField from "../../components/form/FormField";
import { IconFlagFilled, IconTrash, IconEdit } from "@tabler/icons-react";
import { IconSend, IconX } from "@tabler/icons-react";
import { useUser } from "../../contexts/UserContext";
import DisplayProfile from "../../components/ui/company/DisplayProfile";
import { toast } from "react-toastify";
import ReportForm from "../../components/ui/company/ReportForm";
import DeletePopUp from "../../components/ui/company/DeletePopUp";

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
  created_at: string;
}

interface ReplyToDelete {
  replyId: number | null;
  postId: number | null;
}

export default function UserCompanyDiscussionForum() {
  const [isAddingPost, setIsAddingPost] = useState<boolean>(false); // To control the form visibility
  const [postForm, setPostForm] = useState({
    description: "",
  });

  const [reply, setReply] = useState<string>("");
  const [activeReplyPostId, setActiveReplyPostId] = useState<number>(-1); // -1 if unset
  const { slug } = useParams<{ slug: string }>();
  const [loading, setLoading] = useState<string>("");
  const [postData, setPostData] = useState<Post[]>([]);
  const { user } = useUser();
  const [activeEditReplyId, setActiveEditReplyId] = useState<number | null>(
    null
  );
  const [activeProfileUserId, setActiveProfileUserId] = useState<number | null>(
    null
  );
  const [editedReplyText, setEditedReplyText] = useState("");
  const [showReportPopup, setShowReportPopup] = useState<boolean>(false);
  const [selectedReportOption, setSelectedReportOption] = useState<
    string | null
  >(null);
  const [reportDescription, setReportDescription] = useState<string>("");
  const [reportLoading, setReportLoading] = useState<string>("");
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [replyToDelete, setReplyToDelete] = useState<ReplyToDelete>({
    replyId: null,
    postId: null,
  });
  const [replyToReport, setReplyToReport] = useState<number | null>(null);

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
        let discussions: Post[] = response.data;
        discussions = discussions.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
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
      toast.error("Post description can not be blank.");
      return;
    }
    if (containsBadWords(postForm.description)) {
      toast.error("Post description contains foul language");
      return;
    }
    if (postForm.description.length > 2500) {
      toast.error("Post description should be limited to 2500 characters.");
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
      setPostData((prevPosts) => [savedPost, ...prevPosts]);
      setIsAddingPost(false);
      setPostForm({ description: "" });
      toast.success("Created discussion successfully");
    } catch (error) {
      console.error("Error saving post:", error);
      toast.error("An error occurred while saving the post.");
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
      toast.error("Failed to notify representative");
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
    if (/(@rep)\b/i.test(updatedDescription)) {
      notifyRepresentativeBySlug(updatedDescription);
    }

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
    if (!reply.trim()) {
      toast.error("Comment can not be blank.");
      return;
    }
    if (reply.length > 1000) {
      toast.error("Comments should be limited to 1000 characters.");
      return;
    }
    if (containsBadWords(reply)) {
      toast.error("Comment contains foul language");
      return;
    }

    try {
      setLoading("Adding reply...");
      await axiosInstance.post(
        `/api/company/${slug}/discussions/${discussionId}/comments`,
        { comment: reply }
      );
      if (/(@rep)\b/i.test(reply)) {
        notifyRepresentativeBySlug(reply);
      }
      setLoading("Loading discussions...");
      const response = await axiosInstance.get(
        `/api/company/${slug}/discussions`
      );
      let discussions: Post[] = response.data;
      discussions = discussions.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setPostData(discussions);
      setReply("");
      setActiveReplyPostId(-1);
      toast.success("Replied successfully");
    } catch (error) {
      console.error("Error adding reply:", error);
      toast.error("An error occurred while adding the reply.");
    } finally {
      setLoading("");
    }
  };

  const handleReplyDelete = async () => {
    if (!replyToDelete.replyId || !replyToDelete.postId) return;
    try {
      setShowDeletePopup(false);
      setLoading("Deleting reply...");
      await axiosInstance.delete(
        `/api/company/${slug}/discussions/${replyToDelete.postId}/comment/${replyToDelete.replyId}/delete`
      );

      setLoading("Loading discussions...");
      const response = await axiosInstance.get(
        `/api/company/${slug}/discussions`
      );
      let discussions: Post[] = response.data;
      discussions = discussions.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setPostData(discussions);
      toast.success("Reply deleted successfully.");
    } catch (error) {
      console.error("Error deleting reply:", error);
      toast.error("An error occurred while deleting the reply.");
    } finally {
      setLoading("");
      setReplyToDelete({ replyId: null, postId: null });
    }
  };

  const handleEditClick = (replyId: number, replyText: string) => {
    if (activeEditReplyId === replyId) {
      setActiveEditReplyId(null);
      setEditedReplyText("");
    } else {
      setActiveEditReplyId(replyId);
      setEditedReplyText(replyText);
    }
  };

  const handleSaveEdit = async (replyId: number) => {
    if (!editedReplyText.trim()) {
      toast.error("Comment can not be blank.");
      return;
    }
    if (editedReplyText.length > 1000) {
      toast.error("Comments should be limited to 1000 characters");
      return;
    }
    if (containsBadWords(editedReplyText)) {
      toast.error("Comment contains foul language");
      return;
    }
    try {
      setLoading("Updating reply...");
      await axiosInstance.put(
        `/api/company/${slug}/comment/${replyId}/delete`,
        {
          comment: editedReplyText,
        }
      );
      if (/(@rep)\b/i.test(editedReplyText)) {
        notifyRepresentativeBySlug(editedReplyText);
      }
      setLoading("Loading discussions...");
      const response = await axiosInstance.get(
        `/api/company/${slug}/discussions`
      );
      let discussions: Post[] = response.data;
      discussions = discussions.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setPostData(discussions);
      setActiveEditReplyId(null);
      setEditedReplyText("");
      toast.success("Updated reply successfully");
    } catch (error) {
      console.error("Failed to save the reply:", error);
      toast.error("Failed to update reply. Please try again.");
    } finally {
      setLoading("");
    }
  };

  const handleReportClick = (id: number) => {
    setReplyToReport(id);
    setShowReportPopup(true);
  };

  const handleSubmitReport = async () => {
    if (!selectedReportOption) {
      toast.error("Please select an issue type.");
      return;
    }
    if (!reportDescription) {
      toast.error("Please fill out the reason");
      return;
    }
    if (reportDescription.length > 255) {
      toast.error("Reason should be limited to 255 characters");
      return;
    }
    setShowReportPopup(false);
    setReportLoading("Submitting report...");
    try {
      const response = await axiosInstance.post(
        `/api/report/comment/${replyToReport}`,
        {
          id: replyToReport,
          issue: selectedReportOption,
          reason: reportDescription,
        }
      );
      if (response.status === 200) {
        toast.success("Report submitted successfully.");
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.error(error);
    } finally {
      setReportLoading("");
      setSelectedReportOption(null);
      setReportDescription("");
      setReplyToReport(null);
    }
  };

  const handleDeleteClick = (replyId: number, postId: number) => {
    setReplyToDelete({ replyId, postId });
    setShowDeletePopup(true);
  };

  return (
    <PaddedContainer classNames={styles.paddedContainer}>
      {loading && <Spinner message={loading} />}
      {reportLoading && <Spinner message={reportLoading} />}
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
                    setLoading={setLoading}
                    onDiscussionDelete={handleDiscussionDelete}
                    posted_by={post.posted_by}
                    handleReplyClick={() => {
                      setActiveReplyPostId(
                        activeReplyPostId === post.id ? -1 : post.id
                      );
                    }}
                    user_id={post.user_id}
                  />
                  {
                    <div className={styles.repliesContainer}>
                      {post.replies &&
                        post.replies.map((reply) => (
                          <div>
                            <div
                              key={reply.id}
                              className={styles.commentContainer}
                            >
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
                                <div
                                  style={{
                                    maxWidth: "100%",
                                    wordWrap: "break-word",
                                  }}
                                >
                                  {reply.comment}
                                </div>
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
                                      handleDeleteClick(reply.id, post.id)
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
                                  <button
                                    onClick={() => handleReportClick(reply.id)}
                                  >
                                    <IconFlagFilled
                                      size={25}
                                      stroke={1.5}
                                      className={styles.iconReport}
                                    />
                                  </button>
                                )}
                              </div>
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
      {showReportPopup && (
        <ReportForm
          isVisible={showReportPopup}
          onClose={() => setShowReportPopup(false)}
          selectedOption={selectedReportOption}
          setSelectedOption={setSelectedReportOption}
          description={reportDescription}
          setDescription={setReportDescription}
          handleSubmit={(event) => {
            event.preventDefault();
            handleSubmitReport();
          }}
          loading={reportLoading === "Submitting report..."}
        ></ReportForm>
      )}
      {showDeletePopup && (
        <DeletePopUp
          isVisible={showDeletePopup}
          onClose={() => setShowDeletePopup(false)}
          onDelete={handleReplyDelete}
          heading="Delete Reply"
          details="Are you sure you want to delete this reply?"
        />
      )}
    </PaddedContainer>
  );
}
