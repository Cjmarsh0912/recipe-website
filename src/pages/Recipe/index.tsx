import './recipe.css';

import { BsHeart } from 'react-icons/bs';

import { RecipeData } from '../../interfaces/interface';

interface Recipe {
  recipe: RecipeData;
}

export default function Recipe(props: Recipe) {
  return (
    <>
      <header className='recipe-header'>
        <h1 className='recipe-name'>{props.recipe.recipe_name}</h1>
        <p className='description'>{props.recipe.description}</p>
        <p className='date-posted'>
          Date Posted: <span>{props.recipe.date_posted}</span>
        </p>
      </header>

      <main>
        <section className='recipe-tutorial'>
          <div className='recipe-details'>
            <div className='img-container'>
              <img src={props.recipe.image} />
            </div>
            <div className='recipe-container'>
              <h3>{props.recipe.recipe_name}</h3>
              <BsHeart className='icon-heart' />
            </div>
            <div className='time'>
              <p>
                Prep Time: <span>{props.recipe.prep_time}</span>
              </p>
              <p>
                Cook Time: <span>{props.recipe.cook_time}</span>
              </p>
              <p>
                Total: <span>{props.recipe.total_time}</span>
              </p>
            </div>
          </div>

          <div className='recipe-ingredients'>
            <header className='header'>
              <h2>Ingredients</h2>
            </header>
            <div className='ingredients'>
              <ul>
                {props.recipe.ingredients.map((item) => {
                  return (
                    <>
                      <li>{item}</li>
                    </>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className='recipe-directions'>
            <header className='header'>
              <h2>Directions</h2>
            </header>

            <div className='directions'>
              {props.recipe.steps.map((item, id) => {
                return (
                  <>
                    <div className='step'>
                      <header className='step-header'>
                        <span>{id + 1}.</span>
                        <h3>{item.header}</h3>
                      </header>
                      <div className='step-direction'>
                        <p>{item.step}</p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

{
  /* <h1>{recipe.recipe_name}</h1>
<p>{recipe.category}</p>
{Object.keys(recipe.ingredients).map((key) => {
  return (
    <>
      <p>{recipe.ingredients[key]}</p>
    </>
  );
})}
{recipe.steps.map((item, id) => {
  return (
    <>
      <span>{id}</span>
      <h1>{item.header}</h1>
      <p>{item.step}</p>
    </>
  );
})} */
}
