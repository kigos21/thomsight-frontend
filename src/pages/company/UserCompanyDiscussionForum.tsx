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
import { IconSend, IconX } from "@tabler/icons-react";

interface Reply {
  id: number;
  username: string;
  comment: string;
  posted_at: string;
}

interface Post {
  id: number;
  internName: string;
  date: string;
  description: string;
  posted_by: number;
  replies: Reply[];
}

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
  const [replies, setReplies] = useState<Reply[]>([]);

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
    if (!reply.trim()) {
      setError("Reply cannot be blank.");
      return;
    }

    try {
      setLoading("Adding reply...");
      const response = await axiosInstance.post(
        `/api/company/${slug}/discussions/${discussionId}/comments`,
        { comment: reply }
      );

      const newReply = response.data;
      setPostData((prevPosts) =>
        prevPosts.map((post) =>
          post.id === discussionId
            ? { ...post, replies: [...post.replies, newReply] }
            : post
        )
      );
      setReply("");
      setActiveReplyPostId(-1);
    } catch (error) {
      console.error("Error adding reply:", error);
      setError("An error occurred while adding the reply.");
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
                    handleReplyClick={() =>
                      setActiveReplyPostId(
                        activeReplyPostId === post.id ? -1 : post.id
                      )
                    }
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
                            <div>
                              <strong>{reply.username}</strong> ·{" "}
                              {reply.posted_at}
                            </div>
                            <div>{reply.comment}</div>
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
          </StyledBox>
        </div>
      </div>
    </PaddedContainer>
  );
}
