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

  const [postData, setPostData] = useState([
    {
      id: 1,
      internName: "Jane Smith",
      date: "02/10/2024",
      description:
        "Completed front-end development tasks for the dashboard module. Resolved several UI bugs and improved performance.",
    },
    {
      id: 2,
      internName: "Mark Tan",
      date: "02/12/2024",
      description:
        "Worked on API integration for user authentication. Successfully implemented login/logout features using OAuth.",
    },
    {
      id: 3,
      internName: "Emily Garcia",
      date: "02/15/2024",
      description:
        "Refactored the payment service module, optimizing the database queries and reducing response time by 30%.",
    },
    {
      id: 4,
      internName: "Michael Reyes",
      date: "02/18/2024",
      description:
        "Collaborated with the design team to revamp the user profile page. Added user-friendly input validations and feedback messages.",
    },
    {
      id: 5,
      internName: "Anna Cruz",
      date: "02/20/2024",
      description:
        "Developed a new feature allowing users to export data reports in CSV format. Tested and deployed to staging environment.",
    },
  ]);

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
            {postData.map((post) => (
              <DiscussionForumItem
                key={post.id}
                internName={post.internName}
                date={post.date}
                description={post.description}
                onDescriptionChange={(updatedDescription: string) =>
                  handleDescriptionChange(post.id, updatedDescription)
                }
              />
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
