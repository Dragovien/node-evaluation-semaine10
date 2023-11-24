export const logMiddleware = (req, res, next) => {
  const counter = req.session.counter
  const method = req.method.toUpperCase()
  const {path} = req
  const body = isNotEmpty(req.body) ? JSON.stringify(req.body) : ''
  const query = isNotEmpty(req.query) ? JSON.stringify(req.query) : ''

  next()
}