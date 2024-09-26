import CompanyJobInformationFormItem from "../../components/ui/company/CompanyJobInformationFormItem";
import Button from "../../components/ui/Button";

import styles from "./CompanyManageInformationJobs.module.scss";
import CompanyJobs from "../../components/ui/company/CompanyJobs";

export interface Job {
  name: string;
  description: string;
}

export default function CompanyManageInformationJobs() {
  const jobs: Job[] = [
    {
      name: "Java Developer",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem iusto ducimus aliquam cupiditate est sapiente sequi, pariatur sint rerum magni at totam blanditiis nulla reprehenderit fugit numquam? Quasi nisi sint, iste exercitationem cum ipsum nemo enim pariatur natus nobis, qui, est temporibus provident! Sunt corporis itaque animi dolores nobis ipsum!",
    },
    {
      name: "C++ Developer",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error tempore eveniet temporibus unde, commodi exercitationem magnam nihil dolorum cupiditate? Minima praesentium ex similique obcaecati voluptatem minus pariatur molestias expedita impedit!",
    },
    {
      name: "React Developer",
      description: "Short description",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h2>Job Information</h2>
        <Button
          classNames={styles.addJobButton}
          color="secondary"
          roundness="rounded"
        >
          Add Job
        </Button>
      </div>

      <CompanyJobInformationFormItem
        jobTitle=""
        jobDescription=""
      ></CompanyJobInformationFormItem>

      <CompanyJobs jobs={jobs} />
    </div>
  );
}
