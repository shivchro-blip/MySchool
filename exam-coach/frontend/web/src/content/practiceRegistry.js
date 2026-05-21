const practiceModules = import.meta.glob('./Class_*/English/practice/*.js')

export default Object.fromEntries(
  Object.entries(practiceModules).map(([path, loader]) => [
    path.replace(/^.*\/practice\/(.+)\.js$/, '$1'),
    loader,
  ])
)
