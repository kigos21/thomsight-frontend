import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import styles from "./CompanyManageInformationCompany.module.scss";

export default function CompanyManageInformationCompany() {
  return (
    <div className={styles.container}>
      <h2>Company Information</h2>

      <div>
        <div className={styles.sectionHeading}>
          <h3>Company Description</h3>
          <button className={styles.headingEditButton}>
            <IconEdit />
          </button>
        </div>

        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore,
          ratione totam nostrum quas cum ipsam molestias libero molestiae animi,
          officiis quo, iure iusto facilis dolores esse perferendis ipsa quod
          eum similique id voluptatem fuga consectetur sunt sint? Vitae nesciunt
          doloremque necessitatibus, fuga cumque vel quae quasi, quis quisquam
          quam molestias maxime earum aut itaque eos aliquid adipisci officia
          voluptatibus dignissimos inventore atque non! Quidem autem ipsa natus
          id in magni culpa, numquam maiores libero perspiciatis nulla eveniet
          quis soluta praesentium fugiat sapiente enim? Dolor, eos? Unde
          voluptate reprehenderit tenetur cumque corrupti nulla aliquam dolorum
          dolor modi? Quas, maiores sapiente animi earum tempore molestias non
          nihil nisi fugit obcaecati! Tenetur voluptatem veniam voluptatibus
          neque sed officia distinctio dicta ipsam debitis. Nam, facilis fugit
          quos aperiam eaque eligendi inventore, voluptates, eius vel eos
          cumque! Recusandae, fugiat excepturi consequatur aliquid sit harum?
          Dolores eveniet at, obcaecati assumenda maiores eligendi autem qui
          consectetur quidem quae hic iure. Ipsam incidunt ex, commodi libero
          assumenda dolor tempore unde aliquid dignissimos. Iusto cumque, quasi,
          eos vero ad nostrum dolores totam repellendus suscipit voluptate culpa
          laudantium architecto? Quibusdam ad deserunt nihil molestiae quae cum
          modi recusandae blanditiis animi quas sunt consectetur quo velit dicta
          laboriosam eos, repudiandae tempora.
        </p>
      </div>

      <div>
        <div className={styles.sectionHeading}>
          <h3>Company Size</h3>
          <button className={styles.headingEditButton}>
            <IconEdit />
          </button>
        </div>

        <p>10 000+</p>
      </div>

      <div>
        <div className={styles.sectionHeading}>
          <h3>Industry</h3>
          <button className={styles.headingEditButton}>
            <IconEdit />
          </button>
        </div>

        <p>Bank Technologies</p>
      </div>

      <div>
        <div className={styles.sectionHeading}>
          <h3>Company Location</h3>
          <button className={styles.addLocationButton}>
            <IconPlus stroke={1.5} size={20} />
            <p>Add Location</p>
          </button>
        </div>

        <div className={styles.locationGrid}>
          <div className={styles.locationItem}>
            Makati, Philippines
            <button className={styles.editButton}>
              <IconEdit />
            </button>
            <button className={styles.deleteButton}>
              <IconTrash />
            </button>
          </div>

          <div className={styles.locationItem}>
            Makati, Philippines
            <button className={styles.editButton}>
              <IconEdit />
            </button>
            <button className={styles.deleteButton}>
              <IconTrash />
            </button>
          </div>

          <div className={styles.locationItem}>
            Makati, Philippines, Makati, Philippines, Makati, Philippines
            <button className={styles.editButton}>
              <IconEdit />
            </button>
            <button className={styles.deleteButton}>
              <IconTrash />
            </button>
          </div>

          <div className={styles.locationItem}>
            Makati, Philippines
            <button className={styles.editButton}>
              <IconEdit />
            </button>
            <button className={styles.deleteButton}>
              <IconTrash />
            </button>
          </div>

          <div className={styles.locationItem}>
            Makati, Philippines
            <button className={styles.editButton}>
              <IconEdit />
            </button>
            <button className={styles.deleteButton}>
              <IconTrash />
            </button>
          </div>

          <div className={styles.locationItem}>
            Makati, Philippines
            <button className={styles.editButton}>
              <IconEdit />
            </button>
            <button className={styles.deleteButton}>
              <IconTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
