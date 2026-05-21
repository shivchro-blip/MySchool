const chapterModules = import.meta.glob('./Class_*/English/chapters/*.js')

export default Object.fromEntries(
  Object.entries(chapterModules).map(([path, loader]) => [
    path.replace(/^.*\/chapters\/(.+)\.js$/, '$1'),
    loader,
  ])
)
