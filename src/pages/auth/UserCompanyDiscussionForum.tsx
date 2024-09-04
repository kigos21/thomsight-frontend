import PaddedContainer from "../../components/layout/PaddedContainer";
import DiscussionForumItem from "../../components/ui/DiscussionForumItem";
import Button from "../../components/ui/Button";
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
          <h2>right container holder</h2>
        </div>
      </div>
    </PaddedContainer>
  );
}
