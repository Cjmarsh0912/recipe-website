import Comment from './Comment';
import AddComment from './AddComment';

import { useRecipeDataContext } from './context/RecipeDataContext';

import styles from './assets/css/commentSection.module.css';

import { RecipeData } from 'interfaces/interface';

type CommentSectionProps = {
  recipeData: RecipeData;
};

const CommentSection = () => {
  const { recipeData } = useRecipeDataContext();
  console.log(recipeData);
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2>{recipeData.comments.length} Comment(s):</h2>
      </header>

      <section className={styles.commentSection}>
        <AddComment />

        <div className={styles.comments}>
          <header className={styles.header}></header>
          <ul>
            {recipeData.comments.map((comment) => (
              <Comment Comment={comment} />
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default CommentSection;
