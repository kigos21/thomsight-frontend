import PaddedContainer from "../../components/layout/PaddedContainer";
import DiscussionForumItem from "../../components/ui/DiscussionForumItem";
import Button from "../../components/ui/Button";
import StyledBox from "../../components/layout/StyledBox";
import styles from "./UserCompanyDiscussionForum.module.scss";

export default function UserCompanyDiscussionForum() {
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
            >
              Add Post
            </Button>
          </div>
          <div className={styles.discussionContainer}>
            <DiscussionForumItem
              internName="John Doe"
              date="01/27/2024"
              discussionForumDescription="i love the experience i love the experience i love the experience i love the experience i love the experience"
            ></DiscussionForumItem>
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
