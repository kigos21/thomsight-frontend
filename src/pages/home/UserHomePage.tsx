import MultiSelect from "../../components/form/MultiSelect";
import PaddedContainer from "../../components/layout/PaddedContainer";
import HomeCompanyItem from "../../components/ui/home/HomeCompanyItem";
import { HomeCompanyItemProps } from "../../types/props";

import styles from "./UserHomePage.module.scss";

const companyData: HomeCompanyItemProps[] = [
  {
    name: "Company 1",
    location: "Makati, Philippines",
    jobs: [
      "Java Developer",
      "Data Analytics",
      "Web Developer",
      "Web Developer",
      "Web Developer",
    ],
    about:
      "Accenture plc is a global multinational professional services company originating in the US and headquartered in Dublin, Ireland, that specializes in information technology services and consulting. A Fortune Global 500 company, it reported revenues of $64.1 billion in 2024",
  },
  {
    name: "Tech Innovators Inc.",
    location: "Taguig, Philippines",
    jobs: ["Frontend Developer"],
    about:
      "Tech Innovators Inc. is a leading IT services company that specializes in software development and digital transformation. They work with businesses across the globe to provide innovative tech solutions.",
  },
  {
    name: "Global Solutions Ltd.",
    location: "Cebu City, Philippines",
    jobs: [
      "Project Manager",
      "DevOps Engineer",
      "Quality Assurance",
      "UI/UX Designer",
    ],
    about:
      "Global Solutions Ltd. provides consulting and outsourcing services, focusing on optimizing operational efficiency for various industries. Their expertise includes cloud services, automation, and AI-driven solutions.",
  },
  {
    name: "CloudStack Technologies",
    location: "Pasig, Philippines",
    jobs: [
      "Cloud Engineer",
      "Network Administrator",
      "Cybersecurity Specialist",
      "UI/UX Designer",
    ],
    about:
      "CloudStack Technologies is a fast-growing company specializing in cloud computing services and cybersecurity. They have partnered with major global tech companies to deliver top-notch cloud infrastructure solutions.",
  },
  {
    name: "BrightFuture Software",
    location: "Davao City, Philippines",
    jobs: [
      "Mobile App Developer",
      "Full Stack Developer",
      "Technical Support",
      "UI/UX Designer",
    ],
    about:
      "BrightFuture Software is known for developing innovative mobile and web applications. With a focus on scalable software development, they help startups and SMEs build digital products from the ground up.",
  },
];

export default function UserHomePage() {
  return (
    <PaddedContainer classNames={styles.container}>
      <div className={styles.filterSection}>
        <input
          type="text"
          placeholder="Keywords, Company"
          className={styles.searchBox}
        />
        <MultiSelect
          options={[
            { label: "Option 1", value: "option1" },
            { label: "Option 2", value: "option2" },
          ]}
        />
      </div>

      <h1 className={styles.h1}>Companies</h1>

      <div className={styles.itemContainer}>
        {companyData.map((company) => (
          <HomeCompanyItem {...company} />
        ))}
      </div>
    </PaddedContainer>
  );
}
