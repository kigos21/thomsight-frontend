import { IconCircleFilled } from "@tabler/icons-react";

import styles from "./CVFeedbackView.module.scss";

const CVFeedbackCreate = () => {
  return (
    <div className={styles.rootContainer}>
      <div className={styles.documentPlaceholder}>PDF Document</div>
      <div className={styles.headingGroup}>
        <h2>Remarks</h2>
        <IconCircleFilled size={4} className={styles.separator} />
        <span>By Name Here</span>
      </div>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Sagittis orci a
        scelerisque purus semper eget duis at. Nunc non blandit massa enim nec.
        Tortor aliquam nulla facilisi cras fermentum odio eu feugiat pretium.{" "}
      </p>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Sagittis orci a
        scelerisque purus semper eget duis at. Nunc non blandit massa enim nec.
        Tortor aliquam nulla facilisi cras fermentum odio eu feugiat pretium.{" "}
      </p>
    </div>
  );
};

export default CVFeedbackCreate;
