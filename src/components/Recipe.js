export default function Recipe({ test }) {
  return (
    <main>
      <h1>{test.recipe_name}</h1>
      <p>{test.category}</p>
    </main>
  );
}
