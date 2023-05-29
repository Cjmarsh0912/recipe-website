import Comment from './Comment';
import AddComment from './AddComment';

import styles from './assets/css/commentSection.module.css';

import { RecipeData } from 'interfaces/interface';

type CommentSectionProps = {
  recipeData: RecipeData;
};

const CommentSection = ({ recipeData }: CommentSectionProps) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2>{recipeData.comments.length} Comment(s):</h2>
      </header>

      <section className={styles.commentSection}>
        <AddComment recipeData={recipeData} />

        <div className={styles.comments}>
          <header className={styles.header}></header>
          <ul>
            {recipeData.comments.map((comment) => (
              <Comment Comment={comment} recipeData={recipeData} />
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default CommentSection;
