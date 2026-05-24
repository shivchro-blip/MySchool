const practiceModules = import.meta.glob('./Class_*/**/practice/*.js')

export default Object.fromEntries(
  Object.entries(practiceModules).map(([path, loader]) => [
    path.replace(/^.*\/practice\/(.+)\.js$/, '$1'),
    loader,
  ])
)
