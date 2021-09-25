When movie titles are longer than 45 chars, they are truncated with "...". (see last movie card for example)

```jsx
const movies = [{
    title: 'Venom',
    posterUrl: 'https://image.tmdb.org/t/p/w780/2uNW4WbgBXL25BAbXGLnLqX71Sw.jpg'
  },
  {
    title: 'Shang-Chi and the Legend of the Ten Rings',
    posterUrl: 'https://image.tmdb.org/t/p/w780/xeItgLK9qcafxbd8kYgv7XnMEog.jpg'
  },
  {
    title: 'Cruella',
    posterUrl: 'https://image.tmdb.org/t/p/w780/wToO8opxkGwKgSfJ1JK8tGvkG6U.jpg'
  },
  {
    title: 'Ashfall',
    posterUrl: 'https://image.tmdb.org/t/p/w780/gCZ0RHifBxZGedde7WPWSgjpyZt.jpg'
  },
  {
    title: 'Jolt',
    posterUrl: 'https://image.tmdb.org/t/p/w780/gYZAHan5CHPFXORpQMvOjCTug4E.jpg'
  },
  {
    title: 'The Simpsons: The Good, the Bart, and the Loki',
    posterUrl: 'https://image.tmdb.org/t/p/w780/rtMdtzywcAGOrF6t8fbxJBqpdcq.jpg'
  }
];

<div className="grid lg:grid-cols-3 gap-10">
  {movies.map(movie => <MovieCard movie={movie} />)}
</div>
```