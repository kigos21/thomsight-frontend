import PaddedContainer from "../../components/layout/PaddedContainer";
import DiscussionForumItem from "../../components/ui/company/DiscussionForumItem";
import Button from "../../components/ui/Button";
import StyledBox from "../../components/layout/StyledBox";
import styles from "./UserCompanyDiscussionForum.module.scss";
import { useState } from "react";
import DiscussionAddPostForm from "../../components/ui/company/DiscussionAddPostForm";

export default function UserCompanyDiscussionForum() {
  const [isAddingPost, setIsAddingPost] = useState<boolean>(false); // To control the form visibility
  const [postForm, setPostForm] = useState({
    description: "",
  });

  const handleSave = () => {
    console.log("Post Saved");
    console.log(JSON.stringify(postForm, null, 2));
    // Add logic to handle the save
    setIsAddingPost(false);
    setPostForm({ description: "" });
  };

  const handleChange = (updatedPost: { description: string }) => {
    setPostForm(updatedPost);
  };

  const handleCancel = () => {
    setIsAddingPost(false);
    setPostForm({ description: "" });
  };

  return (
    <PaddedContainer classNames={styles.paddedContainer}>
      <div className={styles.container}>
        <div className={styles.leftcontainer}>
          <div className={styles.titleButtonContainer}>
            <h2>Discussion Forum</h2>
            <Button
              color="primary"
              roundness="rounded"
              classNames={styles.replyButton}
              onClick={() => setIsAddingPost(true)} // Show form on button click
            >
              Add Post
            </Button>
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
            <DiscussionForumItem
              internName="John Doe"
              date="01/27/2024"
              discussionForumDescription="i love the experience i love the experience i love the experience i love the experience i love the experience"
            />
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
