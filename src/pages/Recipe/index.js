import './recipe.css';

import { BsHeart, BsHeartFill } from 'react-icons/bs';

import Placeholder from '../../assets/images/placeholder.jpg';

export default function Recipe({ test }) {
  return (
    <>
      <header className='recipe-header'>
        <h1 className='recipe-name'>{test.recipe_name}</h1>
        <p className='description'>{test.description}</p>
        <p className='date-posted'>
          Date Posted: <span>{test.date_posted}</span>
        </p>
      </header>

      <main>
        <section className='recipe-tutorial'>
          <div className='recipe-details'>
            <div className='img-container'>
              <img src={Placeholder} />
            </div>
            <div className='recipe-container'>
              <h3>{test.recipe_name}</h3>
              <BsHeart className='icon-heart' />
            </div>
            <div className='time'>
              <p>
                Prep Time: <span>{test.prep_time}</span>
              </p>
              <p>
                Cook Time: <span>{test.cook_time}</span>
              </p>
              <p>
                Total: <span>{test.total_time}</span>
              </p>
            </div>
          </div>

          <div className='recipe-ingredients'>
            <header className='header'>
              <h2>Ingredients</h2>
            </header>
            <div className='ingredients'>
              <ul>
                {Object.keys(test.ingredients).map((key) => {
                  return (
                    <>
                      <li>{test.ingredients[key]}</li>
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
              {test.steps.map((item, id) => {
                return (
                  <>
                    <div className='step'>
                      <header className='step-header'>
                        <h3>
                          <span>{id + 1}</span> {item.header}
                        </h3>
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
  /* <h1>{test.recipe_name}</h1>
<p>{test.category}</p>
{Object.keys(test.ingredients).map((key) => {
  return (
    <>
      <p>{test.ingredients[key]}</p>
    </>
  );
})}
{test.steps.map((item, id) => {
  return (
    <>
      <span>{id}</span>
      <h1>{item.header}</h1>
      <p>{item.step}</p>
    </>
  );
})} */
}
