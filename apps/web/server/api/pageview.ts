const startAt = Date.now()
let count = 0

export default eventHandler(async ctx => {
  const query = getQuery(ctx)
  return {
    pageview: count++,
    startAt,
    query
  }
})
